"use client";

import { FC, useMemo } from "react";
// import CountryInfo from "../country-info/country-info";
// import TravelResources from "../travel-resources/travel-resources";
import { notFound } from "next/navigation";
import Hero from "../hero/hero";
import QuickFactCard from "../country-facts-card/card/card";
import InfoCard from "../country-facts-card/info-card/info-card";
import { Country } from "@/api/types";
import CardOne from "../cards/card-one/card-one";
import CardTwo from "../cards/card-two/card-two";
import CardThree from "../cards/card-three/card-three";
import CardFive from "../cards/card-five/card-five";
import blogs from "@/app/blogs.json";

import s from "./country-lander.module.scss";

const cardStyles = ["whiteBg", "colourBg"] as const;
const colourStyle = [
  "blue",
  "orange",
  "red",
  "green",
  "purple",
  "pink",
] as const;

// Deterministic functions to avoid hydration mismatches while maintaining variety
const getStyle = (index: number, seed: string = "") => {
  // Combine index with seed for more variety
  const hash = seed.length > 0 ? seed.charCodeAt(index % seed.length) : 0;
  const styleIndex = (index + hash) % cardStyles.length;
  return `${cardStyles[styleIndex]}`;
};

const getColour = (index: number, seed: string = "") => {
  // Combine index with seed for more variety
  const hash = seed.length > 0 ? seed.charCodeAt(index % seed.length) : 0;
  const colourIndex = (index + hash) % colourStyle.length;
  return colourStyle[colourIndex];
};

const CountryLander: FC<{ country: Country }> = ({ country }) => {
  if (!country) {
    return notFound();
  }

  const { name, tagline, intro, quickFacts, deepInfo } = country;

  // Seeded random function for deterministic shuffling
  const seededRandom = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return () => {
      hash = (hash * 9301 + 49297) % 233280;
      return hash / 233280;
    };
  };

  // Combine all cards into one array
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const allCards = useMemo(() => {
    const quickFactCards = quickFacts.map((fact, index) => ({
      type: "quickFact",
      id: fact.id,
      component: (
        <QuickFactCard
          key={`quickFact-${fact.id}`}
          label={fact.label}
          description={fact.description}
          icon={fact.icon}
          cardStyle={getStyle(index, name)}
          colour={getColour(index, name)}
        />
      ),
    }));

    const deepInfoCards = deepInfo.map((info) => ({
      type: "deepInfo",
      id: info.id,
      component: (
        <InfoCard
          key={`deepInfo-${info.id}`}
          name={info.name}
          icon={info.icon}
          description={info.description}
          keywords={info.keywords}
          image={info.image}
          imageAltText={`image of ${name} ${info.name}`}
        />
      ),
    }));

    const blogCards = [
      {
        type: "blog",
        id: "blog-1",
        component: <CardOne key="blog-1" mockData={blogs[1]} color="blue" />,
      },
      {
        type: "blog",
        id: "blog-2",
        component: <CardOne key="blog-2" mockData={blogs[2]} color="orange" />,
      },
      {
        type: "blog",
        id: "blog-3",
        component: <CardFive key="blog-3" mockData={blogs[3]} />,
      },
      {
        type: "blog",
        id: "blog-4",
        component: <CardTwo key="blog-4" mockData={blogs[5]} color="green" />,
      },
      {
        type: "blog",
        id: "blog-5",
        component: <CardTwo key="blog-5" mockData={blogs[4]} color="red" />,
      },
      {
        type: "blog",
        id: "blog-6",
        component: (
          <CardThree key="blog-6" mockData={blogs[6]} color="purple" />
        ),
      },
      {
        type: "blog",
        id: "blog-7",
        component: <CardThree key="blog-7" mockData={blogs[6]} color="blue" />,
      },
    ];

    return [...quickFactCards, ...deepInfoCards, ...blogCards];
  }, [quickFacts, deepInfo, name]);

  // Filter and shuffle cards with deterministic randomization
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredCards = useMemo(() => {
    // Helper function to shuffle an array deterministically (moved inside useMemo)
    const shuffleArraySeeded = <T,>(array: T[], seed: string): T[] => {
      const rng = seededRandom(seed);
      return array
        .map((item) => ({ item, sort: rng() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
    };

    // Track card repetition (moved inside useMemo)
    const cardRepetitionCount: Record<string, number> = {};

    // Use country name as seed for consistent shuffling
    const shuffledCards = shuffleArraySeeded(allCards, name);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return shuffledCards.filter((card: any) => {
      const count = cardRepetitionCount[card.id] || 0;
      if (count < 3) {
        cardRepetitionCount[card.id] = count + 1;
        return true;
      }
      return false;
    });
  }, [allCards, name]);

  // Split the filteredCards array into two parts
  const firstHalf = filteredCards.slice(0, Math.ceil(filteredCards.length / 2));
  const secondHalf = filteredCards.slice(Math.ceil(filteredCards.length / 2));

  return (
    <main className={s.container}>
      <Hero
        srcImage="/japan-hero_iedol6.jpg"
        headline={`${name} Travel & Living Guide`}
        shortDescription={tagline}
      />
      <section className={s.countryIntro}>
        <p>{intro}</p>
      </section>
      <section className={s.masonryGridSection}>
        {/* {filteredCards.map((card: any) => card.component)} */}
        <div className={s.column}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {firstHalf.map((card: any) => (
            <div key={`first-${card.id}`}>{card.component}</div>
          ))}
        </div>
        <div className={s.column}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {secondHalf.map((card: any) => (
            <div key={`second-${card.id}`}>{card.component}</div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CountryLander;
