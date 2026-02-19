import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import { TrendingThisWeekCard } from "@/api/types";
import TrackTrendingClick from "./track-trending-click";
import s from "./trending-this-week-section.module.scss";

interface TrendingCardProps {
  card: TrendingThisWeekCard;
  position: number;
}

/**
 * Server Component for an individual trending card.
 * Horizontal layout: thumbnail image on the left, white content panel on the right.
 * Content panel: fire icon + "Trending" label on top, title below.
 */
const TrendingCard = ({ card, position }: TrendingCardProps) => {
  const destinationUrl = card.lifestyle
    ? `/lifestyle/${card.slug}`
    : `/${card.countryName?.toLowerCase().replace(/\s+/g, "-")}/${card.slug}`;

  return (
    <TrackTrendingClick
      blogId={card.id}
      blogSlug={card.slug}
      blogTitle={card.title}
      lifestyle={card.lifestyle}
      countryName={card.countryName}
      position={position}
      href={destinationUrl}
      className={s.card}
    >
      {/* Left: thumbnail image */}
      <div className={s.imageWrapper}>
        <Image
          src={card.imageUrl}
          alt={card.title}
          fill
          sizes="(max-width: 600px) 45vw, 25vw"
          className={s.image}
          priority={position === 0}
        />
      </div>

      {/* Right: white content panel */}
      <div className={s.cardContent}>
        <span className={s.trendingLabel}>
          <FontAwesomeIcon
            icon={faFire}
            className={s.trendingIcon}
            aria-hidden="true"
          />
          Trending
        </span>
        <h3 className={s.cardTitle}>{card.title}</h3>
      </div>
    </TrackTrendingClick>
  );
};

export default TrendingCard;
