import Image from "next/image";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import database from "@/data/hijos-del-oceano.database.json";
import {
  asset,
  formatBlogDate,
  getPostBySlug,
  getPostParagraphs,
  publishedPosts,
} from "@/lib/blog";

export function generateStaticParams() {
  return publishedPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog | Hijos del Oceano",
    };
  }

  return {
    title: `${post.title} | Hijos del Oceano`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = getPostParagraphs(post);

  return (
    <main className="blogPage articlePage">
      <nav className="blogNav" aria-label="Blog">
        <a className="brand" href={asset("/")}>
          <Image
            src={asset("/brand/logo-oficial.png")}
            alt=""
            width={42}
            height={42}
            aria-hidden="true"
          />
          {database.project.name}
        </a>
        <a className="backLink" href={asset("/blog/")}>
          <ArrowLeft aria-hidden="true" />
          Volver al blog
        </a>
      </nav>

      <article className="articleLayout">
        <header className="articleHeader">
          <p className="sectionLabel">{post.category}</p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="articleMeta">
            <span>{post.author}</span>
            {post.date ? <span>{formatBlogDate(post.date)}</span> : null}
            <span>{post.type === "tribu" ? "Voz de la tribu" : "Nota editorial"}</span>
          </div>
        </header>

        <div className="articleCover">
          <Image
            src={asset(post.image)}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 960px"
          />
        </div>

        <div className="articleBody">
          <BookOpen aria-hidden="true" />
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {post.notionUrl ? (
            <a href={post.notionUrl} target="_blank" rel="noreferrer">
              Ver fuente en Notion <ExternalLink aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </article>
    </main>
  );
}
