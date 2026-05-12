"use client";

import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import {
  collectionCategories,
  getProductUrl,
  products,
  type ProductCategory,
} from "@/lib/collection";
import { asset } from "@/lib/blog";

type Filter = (typeof collectionCategories)[number];

export default function ProductFilterGrid() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Todo");
  const visibleProducts = useMemo(
    () =>
      activeFilter === "Todo"
        ? products
        : products.filter((product) => product.category === (activeFilter as ProductCategory)),
    [activeFilter],
  );

  return (
    <section className="collectionShelf" id="productos">
      <div className="collectionSectionHead">
        <div>
          <p className="cinemaLabel">Drop inicial</p>
          <h2>Prendas y objetos para llevar el oceano encima.</h2>
        </div>
        <div className="collectionFilters" aria-label="Filtros de productos">
          {collectionCategories.map((category) => (
            <button
              className={activeFilter === category ? "isActive" : undefined}
              key={category}
              onClick={() => setActiveFilter(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="collectionGrid">
        {visibleProducts.map((product) => (
          <article className="collectionProduct" key={product.slug}>
            <a href={getProductUrl(product)} aria-label={`Ver ${product.name}`}>
              <div className="collectionProductImage">
                <Image
                  src={asset(product.images[0])}
                  alt={product.name}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
                {product.tag ? <span>{product.tag}</span> : null}
              </div>
              <div className="collectionProductBody">
                <p>{product.category}</p>
                <div>
                  <h3>{product.name}</h3>
                  <strong>{product.price}</strong>
                </div>
                <span>
                  Ver producto <ArrowRight aria-hidden="true" />
                </span>
              </div>
            </a>
          </article>
        ))}
      </div>

      <div className="collectionNote">
        <ShoppingBag aria-hidden="true" />
        <p>Compra simple por WhatsApp. Cada producto puede crecer luego hacia stock real, tallas y nuevos drops.</p>
      </div>
    </section>
  );
}
