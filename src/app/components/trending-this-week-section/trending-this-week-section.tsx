import { TrendingThisWeekCard } from "@/api/types";
import TrendingCard from "./trending-card";
import s from "./trending-this-week-section.module.scss";

interface TrendingThisWeekSectionProps {
  trendingThisWeekCards: TrendingThisWeekCard[];
}

function getWeekLabel(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

const TrendingThisWeekSection = ({
  trendingThisWeekCards,
}: TrendingThisWeekSectionProps) => {
  if (!trendingThisWeekCards || trendingThisWeekCards.length < 2) {
    return null;
  }

  return (
    <section className={s.trendingSection} aria-label="Trending This Week">
      <div className={s.container}>
        <div className={s.sectionHeader}>
          <div className={s.headingGroup}>
            <p className={s.eyebrow}>
              <span className={s.eyebrowDot} aria-hidden="true" />
              TRENDING THIS WEEK
            </p>
            <h2 className={s.heading}>
              WHAT <span className={s.accentWord}>EVERYONE&apos;S</span> READING
            </h2>
          </div>
          <p className={s.timestamp}>UPDATED · WEEK OF {getWeekLabel()}</p>
        </div>

        <div className={s.trendingCards}>
          <TrendingCard card={trendingThisWeekCards[0]} position={0} rank={1} />
          <TrendingCard card={trendingThisWeekCards[1]} position={1} rank={2} />
        </div>
      </div>
    </section>
  );
};

export default TrendingThisWeekSection;
