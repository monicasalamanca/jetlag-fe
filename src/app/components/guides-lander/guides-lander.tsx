"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/hero/hero";
import GuideCard from "../cards/guide-card/guide-card";
import { fetchGuidesClient } from "@/api/client";
import { Guide } from "@/api/types";

import s from "./guides-lander.module.scss";

const GuidesLander = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGuides = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedGuides = await fetchGuidesClient();

        if (fetchedGuides) {
          setGuides(fetchedGuides);
        } else {
          setGuides([]);
          setError("No guides available at the moment.");
        }
      } catch (err) {
        console.error("Error loading guides:", err);
        setError("Failed to load guides. Please try again later.");
        setGuides([]);
      } finally {
        setLoading(false);
      }
    };

    loadGuides();
  }, []);

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

          {loading && <div className={s.loading}>Loading guides...</div>}

          {error && !loading && <div className={s.error}>{error}</div>}

          {!loading && !error && guides.length === 0 && (
            <div className={s.empty}>
              No guides available yet. Check back soon!
            </div>
          )}

          {!loading && !error && guides.length > 0 && (
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
