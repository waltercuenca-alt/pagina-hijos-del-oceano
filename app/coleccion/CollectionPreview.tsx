import Image from "next/image";
import { asset } from "@/lib/blog";

const previewGroups = [
  {
    title: "Polos",
    items: [
      {
        name: "Polo Ballena",
        image: "/brand/collection/polo-ballena-back.png",
        supportImage: "/brand/collection/polo-ballena-front.png",
      },
      {
        name: "Polo Hijos del Océano",
        image: "/brand/collection/polo-hijos-back.png",
        supportImage: "/brand/collection/polo-hijos-front.png",
      },
    ],
  },
  {
    title: "Accesorios",
    items: [
      {
        name: "Tote bag F*ck Plastic",
        image: "/brand/collection/tote-fuck-plastic.png",
      },
      {
        name: "Tote bag Anti Plastic Bag",
        image: "/brand/collection/tote-anti-plastic.png",
      },
    ],
  },
];

export default function CollectionPreview() {
  return (
    <section className="collectionPreview" aria-label="Preview de la colección">
      <div className="collectionPreviewIntro">
        <p className="cinemaLabel">Preview de la colección</p>
        <h3>PREVIEW DE LA COLECCIÓN</h3>
        <span>DROP 01 — Edición inicial</span>
        <p>Piezas creadas para quienes sienten que el mar también necesita una voz.</p>
      </div>

      <div className="previewGroups">
        {previewGroups.map((group) => (
          <div className="previewGroup" key={group.title}>
            <div className="previewGroupLabel">
              <span>{group.title}</span>
            </div>
            <div className="previewGrid">
              {group.items.map((item) => (
                <article className="previewPiece" key={item.name}>
                  <div className="previewImage">
                    <Image
                      src={asset(item.image)}
                      alt={item.name}
                      fill
                      sizes="(max-width: 760px) 100vw, 50vw"
                    />
                    {item.supportImage ? (
                      <Image
                        src={asset(item.supportImage)}
                        alt=""
                        width={130}
                        height={130}
                        aria-hidden="true"
                        className="previewThumb"
                      />
                    ) : null}
                  </div>
                  <div className="previewCaption">
                    <p>{group.title}</p>
                    <h4>{item.name}</h4>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
