import Image from "next/image";
import { LifestyleSpotlightCard } from "@/api/types";
import TrackSpotlightClick from "./track-spotlight-click";
import s from "./spotlight-card.module.scss";

interface SpotlightCardProps {
  blog: LifestyleSpotlightCard;
  position: number;
  cardType: "featured" | "secondary";
}

const SpotlightCard = ({ blog, position, cardType }: SpotlightCardProps) => {
  const destinationUrl = blog.lifestyle
    ? `/lifestyle/${blog.slug}`
    : `/${blog.countryName?.toLowerCase().replace(/\s+/g, "-")}/${blog.slug}`;

  const primaryTag = blog.tags.length > 0 ? blog.tags[0] : null;
  const isFeatured = cardType === "featured";
  const HeadingTag = isFeatured ? "h2" : "h3";

  return (
    <TrackSpotlightClick
      blogId={blog.id}
      blogSlug={blog.slug}
      lifestyle={blog.lifestyle}
      position={position}
      href={destinationUrl}
      className={s.card}
    >
      <div className={`${s.imageArea} ${s[`imageArea--${cardType}`]}`}>
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 490px"
              : "(max-width: 768px) 100vw, 50vw"
          }
          className={s.image}
          priority={position === 0}
        />
        {primaryTag && <span className={s.categoryTag}>{primaryTag}</span>}
      </div>
      <div className={`${s.body} ${s[`body--${cardType}`]}`}>
        {isFeatured && <span className={s.featuredBadge}>FEATURED</span>}
        <HeadingTag className={`${s.title} ${s[`title--${cardType}`]}`}>
          {blog.title}
        </HeadingTag>
        {blog.excerpt && (
          <p className={`${s.excerpt} ${s[`excerpt--${cardType}`]}`}>
            {blog.excerpt}
          </p>
        )}
        <div className={`${s.footer} ${s[`footer--${cardType}`]}`}>
          <span className={s.meta}>By Justin</span>
          <span className={s.readLink}>READ ›</span>
        </div>
      </div>
    </TrackSpotlightClick>
  );
};

export default SpotlightCard;
