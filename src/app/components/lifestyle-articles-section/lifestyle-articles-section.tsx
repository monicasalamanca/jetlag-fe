import { LifestyleArticle } from "@/api/types";
import LifestyleArticleCard, {
  ArticleCardProps,
} from "./lifestyle-article-card";
import LifestyleInlineNewsletter from "./lifestyle-inline-newsletter";
import s from "./lifestyle-articles-section.module.scss";

// Gradient palette — assigned by index so each card has a distinct look.
const GRADIENT_PALETTE: { from: string; to: string }[] = [
  { from: "#0c3d5e", to: "#c45c0e" },
  { from: "#0c4a2c", to: "#1a4a6e" },
  { from: "#3b1f5e", to: "#1a2535" },
  { from: "#0c3d5e", to: "#0e6655" },
  { from: "#6e2f1a", to: "#1a3d5e" },
  { from: "#1a2535", to: "#2b3a52" },
  { from: "#922b21", to: "#7d4e00" },
  { from: "#1a2535", to: "#4a235a" },
  { from: "#0e6655", to: "#154360" },
  { from: "#1a2535", to: "#1f618d" },
  { from: "#4a235a", to: "#2c1810" },
  { from: "#1a3a5e", to: "#0d1520" },
  { from: "#0e6655", to: "#1a5e3a" },
];

function mapArticleToCardProps(
  article: LifestyleArticle,
  index: number,
): ArticleCardProps {
  const { from, to } = GRADIENT_PALETTE[index % GRADIENT_PALETTE.length];

  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  // Categories come from tags; fall back to "lifestyle" if none.
  const categories =
    article.tags.length > 0
      ? article.tags.map((t) => t.toLowerCase().replace(/\s+/g, "-"))
      : ["lifestyle"];

  return {
    title: article.title,
    href: `/lifestyle/${article.slug}`,
    categories,
    tags: article.tags.slice(0, 2),
    description: article.description,
    date,
    imageUrl: article.imageUrl,
    gradientFrom: from,
    gradientTo: to,
  };
}

interface LifestyleArticlesSectionProps {
  articles: LifestyleArticle[];
}

export default function LifestyleArticlesSection({
  articles,
}: LifestyleArticlesSectionProps) {
  const cards = articles.map(mapArticleToCardProps);

  return (
    <section className={s.section} id="articles">
      <div className={s.header}>
        <div className={s.eyebrow}>
          <span className={s.eyebrowRule} aria-hidden="true" />
          From the Field
        </div>
        <h2 className={s.title}>
          Latest <span className={s.titleAccent}>Dispatches</span>
        </h2>
        <p className={s.subtitle}>
          First-hand accounts, hard-won lessons, and honest takes on the
          realities of building a life abroad — written by people actually
          living it.
        </p>
      </div>

      <div className={s.grid}>
        {cards.slice(0, 3).map((card) => (
          <LifestyleArticleCard key={card.href} {...card} />
        ))}

        <LifestyleInlineNewsletter />

        {cards.slice(3).map((card) => (
          <LifestyleArticleCard key={card.href} {...card} />
        ))}
      </div>
    </section>
  );
}
