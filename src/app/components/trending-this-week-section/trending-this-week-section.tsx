import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import { TrendingThisWeekCard } from "@/api/types";
import TrendingCard from "./trending-card";
import s from "./trending-this-week-section.module.scss";

interface TrendingThisWeekSectionProps {
  trendingThisWeekCards: TrendingThisWeekCard[];
}

/**
 * Server Component for Trending This Week Section.
 * Displays exactly two wide, energetic cards for trending blog posts.
 *
 * Layout:
 * - Mobile: Vertical stack
 * - Tablet / Desktop: Two cards side by side
 *
 * Hidden automatically when fewer than 2 cards are provided.
 *
 * @param trendingThisWeekCards - Array of exactly 2 trending blog cards
 */
const TrendingThisWeekSection = ({
  trendingThisWeekCards,
}: TrendingThisWeekSectionProps) => {
  if (!trendingThisWeekCards || trendingThisWeekCards.length < 2) {
    return null;
  }

  return (
    <section className={s.trendingSection} aria-label="Trending This Week">
      <div className={s.header}>
        <FontAwesomeIcon
          icon={faFire}
          className={s.fireIcon}
          aria-hidden="true"
        />
        <h2 className={s.sectionTitle}>Trending This Week</h2>
      </div>

      <div className={s.grid}>
        <TrendingCard card={trendingThisWeekCards[0]} position={0} />
        <TrendingCard card={trendingThisWeekCards[1]} position={1} />
      </div>
    </section>
  );
};

export default TrendingThisWeekSection;
