import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Compass,
  Feather,
  Mail,
  Waves,
} from "lucide-react";
import database from "@/data/hijos-del-oceano.database.json";
import {
  asset,
  blogSource,
  formatBlogDate,
  getBlogLastUpdated,
  getReadingTime,
  publishedPosts,
} from "@/lib/blog";

export const metadata = {
  title: "Bitacora del Oceano | Hijos del Oceano",
  description:
    "Historias, reflexiones y voces nacidas desde el mar. Blog editorial de Hijos del Oceano.",
};

const allPosts = publishedPosts;
const featuredPost = allPosts[0];
const remainingPosts = allPosts.slice(1);
const categories = Array.from(new Set(allPosts.map((post) => post.category))).slice(0, 6);
const lastUpdated = getBlogLastUpdated();

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
          <p className="sectionLabel">Journal oceánico</p>
          <h1>Bitácora del Océano</h1>
          <p>Historias, reflexiones y voces nacidas desde el mar.</p>
          <div className="journalHeroMeta" aria-label="Estado del blog">
            <span>
              <Waves aria-hidden="true" />
              {blogSource === "notion" ? "Conectado a Notion" : "Contenido editorial"}
            </span>
            <span>Actualizado {lastUpdated}</span>
          </div>
        </div>
      </section>

      <section className="journalIntro" aria-label="Manifiesto editorial">
        <div>
          <p className="sectionLabel">Manifiesto visual</p>
          <h2>Una comunidad que escribe desde la calma, la ruta y la conciencia.</h2>
        </div>
        <p>
          Este blog no funciona como un archivo corporativo. Es una bitácora emocional:
          notas de viaje, pensamiento oceánico, cultura de playa, denuncias necesarias
          y pequeñas señales para volver a mirar el mar con pertenencia.
        </p>
      </section>

      {featuredPost ? (
        <section className="featuredArticle" aria-label="Artículo destacado">
          <div className="featuredVisual">
            <Image
              src={asset(featuredPost.image)}
              alt={featuredPost.title}
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
            />
          </div>
          <div className="featuredCopy">
            <p className="sectionLabel">Featured article</p>
            <h2>{featuredPost.title}</h2>
            <p>{featuredPost.excerpt}</p>
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
            Un archivo vivo de historias, voces de la tribu y piezas editoriales
            para cuidar lo que también somos.
          </p>
        </div>

        <div className="journalGrid">
          {(remainingPosts.length ? remainingPosts : allPosts).map((post) => (
            <a className="journalPost" href={asset(`/blog/${post.slug}/`)} key={post.id}>
              <div className="journalPostImage">
                <Image
                  src={asset(post.image)}
                  alt={post.title}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              </div>
              <div className="journalPostBody">
                <p>{post.category}</p>
                <h3>{post.title}</h3>
                <span>{post.excerpt}</span>
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

      <section className="journalVoices" aria-label="Voces de la comunidad">
        <Compass aria-hidden="true" />
        <div>
          <p className="sectionLabel">Voces de la tribu</p>
          <h2>Publicar también puede ser una forma de cuidar.</h2>
          <p>
            La bitácora queda preparada para recibir relatos, crónicas de playa,
            aprendizajes y reflexiones conectadas con el océano.
          </p>
        </div>
        <a href="#newsletter">Unirme a la bitácora</a>
      </section>

      <section className="journalNewsletter" id="newsletter">
        <div>
          <Feather aria-hidden="true" />
          <p className="sectionLabel">Newsletter</p>
          <h2>Cartas breves desde el mar.</h2>
          <p>
            Una invitación minimalista para recibir nuevas notas, lanzamientos y
            acciones de conciencia oceánica.
          </p>
        </div>
        <form className="newsletterForm">
          <label>
            Email
            <input type="email" name="email" placeholder="tuemail@correo.com" />
          </label>
          <button type="button">
            <Mail aria-hidden="true" />
            Suscribirme
          </button>
        </form>
      </section>

      <footer className="journalFooter">
        <p>HIJOS DEL OCÉANO</p>
        <span>Libertad, conciencia y pertenencia desde el mar.</span>
      </footer>
    </main>
  );
}
