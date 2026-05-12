import { asset } from "@/lib/blog";

export type ProductCategory = "Polos" | "Hoodies" | "Accesorios" | "Posters";

export type Product = {
  slug: string;
  name: string;
  price: string;
  category: ProductCategory;
  tag?: "Nuevo" | "Limitado" | "Próximamente";
  images: string[];
  description: string;
  sizes?: string[];
};

export const collectionCategories = ["Polos", "Accesorios", "Posters"] as const;

export const products: Product[] = [
  {
    slug: "polo-hijos-del-oceano",
    name: "Polo Hijos del Océano",
    price: "S/ 79",
    category: "Polos",
    tag: "Nuevo",
    images: ["/brand/polo-sun-wave.png", "/brand/polo-ocean-killers.png"],
    description:
      "Polo editorial de corte urbano inspirado en rutas costeras, dias largos y una identidad nacida cerca del mar.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "polo-el-ultimo-viaje",
    name: "Polo El Ultimo Viaje",
    price: "S/ 89",
    category: "Polos",
    tag: "Limitado",
    images: ["/brand/polo-ocean-killers.png", "/brand/polo-drop-2.png"],
    description:
      "Una pieza gráfica para quienes entienden el océano como memoria, camino y manifiesto personal.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "hoodie-espiritu-del-mar",
    name: "Hoodie Espiritu del Mar",
    price: "S/ 149",
    category: "Hoodies",
    tag: "Próximamente",
    images: ["/brand/ocean-killers.png", "/images/hero-oceano.png"],
    description:
      "Hoodie oscuro de energía cinematográfica, pensado para noches de ruta, viento frío y pertenencia oceánica.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "tote-bag-oceano-vivo",
    name: "Tote Bag Océano Vivo",
    price: "S/ 49",
    category: "Accesorios",
    tag: "Nuevo",
    images: ["/brand/tortuga-lineal.jpg", "/brand/logo-oficial.png"],
    description:
      "Bolsa minimalista para cargar libros, playa, mercado y pequenas decisiones de una vida mas consciente.",
  },
  {
    slug: "gorra-hijos-del-oceano",
    name: "Gorra Hijos del Océano",
    price: "S/ 59",
    category: "Accesorios",
    images: ["/brand/logo-oficial.png", "/images/hero-oceano.png"],
    description:
      "Gorra de uso diario con identidad sobria, hecha para ciudad, costa y movimiento.",
  },
  {
    slug: "poster-editorial-marino",
    name: "Poster Editorial Marino",
    price: "S/ 35",
    category: "Posters",
    tag: "Limitado",
    images: ["/brand/contaminacion-playa.jpg", "/brand/tortuga-lineal.jpg"],
    description:
      "Pieza visual de pared con tono documental: una invitación a mirar el océano como territorio emocional.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product) {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.slug !== product.slug,
  );
  const fallback = products.filter((item) => item.slug !== product.slug);

  return (sameCategory.length ? sameCategory : fallback).slice(0, 3);
}

export function getProductUrl(product: Product) {
  return asset(`/coleccion/${product.slug}/`);
}

export function getWhatsappUrl(product: Product) {
  const message = `Hola, quiero comprar el producto ${product.name}. ¿Está disponible?`;

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
