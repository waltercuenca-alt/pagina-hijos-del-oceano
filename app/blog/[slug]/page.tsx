import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Clock, ExternalLink, Waves } from "lucide-react";
import { notFound } from "next/navigation";
import database from "@/data/hijos-del-oceano.database.json";
import {
  asset,
  formatBlogDate,
  getPostBySlug,
  getPostParagraphs,
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
          Volver a la bitácora
        </a>
      </nav>

      <article className="cinematicArticle">
        <header className="cinematicHeader">
          <p className="sectionLabel">{post.category}</p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="articleMeta">
            <span>{post.author}</span>
            {post.date ? (
              <span>
                <Calendar aria-hidden="true" />
                {formatBlogDate(post.date)}
              </span>
            ) : null}
            <span>
              <Clock aria-hidden="true" />
              {getReadingTime(post)}
            </span>
          </div>
        </header>

        <div className="cinematicCover">
          <Image
            src={asset(post.image)}
            alt={post.title}
            fill
            priority
            sizes="100vw"
          />
          <div className="cinematicCoverShade" />
        </div>

        <div className="cinematicBody">
          <aside className="articleAside">
            <Waves aria-hidden="true" />
            <span>{post.type === "tribu" ? "Voz de la tribu" : "Nota editorial"}</span>
          </aside>
          <div className="articleText">
            {paragraphs.map((paragraph, index) => (
              <p className={index === 0 ? "articleLeadParagraph" : undefined} key={paragraph}>
                {paragraph}
              </p>
            ))}
            {post.notionUrl ? (
              <a href={post.notionUrl} target="_blank" rel="noreferrer">
                Ver fuente en Notion <ExternalLink aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </article>

      <section className="articleEndcap">
        <p>HIJOS DEL OCÉANO</p>
        <h2>El mar no se mira de lejos. Se pertenece.</h2>
        <a href={asset("/blog/")}>
          Leer más historias <ArrowRight aria-hidden="true" />
        </a>
      </section>
    </main>
  );
}
