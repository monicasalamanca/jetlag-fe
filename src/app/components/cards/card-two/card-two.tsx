import React, { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { CardProps } from "../card.types";

import s from "./card-two.module.scss";

const CardTwo: FC<{ mockData: CardProps; color: string }> = ({
  mockData,
  color,
}) => {
  const getColourClassNames = (color: string) => {
    switch (color) {
      case "blue":
        return `${s.blue}`;
      case "green":
        return `${s.green}`;
      case "purple":
        return `${s.purple}`;
      case "orange":
        return `${s.orange}`;
      case "red":
        return `${s.red}`;
    }
  };

  const getCardUrl = () => {
    if (!mockData?.category || !mockData?.slug) {
      return "#"; // fallback URL
    }
    return `/${mockData.category}/${mockData.slug}`;
  };

  return (
    <Link href={getCardUrl()} className={s.cardLink}>
      <div className={s.container}>
        <div className={s.imageWrapper}>
          <Image
            className={s.image}
            src={mockData.thumbnail}
            alt={mockData.title}
            width={330}
            height={250}
            loading="lazy"
          />
          <div className={s.readTime}>
            <FontAwesomeIcon icon={faClockRotateLeft} className={s.icon} />
            {mockData.readTime}
          </div>
          <div className={s.bottomInfo}>
            <div className={`${s.tag} ${getColourClassNames(color)}`}>
              {mockData.tags[0]}
            </div>
            <h3>{mockData.title}</h3>
          </div>
        </div>
        <div className={s.content}>
          <div className={s.topContent}>
            <div className={s.country}>
              <FontAwesomeIcon
                icon={faLocationDot}
                className={`${s.icon} ${getColourClassNames(color)}`}
              />
              Bali, Indonesia
            </div>
            <div className={s.date}>{mockData.date}</div>
          </div>
          <p>{mockData.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardTwo;
