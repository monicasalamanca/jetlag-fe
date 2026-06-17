"use client";

import { useMemo, useState } from "react";
import LifestyleHero from "../lifestyle-hero/lifestyle-hero";
import LifestyleFilterBar from "../lifestyle-filter-bar/lifestyle-filter-bar";
import LifestyleArticlesSection from "../lifestyle-articles-section/lifestyle-articles-section";
// import LifestyleAffiliateSection from "../lifestyle-affiliate-section/lifestyle-affiliate-section";
import LifestyleGuidesSection from "../lifestyle-guides-section/lifestyle-guides-section";
import LifestyleNewsletterSection from "../lifestyle-newsletter-section/lifestyle-newsletter-section";
// import LifestyleTeamSection from "../lifestyle-team-section/lifestyle-team-section";
import { LifestyleArticle, LifestyleGuide } from "@/api/types";

import s from "./lifestyle-lander.module.scss";

const LifestyleLander = ({
  articles,
  guides,
}: {
  articles: LifestyleArticle[];
  guides: LifestyleGuide[];
}) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const seen = new Set<string>();
    articles.forEach((a) =>
      a.tags.forEach((t) => {
        if (t) seen.add(t);
      }),
    );
    return Array.from(seen);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (!activeTag) return articles;
    return articles.filter((a) => a.tags.includes(activeTag));
  }, [articles, activeTag]);

  return (
    <main className={s.container}>
      <LifestyleHero articles={articles} />
      <LifestyleFilterBar
        tags={allTags}
        activeTag={activeTag}
        onTagChange={setActiveTag}
        articleCount={filteredArticles.length}
      />
      <LifestyleArticlesSection articles={filteredArticles} />
      {/* <LifestyleAffiliateSection /> */}
      <LifestyleGuidesSection guides={guides} />
      <LifestyleNewsletterSection />
      {/* <LifestyleTeamSection /> */}
    </main>
  );
};

export default LifestyleLander;
