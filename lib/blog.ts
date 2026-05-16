import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  description: string;
  coverImage: string;
  published: boolean;
  body: string;
  image: string;
  excerpt: string;
  author: string;
  type: string;
};

type Frontmatter = Record<string, string | boolean>;

const blogDirectory = path.join(process.cwd(), "content", "blog");

export const assetBase = process.env.GITHUB_PAGES === "true" ? "/pagina-hijos-del-oceano" : "";

export function asset(pathname: string) {
  if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
    return pathname;
  }

  return `${assetBase}${pathname}`;
}

function parseFrontmatter(fileContent: string) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return {
      data: {},
      body: fileContent.trim(),
    };
  }

  const data = match[1].split(/\r?\n/).reduce<Frontmatter>((frontmatter, line) => {
    const separator = line.indexOf(":");

    if (separator === -1) {
      return frontmatter;
    }

    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");

    frontmatter[key] = value === "true" ? true : value === "false" ? false : value;

    return frontmatter;
  }, {});

  return {
    data,
    body: match[2].trim(),
  };
}

function readBlogPosts() {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(blogDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, body } = parseFrontmatter(fileContent);
      const slug = String(data.slug || filename.replace(/\.md$/, ""));
      const description = String(data.description || "");
      const coverImage = String(data.coverImage || "/images/hero-oceano.png");

      return {
        id: slug,
        title: String(data.title || slug),
        slug,
        date: String(data.date || ""),
        category: String(data.category || "Bitácora"),
        description,
        coverImage,
        published: data.published === true,
        body,
        image: coverImage,
        excerpt: description,
        author: "Hijos del Océano",
        type: "editorial",
      } satisfies BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const allPosts = readBlogPosts();

export const publishedPosts = allPosts.filter((post) => post.published);

export function getPostBySlug(slug: string) {
  return publishedPosts.find((post) => post.slug === slug);
}

export function getPostParagraphs(post: BlogPost) {
  return post.body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function getPostExcerpt(post: BlogPost, maxLength = 168) {
  const source = post.description?.trim() || post.body?.trim() || "";
  const normalized = source.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).replace(/\s+\S*$/, "")}...`;
}

export function getReadingTime(post: BlogPost) {
  const text = `${post.title} ${post.description} ${post.body || ""}`;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 190));

  return `${minutes} min`;
}

export function formatBlogDate(value: string) {
  if (!value) return "";

  return new Intl.DateTimeFormat("es", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function getBlogLastUpdated() {
  const newestPost = publishedPosts[0];

  return new Intl.DateTimeFormat("es", {
    dateStyle: "medium",
  }).format(newestPost?.date ? new Date(newestPost.date) : new Date());
}

export const blogSource = "decap";
