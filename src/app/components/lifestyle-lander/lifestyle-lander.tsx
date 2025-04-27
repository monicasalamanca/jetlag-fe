"use client";

import { useMemo } from "react";
import Hero from "../hero/hero";
import QuickFactCard from "../country-facts-card/card/card";
import CardOne from "../cards/card-one/card-one";
import CardFive from "../cards/card-five/card-five";
import blogs from "@/app/blogs.json";

import s from "./lifestyle-lander.module.scss";

const quickFacts = [
  {
    id: 3,
    label: "Ramen",
    description:
      "A hearty noodle soup with Chinese-style wheat noodles served in a flavorful broth (like miso, soy sauce, or pork-based tonkotsu), topped with ingredients like sliced pork (chashu), soft-boiled egg, green onions, and nori.",
    icon: "faUtensils",
  },
  {
    id: 4,
    label: "Okonomiyaki",
    description:
      "Often called “Japanese savory pancakes,” okonomiyaki is made with cabbage, flour, eggs, and various toppings like pork belly, seafood, or cheese. It’s cooked on a griddle and topped with okonomiyaki sauce, mayo, bonito flakes, and seaweed powder.",
    icon: "faUtensils",
  },
  {
    id: 5,
    label: "language",
    description:
      "Japanese uses three scripts—Hiragana, Katakana, and Kanji—often in one sentence! Hiragana is for native words, Katakana for foreign ones, and Kanji adds meaning (and challenge). No alphabet song here—just vibes and memorization.",
    icon: "faLanguage",
  },
  {
    id: 6,
    label: "currency",
    description:
      "Japan’s currency is the **yen (¥)**, and while it’s high-tech in many ways, cash is still king! Don’t be surprised if that tiny ramen shop doesn’t take cards. Pro tip: ATMs in convenience stores almost always work with foreign cards.",
    icon: "faMoneyBill",
  },
  {
    id: 7,
    label: "greetings",
    description:
      "Instead of handshakes, Japanese people usually greet each other with a bow—**the deeper the bow, the more respectful**. A simple nod is fine for travelers, but if you master the bow + a friendly 'konnichiwa' (hello), you’re golden!",
    icon: "faHands",
  },
  {
    id: 8,
    label: "Etiquette",
    description:
      "Slurping your noodles is polite. Talking on your phone in public transport? Not so much. **Japanese etiquette is all about being mindful and quiet**—so enjoy the peaceful vibe, but keep your inner loud tourist in check!",
    icon: "faPersonPraying",
  },
  {
    id: 9,
    label: "transportation",
    description:
      "Japan’s trains are so punctual that if one’s late by even a minute, the conductor apologizes.\n**The Shinkansen (bullet train)** is a must-ride: fast, smooth, and futuristic.\nJust don’t eat, talk loudly, or take calls in the quiet car — it’s sacred.",
    icon: "faTrainSubway",
  },
  {
    id: 10,
    label: "tipping",
    description:
      "Tipping in Japan is not expected — and often politely refused.\nGood service is the standard, not something extra you pay for.\nTrying to tip might even cause confusion, so just say “arigatou!” with a smile.",
    icon: "faHandHoldingDollar",
  },
  {
    id: 11,
    label: "dinning customs",
    description:
      "Before eating, say “Itadakimasu” (I humbly receive). After? “Gochisousama” (thank you for the meal).\n**Don’t stick chopsticks upright in rice** — it’s a funeral symbol. And passing food chopstick-to-chopstick? Also a big no-no!",
    icon: "faUtensils",
  },
  {
    id: 12,
    label: "weather & seasons",
    description:
      "Japan has four distinct seasons, and locals really celebrate them! Spring is for cherry blossoms (sakura), summer is hot and festival-packed, autumn is all red maple leaves, and winter brings serious snow up north.\nPack accordingly—and don’t miss seasonal snacks!",
    icon: "faCloudSun",
  },
  {
    id: 14,
    label: "festivals",
    description:
      "From the neon-crazy Tanabata festival to lantern-lit Obon, Japan has hundreds of festivals (called matsuri) year-round.\nExpect traditional clothes, firework shows, dancing in the streets, and more food stalls than your stomach can handle.",
    icon: "faStar",
  },
  {
    id: 15,
    label: "Bathhouse Culture",
    description:
      "Japan’s love for a good soak is legendary. Public bathhouses (sento) and natural hot springs (onsen) are part of everyday life.\nYou’ll bathe before getting in, leave your swimsuit behind, and emerge completely zen.\nP.S. Tattoos may be an issue — check first!",
    icon: "faBath",
  },
];

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

const LifestyleLander = () => {
  // Helper function to shuffle an array
  const shuffleArray = <T,>(array: T[]): T[] => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  // Combine all cards into one array
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

    return [...quickFactCards, ...blogCards];
  }, []);

  // Filter and shuffle cards
  const filteredCards = useMemo(() => {
    // Track card repetition
    const cardRepetitionCount: Record<string, number> = {};
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
  }, [allCards]);

  // Split the filteredCards array into two parts
  const firstHalf = filteredCards.slice(0, Math.ceil(filteredCards.length / 2));
  const secondHalf = filteredCards.slice(Math.ceil(filteredCards.length / 2));

  return (
    <main className={s.container}>
      <Hero
        srcImage="/lifestyle_xbqxgn.jpg"
        headline="Live Anywhere. Work Everywhere. Love the Journey."
        shortDescription="Digital nomads. Expats. Travel lovers."
      />
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

export default LifestyleLander;
