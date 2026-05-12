import Image from "next/image";
import {
  Anchor,
  ArrowRight,
  BookOpen,
  Compass,
  Megaphone,
  ShoppingBag,
  Shell,
  Shirt,
  Waves,
} from "lucide-react";
import database from "@/data/hijos-del-oceano.database.json";

const values = [
  {
    icon: Waves,
    label: "Acción real",
    text: database.pillars[0].details.join(". "),
  },
  {
    icon: Shell,
    label: "Educación",
    text: database.pillars[1].details.join(". "),
  },
  {
    icon: Megaphone,
    label: "Tribu",
    text: database.glossary[0].meaning,
  },
];

const products = [
  {
    name: "Polos con mensaje",
    category: "Prenda base",
    price: "Próximamente",
    description: "Piezas para llevar una postura clara: el océano tiene voz.",
  },
  {
    name: "Hoodies de la tribu",
    category: "Abrigo",
    price: "Próximamente",
    description: "Capas cómodas para quienes viven el mar como identidad.",
  },
  {
    name: "Tote bags reutilizables",
    category: "Accesorio",
    price: "Próximamente",
    description: "Una alternativa diaria contra el plástico de un solo uso.",
  },
];

const posts = [
  {
    title: "El mar no es tierra de nadie",
    tag: "Pesca ilegal",
    excerpt:
      "Una nota para entender por qué la pesca informal rompe ecosistemas, economías locales y memoria marina.",
  },
  {
    title: "Lo que tiramos, vuelve",
    tag: "Plástico",
    excerpt:
      "Cómo la contaminación plástica regresa a nuestra mesa, a nuestras playas y a nuestra forma de vivir.",
  },
  {
    title: "La indiferencia también contamina",
    tag: "Conciencia",
    excerpt:
      "El primer acto de la tribu es mirar de frente el mar real, incluso cuando incomoda.",
  },
];

export default function Home() {
  const problematics = database.problematics;
  const glossary = database.glossary.slice(0, 4);

  return (
    <main>
      <section className="hero" aria-label="Hijos del Océano">
        <Image
          src="/images/hero-oceano.png"
          alt="Océano luminoso al amanecer"
          fill
          priority
          sizes="100vw"
          className="heroImage"
        />
        <div className="heroOverlay" />
        <nav className="nav" aria-label="Principal">
          <a className="brand" href="#inicio">
            <Waves aria-hidden="true" />
            {database.project.name}
          </a>
          <div className="navLinks">
            <a href="#marca">Marca</a>
            <a href="#tienda">Tienda</a>
            <a href="#blog">Blog</a>
            <a href="#causa">Causa</a>
          </div>
        </nav>
        <div className="heroContent" id="inicio">
          <p className="eyebrow">{database.project.type}</p>
          <h1>{database.project.name}</h1>
          <p className="lead">{database.project.essence}</p>
          <p className="slogan">{database.project.slogan}</p>
          <div className="heroActions">
            <a className="primaryButton" href="#marca">
              Ver base de marca <ArrowRight aria-hidden="true" />
            </a>
            <a className="secondaryButton" href="#tienda">
              Ver tienda
            </a>
          </div>
        </div>
      </section>

      <section className="intro" id="marca">
        <div>
          <p className="sectionLabel">Propósito</p>
          <h2>{database.strategy.purpose}</h2>
        </div>
        <p>{database.strategy.positioning}</p>
      </section>

      <section className="values" aria-label="Ejes del proyecto">
        {values.map(({ icon: Icon, label, text }) => (
          <article className="value" key={label}>
            <Icon aria-hidden="true" />
            <h3>{label}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="shop" id="tienda">
        <div className="sectionHeader wideHeader">
          <p className="sectionLabel">Tienda</p>
          <h2>Prendas y piezas para llevar el mensaje.</h2>
          <p>
            La primera colección puede empezar simple: polos, hoodies y
            accesorios reutilizables. Cada pieza debe comunicar pertenencia,
            postura y acción.
          </p>
        </div>
        <div className="productGrid">
          {products.map((product) => (
            <article className="product" key={product.name}>
              <div className="productVisual">
                {product.name.includes("Polos") ? (
                  <Shirt aria-hidden="true" />
                ) : (
                  <ShoppingBag aria-hidden="true" />
                )}
              </div>
              <div className="productBody">
                <p>{product.category}</p>
                <h3>{product.name}</h3>
                <span>{product.price}</span>
                <p>{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="blog" id="blog">
        <div className="sectionHeader wideHeader">
          <p className="sectionLabel">Blog</p>
          <h2>Notas para despertar conciencia oceánica.</h2>
          <p>
            Este espacio será la voz editorial de la marca: educación directa,
            historias del mar real y preguntas que empujan a actuar.
          </p>
        </div>
        <div className="postGrid">
          {posts.map((post) => (
            <article className="post" key={post.title}>
              <BookOpen aria-hidden="true" />
              <p>{post.tag}</p>
              <h3>{post.title}</h3>
              <span>{post.excerpt}</span>
              <a href="#blog">Leer nota</a>
            </article>
          ))}
        </div>
      </section>

      <section className="chapters" id="causa">
        <div className="sectionHeader">
          <p className="sectionLabel">Problemáticas</p>
          <h2>Los cuatro frentes que denuncia la marca.</h2>
        </div>
        <div className="chapterList">
          {problematics.map((problem, index) => (
            <article className="chapter" key={problem.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{problem.name}</h3>
                <p>{problem.phrase}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="glossary" aria-label="Glosario de la tribu">
        <div className="sectionHeader">
          <p className="sectionLabel">Lenguaje</p>
          <h2>Palabras que construyen pertenencia.</h2>
        </div>
        <div className="glossaryGrid">
          {glossary.map((item) => (
            <article className="term" key={item.term}>
              <h3>{item.term}</h3>
              <p>{item.meaning}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="direction" id="rumbo">
        <Compass aria-hidden="true" />
        <div>
          <p className="sectionLabel">Frase guía</p>
          <h2>{database.project.guideQuestion}</h2>
          <p>{database.project.centralMessage}</p>
        </div>
        <a className="primaryButton compact" href="#inicio">
          Volver arriba <Anchor aria-hidden="true" />
        </a>
      </section>
    </main>
  );
}
