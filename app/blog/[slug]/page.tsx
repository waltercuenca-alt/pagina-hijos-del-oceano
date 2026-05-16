import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Waves } from "lucide-react";
import { notFound } from "next/navigation";
import database from "@/data/hijos-del-oceano.database.json";
import {
  asset,
  formatBlogDate,
  getPostBySlug,
  getPostExcerpt,
  getReadingTime,
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
      title: "Bitácora del Océano | Hijos del Océano",
    };
  }

  return {
    title: `${post.title} | Hijos del Océano`,
    description: getPostExcerpt(post, 155),
  };
}

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

function renderMarkdown(markdown: string) {
  return markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) {
        return <h2 key={block}>{renderInlineMarkdown(block.replace(/^## /, ""))}</h2>;
      }

      if (block.startsWith("### ")) {
        return <h3 key={block}>{renderInlineMarkdown(block.replace(/^### /, ""))}</h3>;
      }

      if (block.startsWith("- ")) {
        const items = block.split(/\r?\n/).map((item) => item.replace(/^- /, ""));

        return (
          <ul key={block}>
            {items.map((item) => (
              <li key={item}>{renderInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
      }

      return <p key={block}>{renderInlineMarkdown(block)}</p>;
    });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="blogPage articlePage">
      <nav className="blogNav journalNav" aria-label="Blog">
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
          Volver a la Bitácora
        </a>
      </nav>

      <article className="cinematicArticle">
        <header className="cinematicHeader">
          <p className="sectionLabel">{post.category}</p>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="articleMeta">
            <span>
              <Calendar aria-hidden="true" />
              {formatBlogDate(post.date)}
            </span>
            <span>
              <Clock aria-hidden="true" />
              {getReadingTime(post)}
            </span>
          </div>
        </header>

        <div className="cinematicCover">
          <Image src={asset(post.coverImage)} alt={post.title} fill priority sizes="100vw" />
          <div className="cinematicCoverShade" />
        </div>

        <div className="cinematicBody">
          <aside className="articleAside">
            <Waves aria-hidden="true" />
            <span>Bitácora del Océano</span>
          </aside>
          <div className="articleText">{renderMarkdown(post.body)}</div>
        </div>
      </article>

      <section className="articleEndcap">
        <p>HIJOS DEL OCÉANO</p>
        <h2>El océano habla. Nosotros elegimos escucharlo.</h2>
        <a href={asset("/blog/")}>
          <ArrowLeft aria-hidden="true" />
          Volver a la Bitácora
        </a>
      </section>
    </main>
  );
}
