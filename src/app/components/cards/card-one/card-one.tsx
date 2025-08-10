"use client";

import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPlane } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { CardProps } from "../card.types";
import { trackCardClick } from "@/app/utils/analytics";

import s from "./card-one.module.scss";

const CardOne: FC<{
  mockData: CardProps;
  color: string;
  position?: number;
}> = ({ mockData, color, position }) => {
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

  // Generate URL based on category and slug
  const getCardUrl = () => {
    if (mockData.category && mockData.slug) {
      return `/${mockData.category}/${mockData.slug}`;
    }
    // Fallback to blog if no category specified
    return `/blog/${mockData.slug || "post"}`;
  };

  const handleCardClick = () => {
    if (mockData) {
      trackCardClick({
        cardTitle: mockData.title || "Unknown Title",
        cardCategory: mockData.category || "Unknown Category",
        cardType: "CardOne",
        location: window.location.pathname,
        cardPosition: position,
      });
    }
  };

  return (
    <Link href={getCardUrl()} className={s.cardLink} onClick={handleCardClick}>
      <div className={s.container}>
        <div className={s.imageWrapper}>
          <Image
            className={s.image}
            src={mockData.thumbnail}
            alt={`${mockData.title} - ${mockData.country}`}
            // fill
            // sizes="(max-width: 768px) 100vw, 50vw"
            width={330}
            height={250}
            loading="lazy"
          />
          <div className={s.topTag}>
            <FontAwesomeIcon
              icon={faPlane}
              className={`${s.icon} ${getColourClassNames(color)}`}
            />
            {mockData.tags[0]}
          </div>
        </div>
        <div className={s.content}>
          <div className={s.tags}>
            <div className={`${s.tag} ${getColourClassNames(color)}`}>
              {mockData.tags[1]}
            </div>
            <div className={s.date}>{mockData.date}</div>
          </div>
          <h3>{mockData.title}</h3>
          <p>{mockData.description}</p>
          <div className={s.bottomInfo}>
            <div className={s.country}>
              <FontAwesomeIcon
                icon={faLocationDot}
                className={`${s.icon} ${getColourClassNames(color)}`}
              />
              {mockData.country}
            </div>
            <div className={s.readTime}>
              <FontAwesomeIcon icon={faClock} className={s.icon} />
              {mockData.readTime}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardOne;
