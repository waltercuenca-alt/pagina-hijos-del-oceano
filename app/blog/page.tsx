import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Clock, Waves } from "lucide-react";
import database from "@/data/hijos-del-oceano.database.json";
import {
  asset,
  formatBlogDate,
  getPostExcerpt,
  getReadingTime,
  publishedPosts,
} from "@/lib/blog";

export const metadata = {
  title: "Bitácora del Océano | Hijos del Océano",
  description:
    "El océano habla. Nosotros elegimos escucharlo. Blog editorial de Hijos del Océano.",
};

const allPosts = publishedPosts;
const featuredPost = allPosts[0];
const remainingPosts = allPosts.slice(1);
const categories = Array.from(new Set(allPosts.map((post) => post.category))).slice(0, 6);

export default function BlogPage() {
  return (
    <main className="blogPage journalPage">
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
        <a className="backLink" href={asset("/")}>
          <ArrowLeft aria-hidden="true" />
          Volver a la página
        </a>
      </nav>

      <section className="journalHero" aria-label="Bitácora del Océano">
        <Image
          src={asset("/images/hero-oceano.png")}
          alt="Océano abierto con luz cinematográfica"
          fill
          priority
          sizes="100vw"
          className="journalHeroImage"
        />
        <div className="journalHeroOverlay" />
        <div className="journalHeroContent">
          <p className="sectionLabel">Revista documental oceánica</p>
          <h1>BITÁCORA DEL OCÉANO</h1>
          <p>El océano habla. Nosotros elegimos escucharlo.</p>
          <div className="journalHeroMeta" aria-label="Estado del blog">
            <span>
              <Waves aria-hidden="true" />
              Publicado desde Decap CMS
            </span>
            <span>{allPosts.length} historias</span>
          </div>
        </div>
      </section>

      {featuredPost ? (
        <section className="featuredArticle" aria-label="Artículo destacado">
          <div className="featuredVisual">
            <Image
              src={asset(featuredPost.coverImage)}
              alt={featuredPost.title}
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
            />
          </div>
          <div className="featuredCopy">
            <p className="sectionLabel">Artículo destacado</p>
            <h2>{featuredPost.title}</h2>
            <p>{getPostExcerpt(featuredPost, 220)}</p>
            <div className="postMeta">
              <span>
                <Calendar aria-hidden="true" />
                {formatBlogDate(featuredPost.date)}
              </span>
              <span>
                <Clock aria-hidden="true" />
                {getReadingTime(featuredPost)}
              </span>
            </div>
            <a className="journalReadLink" href={asset(`/blog/${featuredPost.slug}/`)}>
              Leer historia completa <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>
      ) : null}

      <section className="categoryStrip" aria-label="Categorías">
        <span>Categorías</span>
        {categories.map((category) => (
          <a href="#journal-posts" key={category}>
            {category}
          </a>
        ))}
      </section>

      <section className="journalPosts" id="journal-posts">
        <div className="journalSectionHeader">
          <div>
            <p className="sectionLabel">Últimas entradas</p>
            <h2>Notas para despertar conciencia oceánica.</h2>
          </div>
          <p>
            Una bitácora editorial para reunir relatos, observaciones y manifiestos
            desde una comunidad conectada con el mar.
          </p>
        </div>

        <div className="journalGrid">
          {(remainingPosts.length ? remainingPosts : allPosts).map((post) => (
            <a className="journalPost" href={asset(`/blog/${post.slug}/`)} key={post.id}>
              <div className="journalPostImage">
                <Image
                  src={asset(post.coverImage)}
                  alt={post.title}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              </div>
              <div className="journalPostBody">
                <p>{post.category}</p>
                <h3>{post.title}</h3>
                <span>{getPostExcerpt(post)}</span>
                <div className="postMeta">
                  <span>
                    <Calendar aria-hidden="true" />
                    {formatBlogDate(post.date)}
                  </span>
                  <span>
                    <Clock aria-hidden="true" />
                    {getReadingTime(post)}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="journalFooter">
        <p>HIJOS DEL OCÉANO</p>
        <span>Libertad, conciencia y pertenencia desde el mar.</span>
      </footer>
    </main>
  );
}
