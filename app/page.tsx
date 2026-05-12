import Image from "next/image";
import {
  Anchor,
  ArrowRight,
  Compass,
  Megaphone,
  Shell,
  Waves,
} from "lucide-react";
import database from "@/data/hijos-del-oceano.database.json";

const values = [
  { icon: Waves, label: "Acción real", text: database.pillars[0].details.join(". ") },
  { icon: Shell, label: "Educación", text: database.pillars[1].details.join(". ") },
  { icon: Megaphone, label: "Tribu", text: database.glossary[0].meaning },
];

export default function Home() {
  const problematics = database.problematics;
  const glossary = database.glossary.slice(0, 4);

  return (
    <main>
      <section className="hero" aria-label="Hijos del Oceano">
        <Image
          src="/images/hero-oceano.png"
          alt="Oceano luminoso al amanecer"
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
            <a href="#causa">Causa</a>
            <a href="#rumbo">Rumbo</a>
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
            <a className="secondaryButton" href="#causa">
              Ver causa
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
