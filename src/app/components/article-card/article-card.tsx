import Link from "next/link";
import Image from "next/image";
import { CardProps } from "@/components/cards/card.types";
import s from "./article-card.module.scss";

const PILL_VARIANTS: Record<string, string> = {
  lifestyle: s.catPillCoral,
  taxes: s.catPillGold,
  "best-of-lists": s.catPillGold,
  "cost-of-living": s.catPillGreen,
  frameworks: s.catPillGreen,
  residency: s.catPillNavy,
  banking: s.catPillSky,
};

function pillClass(tag: string): string {
  return PILL_VARIANTS[tag.toLowerCase()] ?? "";
}

interface ArticleCardProps {
  article: CardProps;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const href =
    article.url ??
    (article.country && article.slug
      ? `/${article.country.toLowerCase()}/${article.slug}`
      : "/blog");

  const primaryTag = article.tags[0] ?? article.category ?? "";
  const secondaryTag = article.tags[1] ?? "";

  return (
    <Link href={href} className={s.cardLink}>
      <article className={s.card}>
        <div className={s.cardImg}>
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={s.cardImgEl}
          />
          {primaryTag && (
            <div className={s.cardImgOverlay}>
              <span className={`${s.catPill} ${pillClass(primaryTag)}`}>
                {primaryTag}
              </span>
            </div>
          )}
        </div>

        <div className={s.cardBody}>
          {secondaryTag && (
            <div className={s.cardPills}>
              <span className={`${s.catPill} ${pillClass(secondaryTag)}`}>
                {secondaryTag}
              </span>
            </div>
          )}

          <h3 className={s.cardTitle}>{article.title}</h3>
          <p className={s.cardDesc}>{article.description}</p>

          <div className={s.cardFooter}>
            <span className={s.dateMeta}>
              {article.date} · {article.readTime} read
            </span>
            <span className={s.readLink} aria-hidden="true">
              Read →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
