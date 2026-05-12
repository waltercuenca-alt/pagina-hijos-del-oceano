import Image from "next/image";
import { ArrowLeft, ArrowRight, MessageCircle, Ruler, Waves } from "lucide-react";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getProductUrl,
  getRelatedProducts,
  getWhatsappUrl,
  products,
} from "@/lib/collection";
import { asset } from "@/lib/blog";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Coleccion | Hijos del Oceano",
    };
  }

  return {
    title: `${product.name} | Hijos del Oceano`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return (
    <main className="collectionPage productDetailPage">
      <nav className="blogNav journalNav collectionNav" aria-label="Producto">
        <a className="brand" href={asset("/")}>
          <Image
            src={asset("/brand/logo-oficial.png")}
            alt=""
            width={42}
            height={42}
            aria-hidden="true"
          />
          HIJOS DEL OCÉANO
        </a>
        <a className="backLink" href={asset("/coleccion/")}>
          <ArrowLeft aria-hidden="true" />
          Volver a colección
        </a>
      </nav>

      <article className="productDetail">
        <section className="productGallery" aria-label={`Galeria de ${product.name}`}>
          {product.images.map((image, index) => (
            <div className={index === 0 ? "productGalleryMain" : undefined} key={image}>
              <Image
                src={asset(image)}
                alt={`${product.name} imagen ${index + 1}`}
                fill
                priority={index === 0}
                sizes={index === 0 ? "(max-width: 900px) 100vw, 58vw" : "(max-width: 900px) 50vw, 28vw"}
              />
            </div>
          ))}
        </section>

        <section className="productInfo">
          <p className="cinemaLabel">{product.category}</p>
          <h1>{product.name}</h1>
          <strong>{product.price}</strong>
          <p>{product.description}</p>

          {product.sizes?.length ? (
            <div className="sizePicker" aria-label="Tallas disponibles">
              <span>
                <Ruler aria-hidden="true" />
                Tallas
              </span>
              <div>
                {product.sizes.map((size) => (
                  <button type="button" key={size}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <a className="whatsappBuy" href={getWhatsappUrl(product)} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" />
            Comprar por WhatsApp
          </a>

          <div className="productSignal">
            <Waves aria-hidden="true" />
            <span>Drop editorial de disponibilidad limitada.</span>
          </div>
        </section>
      </article>

      <section className="relatedProducts">
        <div className="collectionSectionHead">
          <div>
            <p className="cinemaLabel">También puede interesarte</p>
            <h2>Más piezas de la colección.</h2>
          </div>
        </div>
        <div className="collectionGrid">
          {relatedProducts.map((related) => (
            <article className="collectionProduct" key={related.slug}>
              <a href={getProductUrl(related)}>
                <div className="collectionProductImage">
                  <Image
                    src={asset(related.images[0])}
                    alt={related.name}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                  {related.tag ? <span>{related.tag}</span> : null}
                </div>
                <div className="collectionProductBody">
                  <p>{related.category}</p>
                  <div>
                    <h3>{related.name}</h3>
                    <strong>{related.price}</strong>
                  </div>
                  <span>
                    Ver producto <ArrowRight aria-hidden="true" />
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
