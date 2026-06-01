import Image from "next/image";

import { TrendingThisWeekCard } from "@/api/types";
import TrackTrendingClick from "./track-trending-click";
import s from "./trending-this-week-section.module.scss";

interface TrendingCardProps {
  card: TrendingThisWeekCard;
  position: number;
  rank: number;
}

const TrendingCard = ({ card, position, rank }: TrendingCardProps) => {
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
      <div className={s.imageWrapper}>
        <Image
          src={card.imageUrl}
          alt={card.title}
          fill
          sizes="(max-width: 600px) 160px, 220px"
          className={s.image}
          priority={position === 0}
        />
      </div>

      <div className={s.cardBody}>
        <div className={s.rankIndicator}>
          <span className={s.dot} aria-hidden="true" />
          <span>#{String(rank).padStart(2, "0")} · TRENDING</span>
        </div>

        <h3 className={s.cardTitle}>{card.title}</h3>

        <div className={s.cardFooter}>
          <div className={s.tags}>
            {card.tags.map((tag) => (
              <span
                key={tag.label}
                className={`${s.tag} ${s[`tag--${tag.variant}`]}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
          {card.readTime && (
            <span className={s.readTime}>{card.readTime} MIN READ</span>
          )}
        </div>
      </div>
    </TrackTrendingClick>
  );
};

export default TrendingCard;
