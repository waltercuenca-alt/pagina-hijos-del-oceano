import Image from "next/image";
import {
  ArrowLeft,
  BookOpen,
  MessageCircle,
  PenLine,
  Send,
  Waves,
} from "lucide-react";
import database from "@/data/hijos-del-oceano.database.json";
import blogData from "@/data/blog-posts.json";

const assetBase = process.env.GITHUB_PAGES === "true" ? "/pagina-hijos-del-oceano" : "";
const asset = (path: string) => `${assetBase}${path}`;

type BlogPost = {
  id: string;
  title: string;
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

const allPosts = (blogData.posts as BlogPost[]).filter(
  (post) => post.status.toLowerCase() === "publicado",
);
const editorialPosts = allPosts.filter((post) => post.type !== "tribu");
const tribePosts = allPosts.filter((post) => post.type === "tribu");
const lastUpdated = new Intl.DateTimeFormat("es", {
  dateStyle: "medium",
}).format(new Date(blogData.updatedAt));

export default function BlogPage() {
  return (
    <main className="blogPage">
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
        <a className="backLink" href={asset("/")}>
          <ArrowLeft aria-hidden="true" />
          Volver a la página
        </a>
      </nav>

      <section className="blogHero">
        <div>
          <p className="sectionLabel">Blog activo</p>
          <h1>Conciencia oceánica escrita por la marca y por la tribu.</h1>
          <p>
            Un espacio para notas, testimonios, denuncias visuales y aprendizajes
            que ayuden a convertir amor por el mar en acción concreta.
          </p>
          <span className="syncStatus">
            Fuente: {blogData.source === "notion" ? "Notion" : "contenido inicial"} ·
            actualizado {lastUpdated}
          </span>
        </div>
        <div className="blogHeroCard">
          <Waves aria-hidden="true" />
          <h2>{database.project.slogan}</h2>
          <p>{database.project.centralMessage}</p>
          <a href="#participar">Proponer publicación</a>
        </div>
      </section>

      <section className="blogSection">
        <div className="sectionHeader wideHeader">
          <p className="sectionLabel">Notas de la marca</p>
          <h2>Publicaciones editoriales de Hijos del Océano.</h2>
          <p>
            Estas notas sostienen la voz oficial: poética, directa, incómoda
            cuando hace falta y siempre orientada a actuar.
          </p>
        </div>
        <div className="blogArticleGrid">
          {editorialPosts.map((post) => (
            <article className="blogArticle" key={post.title}>
              <div className="blogArticleImage">
                <Image
                  src={asset(post.image)}
                  alt={post.title}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              </div>
              <div className="blogArticleBody">
                <p>{post.category}</p>
                <h3>{post.title}</h3>
                <span>{post.excerpt}</span>
                <small>
                  {post.author} · {post.date}
                </small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="blogSection tribeVoices">
        <div className="sectionHeader wideHeader">
          <p className="sectionLabel">Voces de la tribu</p>
          <h2>Ideas y publicaciones que puede hacer la gente.</h2>
          <p>
            La tribu puede aportar experiencias, fotos, denuncias locales,
            aprendizajes o columnas cortas sobre el mar que vive de cerca.
          </p>
        </div>
        <div className="tribeGrid">
          {tribePosts.map((post) => (
            <article className="tribePost" key={post.title}>
              <MessageCircle aria-hidden="true" />
              <p>{post.category}</p>
              <h3>{post.title}</h3>
              <span>{post.excerpt}</span>
              <small>
                {post.author} · {post.date}
              </small>
            </article>
          ))}
        </div>
      </section>

      <section className="participate" id="participar">
        <div>
          <p className="sectionLabel">Participar</p>
          <h2>Envía una idea para publicar en el blog.</h2>
          <p>
            Esta versión deja listo el flujo editorial. Cuando conectemos un
            formulario real, las propuestas podrán llegar directo a una base de
            datos para revisión antes de publicarse.
          </p>
        </div>
        <form className="submissionForm">
          <label>
            Nombre
            <input type="text" name="name" placeholder="Tu nombre o alias" />
          </label>
          <label>
            Tema de la nota
            <input type="text" name="topic" placeholder="Ej: plástico en mi playa" />
          </label>
          <label>
            Tipo de publicación
            <select name="type" defaultValue="testimonio">
              <option value="testimonio">Testimonio</option>
              <option value="denuncia">Denuncia visual</option>
              <option value="opinion">Opinión</option>
              <option value="accion">Acción real</option>
            </select>
          </label>
          <label>
            Resumen
            <textarea
              name="summary"
              placeholder="Cuéntanos qué quieres publicar y por qué ayuda al océano."
              rows={5}
            />
          </label>
          <button type="button">
            <Send aria-hidden="true" />
            Enviar propuesta
          </button>
          <p>
            Pendiente de conexión: Google Forms, Notion, Sheets o backend propio.
          </p>
        </form>
      </section>

      <section className="blogManifest">
        <PenLine aria-hidden="true" />
        <h2>La voz del mar también se escribe.</h2>
        <p>
          Cada publicación debe conectar, educar o actuar por el océano. Si no
          cumple eso, no entra en la marca.
        </p>
        <BookOpen aria-hidden="true" />
      </section>
    </main>
  );
}
