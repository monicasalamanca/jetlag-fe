import { FC } from "react";

import Image from "next/image";
import IconImporter from "../iconImporter";

import s from "./info-card.module.scss";

const InfoCard: FC<{
  name: string;
  icon: string;
  description: string;
  keywords: string;
  image: string;
  imageAltText: string;
}> = ({ name, icon, description, keywords, image, imageAltText }) => {
  return (
    <div className={s.container}>
      <div className={s.title}>
        <IconImporter iconName={icon} className={s.icon} />
        <h2>{name}</h2>
      </div>
      <ol className={`${s.list} ${s.lightGreenBgList}`}>
        {keywords.split(",").map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
      <div className={s.imageContainer}>
        <Image
          className={s.cardImage}
          src={image}
          alt={imageAltText}
          width={640}
          height={427}
          loading="lazy"
        />
      </div>
      <p>{description}</p>
    </div>
  );
};

export default InfoCard;
