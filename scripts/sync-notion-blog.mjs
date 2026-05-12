import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const token = process.env.NOTION_TOKEN;
const configuredDatabaseId = process.env.NOTION_DATABASE_ID;
let databaseId = configuredDatabaseId;
const notionVersion = process.env.NOTION_VERSION || "2022-06-28";
const outputPath = path.join(process.cwd(), "data", "blog-posts.json");

const textPropertyNames = {
  title: ["Título", "Titulo", "Title", "Name", "Nombre"],
  slug: ["Slug", "URL", "Url"],
  author: ["Autor", "Author"],
  category: ["Categoría", "Categoria", "Category", "Tema"],
  excerpt: ["Resumen", "Excerpt", "Description", "Descripción", "Descripcion"],
  image: ["Imagen", "Image", "Cover", "Portada"],
  type: ["Tipo", "Type", "Origen"],
  status: ["Estado", "Status"],
  date: ["Fecha", "Date", "Publicado", "Published"],
};

if (!token || !configuredDatabaseId) {
  console.log("Notion sync skipped: NOTION_TOKEN or NOTION_DATABASE_ID is missing.");
  process.exit(0);
}

function notionHeaders() {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Notion-Version": notionVersion,
  };
}

async function notionRequest(endpoint, options = {}) {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    ...options,
    headers: {
      ...notionHeaders(),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Notion API ${response.status}: ${body}`);
  }

  return response.json();
}

async function notionRequestResult(endpoint, options = {}) {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    ...options,
    headers: {
      ...notionHeaders(),
      ...(options.headers || {}),
    },
  });

  const body = await response.text();
  let data;

  try {
    data = body ? JSON.parse(body) : {};
  } catch {
    data = { raw: body };
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

async function resolveDatabaseId(id) {
  const databaseResult = await notionRequestResult(`/databases/${id}`);

  if (databaseResult.ok) {
    return id;
  }

  const message = databaseResult.data?.message || "";

  if (!message.includes("page, not a database")) {
    throw new Error(`Notion API ${databaseResult.status}: ${JSON.stringify(databaseResult.data)}`);
  }

  const blocks = [];
  let cursor;

  do {
    const query = cursor ? `?start_cursor=${cursor}` : "";
    const blockResult = await notionRequestResult(`/blocks/${id}/children${query}`);

    if (!blockResult.ok) {
      throw new Error(`Notion API ${blockResult.status}: ${JSON.stringify(blockResult.data)}`);
    }

    blocks.push(...blockResult.data.results);
    cursor = blockResult.data.has_more ? blockResult.data.next_cursor : undefined;
  } while (cursor);

  const childDatabase = blocks.find((block) => block.type === "child_database");

  if (!childDatabase) {
    throw new Error(
      "The provided Notion ID is a page, but no database was found inside it. Create a table database inside that page or use the database ID directly.",
    );
  }

  console.log(`Resolved Notion page to child database: ${childDatabase.child_database?.title || childDatabase.id}`);
  return childDatabase.id;
}

function pickProperty(properties, names) {
  const entries = Object.entries(properties);
  const normalize = (value) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const normalizedNames = names.map(normalize);

  for (const name of names) {
    if (properties[name]) {
      return properties[name];
    }
  }

  for (const [propertyName, property] of entries) {
    if (normalizedNames.includes(normalize(propertyName))) {
      return property;
    }
  }

  return undefined;
}

function richTextToPlain(richText = []) {
  return richText.map((part) => part.plain_text || "").join("").trim();
}

function propertyToText(property) {
  if (!property) return "";

  if (property.type === "title") return richTextToPlain(property.title).trim();
  if (property.type === "rich_text") return richTextToPlain(property.rich_text).trim();
  if (property.type === "select") return (property.select?.name || "").trim();
  if (property.type === "multi_select") {
    return property.multi_select.map((item) => item.name).join(", ").trim();
  }
  if (property.type === "url") return (property.url || "").trim();
  if (property.type === "email") return (property.email || "").trim();
  if (property.type === "phone_number") return (property.phone_number || "").trim();
  if (property.type === "date") return (property.date?.start || "").trim();
  if (property.type === "created_time") return (property.created_time || "").trim();
  if (property.type === "last_edited_time") return (property.last_edited_time || "").trim();
  if (property.type === "people") {
    return property.people.map((person) => person.name || person.id).join(", ").trim();
  }
  if (property.type === "files") {
    const file = property.files[0];
    return (file?.file?.url || file?.external?.url || "").trim();
  }

  return "";
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeImage(value, fallbackType) {
  if (!value) {
    return fallbackType === "tribu"
      ? "/brand/tortuga-lineal.jpg"
      : "/brand/contaminacion-playa.jpg";
  }

  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/")) {
    return value;
  }

  return value;
}

function blockToPlain(block) {
  const value = block[block.type];
  if (!value) return "";

  if (Array.isArray(value.rich_text)) {
    return richTextToPlain(value.rich_text);
  }

  return "";
}

async function fetchPageContent(pageId) {
  const blocks = [];
  let cursor;

  do {
    const query = cursor ? `?start_cursor=${cursor}` : "";
    const data = await notionRequest(`/blocks/${pageId}/children${query}`);
    blocks.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return blocks
    .map(blockToPlain)
    .filter(Boolean)
    .join("\n\n");
}

async function queryPublishedPages() {
  const pages = [];
  let cursor;

  do {
    const body = {
      page_size: 50,
      sorts: [
        {
          timestamp: "last_edited_time",
          direction: "descending",
        },
      ],
    };

    if (cursor) {
      body.start_cursor = cursor;
    }

    const data = await notionRequest(`/databases/${databaseId}/query`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    pages.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return pages;
}

function pageToPost(page, content) {
  const { properties } = page;
  const title = propertyToText(pickProperty(properties, textPropertyNames.title));
  const type = propertyToText(pickProperty(properties, textPropertyNames.type)) || "marca";
  const status = propertyToText(pickProperty(properties, textPropertyNames.status)) || "Borrador";
  const date =
    propertyToText(pickProperty(properties, textPropertyNames.date)) ||
    page.created_time?.slice(0, 10) ||
    "";

  return {
    id: page.id,
    notionUrl: page.url,
    title,
    slug: propertyToText(pickProperty(properties, textPropertyNames.slug)) || slugify(title),
    author:
      propertyToText(pickProperty(properties, textPropertyNames.author)) ||
      (type.toLowerCase().includes("tribu") ? "Voz de la tribu" : "Hijos del Océano"),
    category: propertyToText(pickProperty(properties, textPropertyNames.category)) || "Conciencia",
    type: type.toLowerCase().includes("tribu") ? "tribu" : "marca",
    status,
    date,
    image: normalizeImage(propertyToText(pickProperty(properties, textPropertyNames.image)), type),
    excerpt: propertyToText(pickProperty(properties, textPropertyNames.excerpt)) || content.slice(0, 180),
    content,
  };
}

function isPublished(status) {
  return status
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .includes("publicado");
}

try {
  databaseId = await resolveDatabaseId(configuredDatabaseId);
  const pages = await queryPublishedPages();
  const posts = [];

  console.log(`Found ${pages.length} Notion rows in database.`);

  for (const page of pages) {
    const content = await fetchPageContent(page.id);
    const post = pageToPost(page, content);
    const propertyNames = Object.keys(page.properties || {}).join(", ");

    console.log(
      `Row ${page.id}: title="${post.title || "(empty)"}" status="${post.status || "(empty)"}" type="${post.type}" properties=[${propertyNames}]`,
    );

    if (isPublished(post.status) && post.title) {
      posts.push(post);
    } else {
      console.log(
        `Skipped row ${page.id}: ${!post.title ? "missing title" : "status is not Publicado"}`,
      );
    }
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify(
      {
        updatedAt: new Date().toISOString(),
        source: "notion",
        databaseId,
        posts,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  console.log(`Synced ${posts.length} published Notion blog posts.`);
} catch (error) {
  console.warn(`Notion sync failed; keeping fallback blog data. ${error.message}`);
  if (process.env.NOTION_SYNC_STRICT === "true") {
    throw error;
  }
}
