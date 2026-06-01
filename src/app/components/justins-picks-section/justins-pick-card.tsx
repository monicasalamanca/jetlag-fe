import Image from "next/image";

import { TheJetLaggersPickCard } from "@/api/types";
import TrackJustinsPickClick from "./track-justins-pick-click";
import s from "./justins-pick-card.module.scss";

interface JustinsPickCardProps {
  card: TheJetLaggersPickCard;
  position: number;
}

const JustinsPickCard = ({ card, position }: JustinsPickCardProps) => {
  const destinationUrl = card.lifestyle
    ? `/lifestyle/${card.slug}`
    : `/${card.countryName?.toLowerCase().replace(/\s+/g, "-")}/${card.slug}`;

  const formattedNumber = String(position + 1).padStart(2, "0");

  return (
    <TrackJustinsPickClick
      blogId={card.id}
      blogSlug={card.slug}
      blogTitle={card.title}
      lifestyle={card.lifestyle}
      countryName={card.countryName}
      position={position}
      href={destinationUrl}
      className={s.card}
    >
      {/* Number */}
      <span className={s.cardNumber} aria-hidden="true">
        {formattedNumber}
      </span>

      {/* Thumbnail */}
      <div className={s.imageWrapper}>
        <Image
          src={card.imageUrl}
          alt={card.title}
          fill
          sizes="(max-width: 600px) 96px, 168px"
          className={s.image}
          priority={position === 0}
        />
      </div>

      {/* Body */}
      <div className={s.cardContent}>
        <h3 className={s.cardTitle}>{card.title}</h3>
        {card.description && (
          <p className={s.cardDescription}>{card.description}</p>
        )}
        <div className={s.cardFooter}>
          {card.tags.length > 0 && (
            <div className={s.tags}>
              {card.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag.label}
                  className={`${s.tag} ${s[`tag--${tag.variant}`]}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
          {card.readTime && (
            <span className={s.readTime}>{card.readTime} MIN READ</span>
          )}
        </div>
      </div>

      {/* Arrow */}
      <span className={s.cardArrow} aria-hidden="true">
        ›
      </span>
    </TrackJustinsPickClick>
  );
};

export default JustinsPickCard;
