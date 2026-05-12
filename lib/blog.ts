import blogData from "@/data/blog-posts.json";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  type: string;
  status: string;
  date: string;
  image: string;
  excerpt: string;
  content?: string;
  notionUrl?: string;
};

export const assetBase = process.env.GITHUB_PAGES === "true" ? "/pagina-hijos-del-oceano" : "";

export function asset(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${assetBase}${path}`;
}

export const publishedPosts = (blogData.posts as BlogPost[]).filter(
  (post) => post.status.toLowerCase() === "publicado",
);

export function getPostBySlug(slug: string) {
  return publishedPosts.find((post) => post.slug === slug);
}

export function getPostParagraphs(post: BlogPost) {
  const text = post.content?.trim() || post.excerpt;

  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function formatBlogDate(value: string) {
  if (!value) return "";

  return new Intl.DateTimeFormat("es", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function getBlogLastUpdated() {
  return new Intl.DateTimeFormat("es", {
    dateStyle: "medium",
  }).format(new Date(blogData.updatedAt));
}

export const blogSource = blogData.source;
