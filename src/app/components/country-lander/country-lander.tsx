"use client";

import { FC, useMemo } from "react";
// import CountryInfo from "../country-info/country-info";
// import TravelResources from "../travel-resources/travel-resources";
import Hero from "../hero/hero";
import QuickFactCard from "../country-facts-card/card/card";
import InfoCard from "../country-facts-card/info-card/info-card";
import { Country } from "@/api/types";
import CardOne from "../cards/card-one/card-one";
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

const getStyle = () => {
  const randomCardStyle =
    cardStyles[Math.floor(Math.random() * cardStyles.length)];
  return `${randomCardStyle}`;
};

const getColour = () => {
  const randomColourStyle =
    colourStyle[Math.floor(Math.random() * colourStyle.length)];
  return randomColourStyle;
};

const CountryLander: FC<{ country: Country }> = ({ country }) => {
  if (!country) {
    return <div>Loading...</div>; // Or a custom error/loading component
  }

  const { name, tagline, intro, quickFacts, deepInfo } = country;

  // Helper function to shuffle an array
  const shuffleArray = <T,>(array: T[]): T[] => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  // Combine all cards into one array
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const allCards = useMemo(() => {
    const quickFactCards = quickFacts.map((fact) => ({
      type: "quickFact",
      id: fact.id,
      component: (
        <QuickFactCard
          key={`quickFact-${fact.id}`}
          label={fact.label}
          description={fact.description}
          icon={fact.icon}
          cardStyle={getStyle()}
          colour={getColour()}
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
        component: <CardOne key="blog-2" mockData={blogs[5]} color="orange" />,
      },
      {
        type: "blog",
        id: "blog-3",
        component: <CardFive key="blog-3" mockData={blogs[11]} />,
      },
      {
        type: "blog",
        id: "blog-4",
        component: <CardFive key="blog-4" mockData={blogs[14]} />,
      },
    ];

    return [...quickFactCards, ...deepInfoCards, ...blogCards];
  }, [quickFacts, deepInfo, name]);

  // Track card repetition
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cardRepetitionCount: Record<string, number> = {};

  // Filter and shuffle cards
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredCards = useMemo(() => {
    const shuffledCards = shuffleArray(allCards);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return shuffledCards.filter((card: any) => {
      const count = cardRepetitionCount[card.id] || 0;
      if (count < 3) {
        cardRepetitionCount[card.id] = count + 1;
        return true;
      }
      return false;
    });
  }, [allCards, cardRepetitionCount]);

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
          {firstHalf.map((card: any) => card.component)}
        </div>
        <div className={s.column}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {secondHalf.map((card: any) => card.component)}
        </div>
      </section>
    </main>
  );
};

export default CountryLander;
