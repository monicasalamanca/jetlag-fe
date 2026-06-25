import Link from "next/link";
import Image from "next/image";
import { CardProps } from "@/components/cards/card.types";
import s from "./blog-hero.module.scss";

interface BlogHeroProps {
  blogs: CardProps[];
}

const BlogHero = ({ blogs }: BlogHeroProps) => {
  const articleCount = blogs.length;
  const countryCount = new Set(
    blogs.map((b) => b.country).filter((c) => c && c !== "lifestyle"),
  ).size;

  const miniCards = blogs.slice(0, 3);
  const tickerTitles = blogs.slice(0, 12).map((b) => b.title);
  const tickerItems = [...tickerTitles, ...tickerTitles];

  return (
    <section className={s.hero}>
      <div className={s.heroContent}>
        <div className={s.heroLeft}>
          <div className={s.eyebrow}>
            THE JET LAG CHRONICLES · FULL ARCHIVE · /BLOG
          </div>

          <h1 className={s.headline}>
            EVERY
            <br />
            <span className={s.accent}>DISPATCH.</span>
          </h1>

          <p className={s.description}>
            Visas, taxes, cost of living, relocation strategy — and the raw
            daily reality of building a life across borders. No fluff. No
            tourism board money. Every article, every country, in one place.
          </p>

          <div className={s.statsRow}>
            <div className={s.stat}>
              <span className={s.statNumber}>{articleCount}</span>
              <span className={s.statLabel}>Dispatches</span>
            </div>
            <div className={s.statDivider} aria-hidden="true" />
            <div className={s.stat}>
              <span className={s.statNumber}>{countryCount}</span>
              <span className={s.statLabel}>Countries Covered</span>
            </div>
            <div className={s.statDivider} aria-hidden="true" />
            <div className={s.stat}>
              <span className={s.statNumber}>0</span>
              <span className={s.statLabel}>Sponsored Posts</span>
            </div>
            <div className={s.statDivider} aria-hidden="true" />
            <div className={s.stat}>
              <span className={s.statNumber}>2026</span>
              <span className={s.statLabel}>All Updated</span>
            </div>
          </div>
        </div>

        <div className={s.heroRight} aria-hidden="true">
          <div className={s.miniCards}>
            {miniCards.map((blog) => (
              <Link
                key={blog.slug}
                href={blog.url || `/blog/${blog.slug}`}
                className={s.miniCard}
              >
                <div className={s.miniThumb}>
                  {blog.thumbnail && (
                    <Image
                      src={blog.thumbnail}
                      alt={blog.title}
                      width={96}
                      height={72}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  )}
                </div>
                <div className={s.miniContent}>
                  {blog.tags[0] && (
                    <span className={s.categoryPill}>{blog.tags[0]}</span>
                  )}
                  <h3 className={s.miniTitle}>{blog.title}</h3>
                  <p className={s.miniMeta}>
                    {blog.date} · {blog.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {tickerItems.length > 0 && (
        <div className={s.ticker} aria-hidden="true">
          <div className={s.tickerTrack}>
            {tickerItems.map((title, i) => (
              <span key={i} className={s.tickerItem}>
                <span className={s.tickerArrow}>↗</span>
                {title.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogHero;
