import Link from "next/link";
import Image from "next/image";
import { CardProps } from "@/components/cards/card.types";
import s from "./editors-brief.module.scss";

interface EditorsBriefProps {
  articles: CardProps[];
}

function getWeekLabel(): string {
  const now = new Date();
  const day = now.getDay();
  const daysToSubtract = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - daysToSubtract);
  return monday.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getPillLabel(article: CardProps): string {
  return article.category || article.tags?.[0] || "";
}

function getHref(article: CardProps): string {
  return article.url || `/blog/${article.slug}`;
}

const EditorsBrief = ({ articles }: EditorsBriefProps) => {
  if (articles.length === 0) return null;

  const weekLabel = getWeekLabel();
  const featured = articles[0];
  const col2 = articles.slice(1, 3);
  const col3 = articles.slice(3, 5);

  return (
    <section className={s.section}>
      <div className={s.header}>
        <div className={s.labelGroup}>
          <span className={s.dot} aria-hidden="true" />
          <span className={s.label}>
            EDITOR&apos;S BRIEF — TOP READS THIS WEEK
          </span>
        </div>
        <span className={s.weekLabel}>Week of {weekLabel}</span>
      </div>
      <hr className={s.divider} />

      <div className={s.grid}>
        <Link href={getHref(featured)} className={s.featuredCard}>
          <div className={s.featuredImg}>
            {featured.thumbnail && (
              <Image
                src={featured.thumbnail}
                alt={featured.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
            <div className={s.imgOverlay}>
              {getPillLabel(featured) && (
                <span className={s.catPillLight}>{getPillLabel(featured)}</span>
              )}
            </div>
          </div>
          <div className={s.featuredBody}>
            <h3 className={s.featuredTitle}>{featured.title}</h3>
            <p className={s.featuredDesc}>{featured.description}</p>
            <div className={s.footer}>
              <span className={s.meta}>
                {featured.date} · {featured.readTime}
              </span>
              <span className={s.readLink}>Read →</span>
            </div>
          </div>
        </Link>

        <div className={s.sideColumn}>
          {col2.map((article) => (
            <Link
              key={article.slug}
              href={getHref(article)}
              className={s.sideArticle}
            >
              <div className={s.sideImgWrap}>
                {article.thumbnail && (
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                )}
              </div>
              {getPillLabel(article) && (
                <span className={s.catPill}>{getPillLabel(article)}</span>
              )}
              <h4 className={s.sideTitle}>{article.title}</h4>
              <p className={s.sideDesc}>{article.description}</p>
              <div className={s.footer}>
                <span className={s.meta}>
                  {article.date} · {article.readTime}
                </span>
                <span className={s.readLink}>Read →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className={s.sideColumn}>
          {col3.map((article) => (
            <Link
              key={article.slug}
              href={getHref(article)}
              className={s.sideArticle}
            >
              <div className={s.sideImgWrap}>
                {article.thumbnail && (
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                )}
              </div>
              {getPillLabel(article) && (
                <span className={s.catPill}>{getPillLabel(article)}</span>
              )}
              <h4 className={s.sideTitle}>{article.title}</h4>
              <p className={s.sideDesc}>{article.description}</p>
              <div className={s.footer}>
                <span className={s.meta}>
                  {article.date} · {article.readTime}
                </span>
                <span className={s.readLink}>Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorsBrief;
