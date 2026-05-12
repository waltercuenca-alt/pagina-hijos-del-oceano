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

const assetBase = process.env.GITHUB_PAGES === "true" ? "/pagina-hijos-del-oceano" : "";
const asset = (path: string) => `${assetBase}${path}`;

const editorialPosts = [
  {
    title: "El mar no es tierra de nadie",
    author: "Hijos del Océano",
    tag: "Pesca ilegal",
    image: "/brand/ocean-killers.png",
    excerpt:
      "Una mirada directa a la pesca informal, sus consecuencias invisibles y la urgencia de defender el mar real.",
    status: "Publicado",
  },
  {
    title: "Lo que tiramos, vuelve",
    author: "Hijos del Océano",
    tag: "Plástico",
    image: "/brand/contaminacion-playa.jpg",
    excerpt:
      "El plástico no desaparece: cambia de forma, vuelve a la playa y termina entrando en nuestra vida diaria.",
    status: "Publicado",
  },
  {
    title: "La indiferencia también contamina",
    author: "Hijos del Océano",
    tag: "Conciencia",
    image: "/brand/tortuga-lineal.jpg",
    excerpt:
      "Antes de actuar, la tribu aprende a mirar. Esta nota habla del enemigo más silencioso del océano.",
    status: "Publicado",
  },
];

const tribePosts = [
  {
    title: "Mi playa cambió en cinco años",
    author: "Voz de la tribu",
    tag: "Testimonio",
    excerpt:
      "Historias personales sobre lugares que antes parecían intactos y hoy muestran señales claras de abandono.",
  },
  {
    title: "Una limpieza no es solo recoger basura",
    author: "Voz de la tribu",
    tag: "Acción",
    excerpt:
      "Crónicas de acciones pequeñas que ayudan a medir, conversar y activar conciencia local.",
  },
  {
    title: "El mar que heredamos",
    author: "Voz de la tribu",
    tag: "Opinión",
    excerpt:
      "Textos breves para pensar qué significa amar el océano cuando también toca defenderlo.",
  },
];

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
                <p>{post.tag}</p>
                <h3>{post.title}</h3>
                <span>{post.excerpt}</span>
                <small>
                  {post.author} · {post.status}
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
              <p>{post.tag}</p>
              <h3>{post.title}</h3>
              <span>{post.excerpt}</span>
              <small>{post.author}</small>
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
