import Image from "next/image";
import { asset } from "@/lib/blog";

const dropGroups = [
  {
    title: "Polos",
    items: [
      {
        name: "Fuck Plastic",
        price: "S/ 60",
        image: "/brand/collection/polo-ballena-back.png",
        supportImage: "/brand/collection/polo-ballena-front.png",
      },
      {
        name: "Hijos del Océano Classic",
        price: "S/ 60",
        image: "/brand/collection/polo-classic-back.png",
        supportImage: "/brand/collection/polo-classic-front.png",
      },
      {
        name: "Hijos del Océano Ballena",
        price: "S/ 60",
        image: "/brand/collection/polo-hijos-back.png",
        supportImage: "/brand/collection/polo-hijos-front.png",
      },
      {
        name: "Hijos del Océano Lila",
        price: "S/ 60",
        image: "/brand/collection/polo-lila-back.png",
        supportImage: "/brand/collection/polo-lila-front.png",
      },
      {
        name: "Hijos del Océano Gold",
        price: "S/ 60",
        image: "/brand/collection/polo-gold-back.png",
        supportImage: "/brand/collection/polo-gold-front.png",
      },
    ],
  },
  {
    title: "Accesorios",
    items: [
      {
        name: "F*ck Plastic Tote Bag",
        price: "S/ 30",
        image: "/brand/collection/tote-fuck-plastic.png",
      },
      {
        name: "Anti Plastic Bag Tote Bag",
        price: "S/ 30",
        image: "/brand/collection/tote-anti-plastic.png",
      },
    ],
  },
];

export default function CollectionPreview() {
  return (
    <section className="collectionPreview" aria-label="Drop 01 colección">
      <div className="collectionPreviewIntro">
        <p className="cinemaLabel">Drop inicial</p>
        <h3>SOMOS LA VOZ DEL MAR</h3>
        <span>DROP 01</span>
      </div>

      <div className="previewGroups">
        {dropGroups.map((group) => (
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
                    <div>
                      <p>{group.title}</p>
                      <h4>{item.name}</h4>
                    </div>
                    <strong>{item.price}</strong>
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
