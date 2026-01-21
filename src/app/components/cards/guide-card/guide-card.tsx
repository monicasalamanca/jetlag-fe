"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Guide } from "@/api/types";
// import { trackCardClick } from "@/app/utils/analytics";

import s from "./guide-card.module.scss";

interface GuideCardProps {
  guide: Guide;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  const handleCardClick = () => {
    // Track card click analytics when ready
    // trackCardClick({
    //   cardTitle: guide.title,
    //   cardCategory: guide.type,
    //   cardType: "GuideCard",
    //   location: window.location.pathname,
    // });
  };

  // Format price for display
  const formatPrice = (price: number | null, type: string) => {
    if (type.toLowerCase() === "free" || price === null || price === 0) {
      return "$0";
    }
    return `$${price}`;
  };

  const originalPrice = guide.originalPriceCents
    ? formatPrice(guide.originalPriceCents, guide.type)
    : null;

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className={s.cardLink}
      onClick={handleCardClick}
      rel="canonical"
    >
      <div className={s.container}>
        <div className={s.imageWrapper}>
          <Image
            className={s.image}
            src={guide.coverImage?.url || "/placeholder-guide.jpg"}
            alt={guide.coverImage?.alternativeText || guide.title}
            width={guide.coverImage?.width || 330}
            height={guide.coverImage?.height || 250}
            loading="lazy"
          />
        </div>
        <div className={s.content}>
          <div className={s.topContent}>
            <div className={s.guideType}>
              <div className={s.purple}>{guide.type}</div>
            </div>
            <div className={s.pages}>{guide.pageCount} pages</div>
          </div>
          <div className={s.mainContent}>
            <h3 className={s.title}>{guide.title}</h3>
            <p>{guide.description}</p>
          </div>
          <div className={s.bottomContent}>
            <h3 className={s.price}>
              {originalPrice && (
                <span className={s.originalPrice}>{originalPrice}</span>
              )}
            </h3>
            <div className={s.readMoreBtn}>Read More</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GuideCard;
