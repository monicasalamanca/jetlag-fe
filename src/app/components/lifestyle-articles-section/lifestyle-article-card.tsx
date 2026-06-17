import Link from "next/link";
import Image from "next/image";
import s from "./lifestyle-article-card.module.scss";

export interface ArticleCardProps {
  title: string;
  href: string;
  categories: string[];
  tags: string[];
  description: string;
  author?: string;
  date: string;
  readTime?: number;
  imageUrl?: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function LifestyleArticleCard({
  title,
  href,
  categories,
  tags,
  description,
  author,
  date,
  readTime,
  imageUrl,
  gradientFrom,
  gradientTo,
}: ArticleCardProps) {
  const primaryCategory = (categories[0] || "lifestyle")
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  const displayTags = tags.slice(0, 2);

  return (
    <article className={s.card} data-categories={categories.join(",")}>
      <Link href={href} className={s.cardLink}>
        <div className={s.cardImg}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              className={s.cardImgInner}
              style={{
                background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
              }}
            />
          )}
          <div className={s.cardImgOverlay} />
          <span className={s.categoryBadge}>{primaryCategory}</span>
        </div>
        <div className={s.cardBody}>
          <div className={s.tags}>
            {displayTags.map((tag) => (
              <span key={tag} className={s.tag}>
                {tag}
              </span>
            ))}
          </div>
          <h3 className={s.title}>{title}</h3>
          <p className={s.description}>{description}</p>
          <div className={s.footer}>
            <span className={s.meta}>
              {author ? `By ${author} · ` : ""}
              {date}
              {readTime ? ` · ${readTime} min` : ""}
            </span>
            <span className={s.readLink} aria-hidden="true">
              Read →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
