import Image from "next/image";
import { ArrowLeft, ArrowRight, Package, Waves } from "lucide-react";
import database from "@/data/hijos-del-oceano.database.json";
import { asset } from "@/lib/blog";
import ProductFilterGrid from "./ProductFilterGrid";

export const metadata = {
  title: "Coleccion | Hijos del Oceano",
  description:
    "Coleccion editorial de productos Hijos del Oceano: prendas, accesorios y piezas visuales conectadas con el mar.",
};

export default function CollectionPage() {
  return (
    <main className="collectionPage">
      <nav className="blogNav journalNav collectionNav" aria-label="Coleccion">
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
        <div className="collectionNavLinks">
          <a href={asset("/")}>
            <ArrowLeft aria-hidden="true" />
            Home
          </a>
          <a href={asset("/blog/")}>Blog</a>
        </div>
      </nav>

      <section className="collectionHero" aria-label="Coleccion Hijos del Oceano">
        <Image
          src={asset("/images/hero-oceano.png")}
          alt="Textura oscura del oceano"
          fill
          priority
          sizes="100vw"
          className="collectionHeroImage"
        />
        <div className="collectionHeroOverlay" />
        <div className="collectionHeroContent">
          <p className="cinemaLabel">Streetwear oceánico editorial</p>
          <h1>COLECCION</h1>
          <p>Prendas creadas para llevar el océano, el viaje y la identidad en la piel.</p>
          <a href="#productos">
            Ver productos <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="collectionHeroMark" aria-hidden="true">
          <Waves />
          <span>DROP 01</span>
        </div>
      </section>

      <section className="collectionManifest">
        <p>
          No es una tienda tradicional. Es una extensión de la bitácora: ropa, objetos y
          piezas visuales para una comunidad que se reconoce cerca del mar.
        </p>
        <div>
          <Package aria-hidden="true" />
          <span>Productos iniciales</span>
          <strong>06</strong>
        </div>
      </section>

      <ProductFilterGrid />

      <footer className="journalFooter collectionFooter">
        <p>HIJOS DEL OCÉANO</p>
        <span>Colección editorial, conciencia y estilo de vida oceánico.</span>
      </footer>
    </main>
  );
}
