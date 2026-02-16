import Image from "next/image";
import TrackSpotlightClick from "./track-spotlight-click";

import s from "./spotlight-card.module.scss";

interface SpotlightCardProps {
  blog: {
    id: number;
    title: string;
    slug: string;
    lifestyle: boolean;
    countryName: string | null;
    tags: string[];
    imageUrl: string;
  };
  position: number;
  cardType: "primary" | "secondary";
}

/**
 * Server Component for individual spotlight card
 * Displays blog with editorial magazine-style layout
 */
const SpotlightCard = ({ blog, position, cardType }: SpotlightCardProps) => {
  // Generate the correct destination URL
  const destinationUrl = blog.lifestyle
    ? `/lifestyle/${blog.slug}`
    : `/${blog.countryName?.toLowerCase().replace(/\s+/g, "-")}/${blog.slug}`;

  // Pick a random tag for the badge (if available)
  const randomTag =
    blog.tags.length > 0
      ? blog.tags[Math.floor(Math.random() * blog.tags.length)]
      : null;

  // Determine heading level based on card type
  const HeadingTag = cardType === "primary" ? "h2" : "h3";

  return (
    <TrackSpotlightClick
      blogId={blog.id}
      blogSlug={blog.slug}
      lifestyle={blog.lifestyle}
      position={position}
      href={destinationUrl}
      className={`${s.card} ${s[`card--${cardType}`]}`}
    >
      <div className={s.imageWrapper}>
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          sizes={
            cardType === "primary"
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 25vw"
          }
          className={s.image}
          priority={position === 0}
        />
        {randomTag && (
          <span
            className={`${s.badge} ${cardType === "secondary" ? s[`badge--position${position}`] : ""}`}
            aria-label={`Tag: ${randomTag}`}
          >
            {randomTag}
          </span>
        )}
        <div className={s.overlay} aria-hidden="true" />
        <HeadingTag className={s.title}>{blog.title}</HeadingTag>
      </div>
    </TrackSpotlightClick>
  );
};

export default SpotlightCard;
