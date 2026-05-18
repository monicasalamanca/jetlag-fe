"use client";

import Hero from "@/components/hero/hero";
import GuideCard from "../cards/guide-card/guide-card";
import { Guide } from "@/api/types";

import s from "./guides-lander.module.scss";

const GuidesLander = ({ guides }: { guides: Guide[] }) => {
  return (
    <main className={s.container}>
      <Hero
        srcImage="/home-hero_apo3zo.jpg"
        headline={"Which Thai Island Makes Sense In 2026?"}
        shortDescription={
          "What it really costs to live on Thailand's islands. Rent, food, transport, visas, and the hidden expenses that drain newcomers fast."
        }
        ctaProps={{
          buttonText: "Download the Free Guide",
          tags: ["free guide", "thailand"],
        }}
      />
      <section className={s.latestChronicles}>
        <div className={s.wrapper}>
          <h2>Featured Guides</h2>

          {guides.length === 0 && (
            <div className={s.empty}>
              No guides available yet. Check back soon!
            </div>
          )}

          {guides.length > 0 && (
            <div className={s.cardWrapper}>
              {guides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default GuidesLander;
