"use client";

import {
  LifestyleSpotlightCard,
  TheJetLaggersPickCard,
  TrendingThisWeekCard,
} from "@/api/types";
import Hero from "@/components/hero/hero";
import LifestyleSpotlightSection from "@/app/components/lifestyle-spotlight-section/lifestyle-spotlight-section";
import TrendingThisWeekSection from "@/app/components/trending-this-week-section/trending-this-week-section";
import JustinsPicksSection from "@/app/components/justins-picks-section/justins-picks-section";

import s from "./home-content.module.scss";

interface HomeContentProps {
  lifestyleSpotlightCards: LifestyleSpotlightCard[];
  trendingThisWeekCards: TrendingThisWeekCard[];
  justinsPicksCards: TheJetLaggersPickCard[];
}

const HomeContent = ({
  lifestyleSpotlightCards,
  trendingThisWeekCards,
  justinsPicksCards,
}: HomeContentProps) => {
  return (
    <main className={s.container}>
      <Hero
        srcImage="/home-hero_apo3zo.jpg"
        headline={"Which Thai Island Makes Sense In 2026?"}
        shortDescription={
          "What it really costs to live on Thailand’s islands. Rent, food, transport, visas, and the hidden expenses that drain newcomers fast."
        }
        ctaProps={{
          buttonText: "Download the Free Guide",
          tags: ["free guide", "thailand"],
        }}
      />
      {/* Lifestyle Spotlight Section */}
      <LifestyleSpotlightSection blogs={lifestyleSpotlightCards} />

      {/* Trending This Week Section */}
      <TrendingThisWeekSection trendingThisWeekCards={trendingThisWeekCards} />

      {/* Justin's Picks Section */}
      <JustinsPicksSection cards={justinsPicksCards} />
    </main>
  );
};

export default HomeContent;
