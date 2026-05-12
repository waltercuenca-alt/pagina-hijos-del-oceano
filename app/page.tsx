import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Heart,
  Instagram,
  Map,
  Shirt,
  Users,
  Waves,
} from "lucide-react";
import database from "@/data/hijos-del-oceano.database.json";
import { asset, getPostExcerpt, publishedPosts } from "@/lib/blog";

const blogPath = asset("/blog/");

const manifestoLines = [
  "El océano no necesita más espectadores.",
  "Necesita personas que lo recuerden.",
  "Necesita guardianes.",
  "El mar todavía recuerda todo.",
];

const storyScenes = [
  {
    kicker: "Libertad",
    title: "Hay personas que entienden la vida cuando escuchan agua.",
    text: "Viajar, sanar, quedarse en silencio y volver al cuerpo. El océano no es paisaje: es una forma de regresar.",
    image: "/images/hero-oceano.png",
  },
  {
    kicker: "Memoria",
    title: "Lo que dejamos en la orilla también cuenta nuestra historia.",
    text: "Cada playa guarda señales: belleza, abandono, comunidad, heridas. Mirarlas de frente es el primer acto de pertenencia.",
    image: "/brand/contaminacion-playa.jpg",
  },
  {
    kicker: "Pertenencia",
    title: "No somos turistas del océano. Somos parte de su voz.",
    text: "Hijos del Océano nace para unir estética, conciencia y vida real cerca del mar.",
    image: "/brand/tortuga-lineal.jpg",
  },
];

const cinematicQuotes = [
  "No somos turistas del océano.",
  "Hay personas que nacieron para vivir cerca del agua.",
  "Somos hijos del mismo océano.",
];

const products = [
  {
    name: "Polo Ocean Killers",
    category: "Drop editorial",
    image: "/brand/polo-ocean-killers.png",
    text: "Una pieza directa para llevar una postura, no solo una prenda.",
  },
  {
    name: "Sun Wave Tee",
    category: "Lifestyle oceánico",
    image: "/brand/polo-sun-wave.png",
    text: "Diseñada para días de ruta, playa, ciudad y memoria marina.",
  },
  {
    name: "Drop II",
    category: "Streetwear consciente",
    image: "/brand/polo-drop-2.png",
    text: "Minimalismo, textura y mensaje para una comunidad que se reconoce.",
  },
];

const impactStats = [
  { value: "01", label: "tribu naciendo alrededor del mar" },
  { value: "04", label: "frentes de conciencia oceánica" },
  { value: "∞", label: "historias por escribir desde la costa" },
];

