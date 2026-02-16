import { LifestyleSpotlightCard } from "@/api/types";
import SpotlightCard from "./spotlight-card";
import s from "./lifestyle-spotlight-section.module.scss";

interface LifestyleSpotlightSectionProps {
  blogs: LifestyleSpotlightCard[];
}

/**
 * Server Component for Lifestyle Spotlight Section
 * Editorial-style asymmetrical grid showcasing three featured lifestyle blogs
 *
 * Layout:
 * - Mobile: Vertical stack (hero → tall card 1 → tall card 2)
 * - Desktop: Asymmetrical grid (hero left, two tall cards stacked right)
 *
 * @param blogs - Array of exactly 3 spotlight blog cards
 */
const LifestyleSpotlightSection = ({
  blogs,
}: LifestyleSpotlightSectionProps) => {
  // Hide section if fewer than 3 blogs
  if (!blogs || blogs.length < 3) {
    return null;
  }

  return (
    <section
      className={s.spotlightSection}
      aria-label="Featured Lifestyle Stories"
    >
      <div className={s.container}>
        <div className={s.grid}>
          {/* Primary hero card (left column on desktop) */}
          <div className={s.primaryCard}>
            <SpotlightCard blog={blogs[0]} position={0} cardType="primary" />
          </div>

          {/* Secondary cards (right column on desktop, stacked) */}
          <div className={s.secondaryCards}>
            <SpotlightCard blog={blogs[1]} position={1} cardType="secondary" />
            <SpotlightCard blog={blogs[2]} position={2} cardType="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSpotlightSection;
