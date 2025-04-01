import { FC } from "react";

import Image from "next/image";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import s from "./info-card.module.scss";

const InfoCard: FC<{
  icon: IconDefinition;
  iconColor: string;
  contrastColor: string;
  title: string;
  list: string[];
  imageSrc: string;
  imageAltText: string;
  description: string;
}> = ({
  icon,
  iconColor,
  contrastColor,
  title,
  list,
  imageSrc,
  imageAltText,
  description,
}) => {
  const getClassName = () => {
    if (contrastColor === "#EEF6FF") return s.lightBlueBgList;
    if (contrastColor === "#FFFFFF") return s.lightTealBgList;
    if (contrastColor === "#ECFCF4") return s.lightGreenBgList;
    if (contrastColor === "#FEFBEB") return s.lightYellowBgList;
  };
  return (
    <div className={s.container}>
      <div className={s.title}>
        <FontAwesomeIcon
          icon={icon}
          className={s.icon}
          style={{ color: iconColor }}
        />
        <h2>{title}</h2>
      </div>
      <ol className={`${s.list} + ${getClassName()}`}>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
      <div className={s.imageContainer}>
        <Image
          className={s.cardImage}
          src={imageSrc}
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