export default function Home() {
  const journalPosts = publishedPosts.slice(0, 3);

  return (
    <main className="cinemaHome">
      <section className="cinemaHero" id="inicio" aria-label="Hijos del Océano">
        <Image
          src={asset("/images/hero-oceano.png")}
          alt="Océano abierto al amanecer"
          fill
          priority
          sizes="100vw"
          className="cinemaHeroMedia"
        />
        <div className="cinemaGrain" />
        <div className="cinemaHeroShade" />

        <nav className="cinemaNav" aria-label="Principal">
          <a className="cinemaBrand" href="#inicio">
            <Image
              src={asset("/brand/logo-oficial.png")}
              alt=""
              width={42}
              height={42}
              aria-hidden="true"
            />
            HIJOS DEL OCÉANO
          </a>
          <div className="cinemaLinks">
            <a href="#manifiesto">Manifesto</a>
            <a href={blogPath}>Blog</a>
            <a href="#comunidad">Comunidad</a>
            <a href="#merch">Merch</a>
          </div>
        </nav>

        <div className="cinemaHeroContent">
          <p className="cinemaLabel">Movimiento oceánico independiente</p>
          <h1>SOMOS HIJOS DEL OCÉANO</h1>
          <p>No nacimos para mirar el mar desde lejos.</p>
          <div className="cinemaHeroActions">
            <a href="#story">
              Explorar <ArrowRight aria-hidden="true" />
            </a>
            <a href="#manifiesto">Leer manifiesto</a>
          </div>
        </div>

        <a className="scrollCue" href="#manifiesto" aria-label="Bajar">
          <span>Scroll</span>
          <ArrowDown aria-hidden="true" />
        </a>
      </section>

      <section className="cinemaManifesto" id="manifiesto">
        <div className="manifestoIntro">
          <p className="cinemaLabel">Manifiesto</p>
          <h2>Una identidad para quienes sienten que el mar también los recuerda.</h2>
        </div>
        <div className="manifestoLines">
          {manifestoLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <section className="storyRibbon" id="story" aria-label="Storytelling visual">
        {storyScenes.map((scene, index) => (
          <article className="storyScene" key={scene.title}>
            <div className="storyImage">
              <Image
                src={asset(scene.image)}
                alt={scene.title}
                fill
                sizes="(max-width: 900px) 100vw, 52vw"
              />
            </div>
            <div className="storyCopy">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p className="cinemaLabel">{scene.kicker}</p>
              <h2>{scene.title}</h2>
              <p>{scene.text}</p>
            </div>
          </article>
        ))}
      </section>

      {cinematicQuotes.map((quote, index) => (
        <section className="quoteFrame" key={quote}>
          <Image
            src={asset(index === 1 ? "/brand/contaminacion-playa.jpg" : "/images/hero-oceano.png")}
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
          />
          <div />
          <h2>{quote}</h2>
        </section>
      ))}

      <section className="homeJournal" id="blog">
        <div className="cinemaSectionHead">
          <p className="cinemaLabel">Bitácora oceánica</p>
          <h2>Historias, reflexiones y voces nacidas desde el mar.</h2>
          <a href={blogPath}>
            Abrir journal <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="homeJournalGrid">
          {journalPosts.map((post) => (
            <a className="homeJournalPost" href={asset(`/blog/${post.slug}/`)} key={post.id}>
              <div>
                <Image
                  src={asset(post.image)}
                  alt={post.title}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              </div>
              <p>{post.category}</p>
              <h3>{post.title}</h3>
              <span>{getPostExcerpt(post, 140)}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="communityImpact" id="comunidad">
        <div className="impactVisual">
          <Image
            src={asset("/brand/contaminacion-playa.jpg")}
            alt="Playa y conciencia oceánica"
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        </div>
        <div className="impactCopy">
          <p className="cinemaLabel">Comunidad e impacto</p>
          <h2>No queremos parecer una causa. Queremos ser una presencia.</h2>
          <p>
            Limpiezas, relatos, prendas, bitácoras y encuentros pueden convertirse en
            una misma señal: personas reales recordando que el océano no está separado
            de su vida.
          </p>
          <div className="impactStats">
            {impactStats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="editorialMerch" id="merch">
        <div className="cinemaSectionHead">
          <p className="cinemaLabel">Merch editorial</p>
          <h2>Prendas para llevar una memoria, no solo un logo.</h2>
          <a href="#footer">
            Próximamente <Shirt aria-hidden="true" />
          </a>
        </div>
        <div className="merchGrid">
          {products.map((product) => (
            <article className="merchPiece" key={product.name}>
              <div>
                <Image
                  src={asset(product.image)}
                  alt={product.name}
                  width={900}
                  height={700}
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              </div>
              <p>{product.category}</p>
              <h3>{product.name}</h3>
              <span>{product.text}</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="cinemaFooter" id="footer">
        <div>
          <p className="cinemaLabel">HIJOS DEL OCÉANO</p>
          <h2>Somos la voz del mar.</h2>
        </div>
        <nav aria-label="Footer">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <Instagram aria-hidden="true" />
            Instagram
          </a>
          <a href={blogPath}>
            <BookOpen aria-hidden="true" />
            Blog
          </a>
          <a href="#comunidad">
            <Users aria-hidden="true" />
            Comunidad
          </a>
          <a href="#manifiesto">
            <Heart aria-hidden="true" />
            Manifesto
          </a>
          <a href="#story">
            <Map aria-hidden="true" />
            Ruta
          </a>
        </nav>
        <Waves aria-hidden="true" />
      </footer>
    </main>
  );
}
