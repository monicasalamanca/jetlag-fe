import Link from "next/link";
import Image from "next/image";
import { LifestyleArticle } from "@/api/types";
import s from "./lifestyle-hero.module.scss";

interface LifestyleHeroProps {
  articles: LifestyleArticle[];
}

const LifestyleHero = ({ articles }: LifestyleHeroProps) => {
  const featured = articles[0];
  const second = articles[1];
  const third = articles[2];

  return (
    <section className={s.hero}>
      <div className={s.glowOverlay} aria-hidden="true" />

      <div className={s.heroLeft}>
        <div className={s.eyebrow}>
          <span className={s.eyebrowRule} aria-hidden="true" />
          Lifestyle Abroad
        </div>

        <h1 className={s.headline}>
          Life
          <br />
          <span className={s.accent}>Abroad</span>
          <br />
          Is Not
          <br />
          Instagram
        </h1>

        <p className={s.subhead}>
          We document what the algorithm won&apos;t show you,{" "}
          <em>the visa runs, the tax headaches, the unglamorous wins</em>, so
          you can build a life abroad without the illusions.
        </p>

        <div className={s.statRow}>
          <div className={s.stat}>
            <span className={s.statNumber}>{articles.length || "—"}</span>
            <span className={s.statLabel}>Dispatches</span>
          </div>
          <div className={s.statDivider} aria-hidden="true" />
          <div className={s.stat}>
            <span className={s.statNumber}>6+</span>
            <span className={s.statLabel}>Countries Lived</span>
          </div>
          <div className={s.statDivider} aria-hidden="true" />
          <div className={s.stat}>
            <span className={s.statNumber}>0</span>
            <span className={s.statLabel}>Sponsored Posts</span>
          </div>
        </div>
      </div>

      <div className={s.heroRight} aria-hidden="true">
        <span className={s.ghostText}>LIFE</span>
        <div className={s.previewGrid}>
          {/* Featured card */}
          {featured && (
            <Link
              href={`/lifestyle/${featured.slug}`}
              className={`${s.miniCard} ${s.miniCardFeatured}`}
            >
              <div className={s.featuredThumb}>
                {featured.imageUrl ? (
                  <Image
                    src={featured.imageUrl}
                    alt={featured.title}
                    width={80}
                    height={80}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                    }}
                  />
                ) : null}
              </div>
              <div className={s.featuredContent}>
                <div className={s.featuredTags}>
                  {featured.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className={s.miniCardTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className={s.miniCardTitle}>{featured.title}</h3>
                <p className={s.miniCardMeta}>
                  {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          )}

          {/* Smaller card 1 */}
          {second && (
            <Link href={`/lifestyle/${second.slug}`} className={s.miniCard}>
              {second.tags[0] && (
                <span className={s.miniCardTag}>{second.tags[0]}</span>
              )}
              <h3 className={s.miniCardTitle}>{second.title}</h3>
              <p className={s.miniCardMeta}>
                {new Date(second.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </Link>
          )}

          {/* Smaller card 2 */}
          {third && (
            <Link href={`/lifestyle/${third.slug}`} className={s.miniCard}>
              {third.tags[0] && (
                <span className={s.miniCardTag}>{third.tags[0]}</span>
              )}
              <h3 className={s.miniCardTitle}>{third.title}</h3>
              <p className={s.miniCardMeta}>
                {new Date(third.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default LifestyleHero;
