import Link from "next/link";
import { LifestyleSpotlightCard } from "@/api/types";
import SpotlightCard from "./spotlight-card";
import s from "./lifestyle-spotlight-section.module.scss";

interface LifestyleSpotlightSectionProps {
  blogs: LifestyleSpotlightCard[];
}

const LifestyleSpotlightSection = ({
  blogs,
}: LifestyleSpotlightSectionProps) => {
  if (!blogs || blogs.length < 3) {
    return null;
  }

  return (
    <section
      className={s.spotlightSection}
      aria-label="Featured Lifestyle Stories"
    >
      <div className={s.container}>
        <div className={s.sectionHeader}>
          <div className={s.headingGroup}>
            <p className={s.eyebrow}>EDITOR&apos;S SPOTLIGHT</p>
            <h2 className={s.heading}>
              WHAT&apos;S <span className={s.accentWord}>WORTH</span> READING
            </h2>
          </div>
          <Link href="/lifestyle" className={s.allArticlesLink}>
            ALL ARTICLES ›
          </Link>
        </div>

        <div className={s.cardsRow}>
          <div className={s.featuredCol}>
            <SpotlightCard blog={blogs[0]} position={0} cardType="featured" />
          </div>
          <div className={s.secondaryCol}>
            <SpotlightCard blog={blogs[1]} position={1} cardType="secondary" />
            <SpotlightCard blog={blogs[2]} position={2} cardType="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSpotlightSection;
