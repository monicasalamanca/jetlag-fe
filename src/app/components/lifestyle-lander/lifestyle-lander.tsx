"use client";

import { useMemo, useState, useEffect } from "react";
import Hero from "../hero/hero";
import QuickFactCard from "../country-facts-card/card/card";
import CardOne from "../cards/card-one/card-one";
import CardFive from "../cards/card-five/card-five";
import { fetchLatestBlogPostsClient } from "@/api/client";
import { BlogPost } from "@/api/types";
import { CardProps } from "@/components/cards/card.types";

import s from "./lifestyle-lander.module.scss";

const quickFacts = [
  {
    id: 1,
    label: "Wi-Fi First",
    description:
      "Every decision—café, Airbnb, coworking space—starts with one critical question: how fast is the Wi-Fi? Nomad life runs on internet speed, not coffee strength.",
    icon: "faWifi",
  },
  {
    id: 2,
    label: "Visa Hopping",
    description:
      "Border runs, visa extensions, and 90-day resets become second nature. Your passport gets more stamps than your fridge door.",
    icon: "faPassport",
  },
  {
    id: 3,
    label: "Global Friendships",
    description:
      "You build deep friendships with people you’ve known for 48 hours… and struggle to remember time zones well enough to call family.",
    icon: "faUsers",
  },
  {
    id: 4,
    label: "Flexible Workspaces",
    description:
      "Your office might be a beach café, a night market, or the quiet corner of a WeWork. Comfort becomes optional—productivity doesn’t.",
    icon: "faLaptopCode",
  },
  {
    id: 5,
    label: "Minimalist Vibes",
    description:
      "You become a pro at living out of a suitcase. If it doesn’t fit in your 7kg carry-on, it probably doesn’t make the cut.",
    icon: "faSuitcaseRolling",
  },
  {
    id: 6,
    label: "Cost of Living Mastery",
    description:
      "You know the price of a latte in Chiang Mai, Medellín, and Lisbon—but couldn’t tell anyone what it costs in your home country anymore.",
    icon: "faMoneyBillWave",
  },
  {
    id: 7,
    label: "Time Zone Tetris",
    description:
      "Your calendar becomes a puzzle of overlapping time zones. One meeting in LA, another in Berlin, and you’re somewhere in between.",
    icon: "faClock",
  },
  {
    id: 8,
    label: "Language Hacks",
    description:
      "You develop the uncanny ability to master the essentials in any language: hello, thank you, and 'one more beer, please.'",
    icon: "faLanguage",
  },
  {
    id: 9,
    label: "Café Connoisseur",
    description:
      "You can instantly identify which cafés have power outlets, quiet tables, and staff who won’t glare when you open your laptop.",
    icon: "faCoffee",
  },
  {
    id: 10,
    label: "Weather Roulette",
    description:
      "You chase sunshine, but you’ll always end up somewhere during monsoon season at least once. It’s a rite of passage.",
    icon: "faSun",
  },
  {
    id: 11,
    label: "Local SIM Savvy",
    description:
      "You’ve become a SIM-card-switching machine. ESIMs, data packs, roaming tricks—you’ve mastered them all.",
    icon: "faSimCard",
  },
  {
    id: 12,
    label: "Cultural Chameleon",
    description:
      "You adapt to new cultures quickly—eating when locals eat, greeting how locals greet, and removing shoes when everyone else does.",
    icon: "faGlobeAsia",
  },
  {
    id: 13,
    label: "Nomad Health Reality",
    description:
      "Gyms change monthly, your diet changes weekly, and sleep schedules… are a suggestion. But you learn to make it work.",
    icon: "faHeartbeat",
  },
  {
    id: 14,
    label: "Freedom vs Stability",
    description:
      "You gain freedom but sacrifice routine. One day you’re at a rooftop pool, the next you’re hunting for a quiet corner to take a Zoom call.",
    icon: "faBalanceScale",
  },
  {
    id: 15,
    label: "Community Everywhere",
    description:
      "Meetups, coworking spaces, WhatsApp groups—there’s always a tribe waiting for you. Nomads find each other like magnets.",
    icon: "faHandshake",
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

const LifestyleLander = () => {
  const [blogs, setBlogs] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to map API BlogPost to CardProps format
  const mapBlogPostToCardProps = (blogPost: BlogPost): CardProps => {
    const tagsToUse =
      blogPost.tags.length > 0 ? blogPost.tags : ["travel", "blog"];
    let url = "";
    let countryToUse = "";
    if (blogPost.lifestyle) {
      url = `/lifestyle/${blogPost.slug}`;
      countryToUse = "lifestyle";
    } else {
      // Use country for URL generation
      if (blogPost.country) {
        countryToUse = blogPost.country;
        url = `/${countryToUse.toLowerCase().replace(/\s+/g, "-")}/${blogPost.slug}`;
      } else {
        countryToUse = "";
        url = `/${blogPost.slug}`;
      }
    }

    return {
      title: blogPost.title,
      description: blogPost.description || "",
      thumbnail: blogPost.imageUrl || "/placeholder-image.jpg",
      tags: tagsToUse,
      date: new Date(blogPost.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      country: countryToUse,
      readTime: "5 mins",
      slug: blogPost.slug,
      url: url,
    };
  };

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        const blogData = await fetchLatestBlogPostsClient();
        if (blogData) {
          // Filter only lifestyle blogs
          const lifestyleBlogs = blogData.filter(
            (blog) => blog.lifestyle === true,
          );
          const mappedBlogs = lifestyleBlogs.map(mapBlogPostToCardProps);
          setBlogs(mappedBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

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
  const allCards = useMemo(() => {
    if (loading || blogs.length === 0) {
      return [];
    }

    const quickFactCards = quickFacts.map((fact, index) => ({
      type: "quickFact",
      id: fact.id,
      component: (
        <QuickFactCard
          key={`quickFact-${fact.id}`}
          label={fact.label}
          description={fact.description}
          icon={fact.icon}
          cardStyle={getStyle(index)}
          colour={getColour(index)}
        />
      ),
    }));

    const blogCards = [
      {
        type: "blog",
        id: "blog-1",
        component: blogs[1] ? (
          <CardOne key="blog-1" blog={blogs[1]} color="blue" />
        ) : null,
      },
      {
        type: "blog",
        id: "blog-2",
        component: blogs[5] ? (
          <CardOne key="blog-2" blog={blogs[5]} color="orange" />
        ) : null,
      },
      {
        type: "blog",
        id: "blog-3",
        component: blogs[11] ? (
          <CardFive key="blog-3" blog={blogs[11]} />
        ) : null,
      },
      {
        type: "blog",
        id: "blog-4",
        component: blogs[14] ? (
          <CardFive key="blog-4" blog={blogs[14]} />
        ) : null,
      },
    ].filter((card) => card.component !== null); // Filter out null components

    return [...quickFactCards, ...blogCards];
  }, [blogs, loading]);

  // Filter and shuffle cards with deterministic randomization
  const filteredCards = useMemo(() => {
    // Helper function to shuffle an array deterministically (moved inside useMemo)
    const shuffleArraySeeded = <T,>(array: T[], seed: string): T[] => {
      const rng = seededRandom(seed);
      return array
        .map((item) => ({ item, sort: rng() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
    };

    // Track card repetition
    const cardRepetitionCount: Record<string, number> = {};

    // Use "lifestyle" as seed for consistent shuffling
    const shuffledCards = shuffleArraySeeded(allCards, "lifestyle");

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
      {loading ? (
        <section className={s.masonryGridSection}>
          <div>Loading...</div>
        </section>
      ) : (
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
      )}
    </main>
  );
};

export default LifestyleLander;
