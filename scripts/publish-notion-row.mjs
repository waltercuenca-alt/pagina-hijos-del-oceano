const token = process.env.NOTION_TOKEN;
const pageId = process.env.NOTION_PAGE_ID;
const statusProperty = process.env.NOTION_STATUS_PROPERTY || "ESTADO";
const statusValue = process.env.NOTION_STATUS_VALUE || "Publicado";
const statusPropertyType = process.env.NOTION_STATUS_PROPERTY_TYPE || "status";
const notionVersion = process.env.NOTION_VERSION || "2022-06-28";

if (!token || !pageId) {
  throw new Error("NOTION_TOKEN and NOTION_PAGE_ID are required.");
}

const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Notion-Version": notionVersion,
  },
  body: JSON.stringify({
    properties: {
      [statusProperty]:
        statusPropertyType === "select"
          ? {
              select: {
                name: statusValue,
              },
            }
          : {
              status: {
                name: statusValue,
              },
            },
    },
  }),
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`Notion API ${response.status}: ${body}`);
}

console.log(`Updated ${statusProperty} to ${statusValue} for Notion page ${pageId}.`);
