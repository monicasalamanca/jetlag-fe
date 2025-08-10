"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { CardProps } from "../card.types";
import { trackCardClick } from "@/app/utils/analytics";

import s from "./card-five.module.scss";

interface mockDataProps {
  mockData: CardProps;
}

const CardFive = ({ mockData }: mockDataProps) => {
  // Handle case where mockData is undefined
  if (!mockData) {
    return null;
  }

  const getCardUrl = () => {
    if (!mockData?.category || !mockData?.slug) {
      return "#"; // fallback URL
    }
    return `/${mockData.category}/${mockData.slug}`;
  };

  const handleCardClick = () => {
    if (mockData) {
      trackCardClick({
        cardTitle: mockData.title || "Unknown Title",
        cardCategory: mockData.category || "Unknown Category",
        cardType: "CardFive",
        location: window.location.pathname,
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
            alt={mockData.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            // width={330}
            // height={250}
            loading="lazy"
          />
          <div className={s.backgroundOverlay}>
            <div className={s.tag}>
              <FontAwesomeIcon icon={faFire} className={s.icon} />
              {mockData.tags[0]}
            </div>
            <div className={s.content}>
              <h3>{mockData.title}</h3>
              <p>{mockData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardFive;
