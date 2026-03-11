import Image from "next/image";

import { TheJetLaggersPickCard } from "@/api/types";
import TrackJustinsPickClick from "./track-justins-pick-click";
import s from "./justins-pick-card.module.scss";

interface JustinsPickCardProps {
  card: TheJetLaggersPickCard;
  position: number;
}

/**
 * Server Component for an individual Justin's Pick card.
 * Horizontal layout: two-digit number, thumbnail, then title + description.
 */
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
          sizes="(max-width: 600px) 80px, 120px"
          className={s.image}
          priority={position === 0}
        />
      </div>

      {/* Title + Description */}
      <div className={s.cardContent}>
        <h3 className={s.cardTitle}>{card.title}</h3>
        {card.description && (
          <p className={s.cardDescription}>{card.description}</p>
        )}
      </div>
    </TrackJustinsPickClick>
  );
};

export default JustinsPickCard;
