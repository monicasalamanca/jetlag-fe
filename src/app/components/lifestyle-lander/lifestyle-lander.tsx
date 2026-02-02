"use client";

import { useMemo, useState, useEffect } from "react";
import Hero from "../hero/hero";
import QuickFactCard from "../country-facts-card/card/card";
import CardThree from "../cards/card-three/card-three";
import { fetchLatestBlogPostsClient } from "@/api/client";
import { BlogPost } from "@/api/types";
import { CardProps } from "@/components/cards/card.types";

import s from "./lifestyle-lander.module.scss";

const quickFacts = [
  {
    id: 1,
    label: "Wi-Fi First",
    description:
      "Every choice starts with the same question: How fast is the Wi-Fi?.",
    icon: "faWifi",
  },
  {
    id: 2,
    label: "Visa Hopping",
    description:
      "Know your limits before you book. Some countries allow extensions. Others want you out in 30 or 90 days. It affects where and how you rent. Don’t land without a plan.",
    icon: "faPassport",
  },
  {
    id: 3,
    label: "Global Friendships",
    description:
      "You meet people in one country, work with them in another, and bump into them again two continents later. If you are going to be global, so should your network.",
    icon: "faUsers",
  },
  {
    id: 4,
    label: "Flexible Workspaces",
    description:
      "One month, your condo has a workspace. The next, you’re back at the quiet café down the street. Will the Wi-Fi hold up? Does it change your budget? Flexibility still demands consistency.",
    icon: "faLaptopCode",
  },
  {
    id: 5,
    label: "Minimalist Vibes",
    description:
      "Master the 40L life. If you don’t use it, lose it. Checked bags go missing. Dead weight just slows you down.",
    icon: "faSuitcaseRolling",
  },
  {
    id: 6,
    label: "Cost of Living Mastery",
    description:
      "You land in Bogotá and catch yourself converting pesos to baht. At some point, your brain stops thinking in terms of your home currency.",
    icon: "faMoneyBillWave",
  },
  {
    id: 7,
    label: "Time Zone Tetris",
    description:
      "Your calendar will become a puzzle of overlapping time zones. You’re in KL. One client’s in LA. Another’s in Berlin. Your work schedule is not linear.",
    icon: "faClock",
  },
  {
    id: 8,
    label: "Language Hacks",
    description:
      "New country, new word list. Learn the top 100. You don’t need Google Translate and hand signals for every conversation.'",
    icon: "faLanguage",
  },
  {
    id: 9,
    label: "Café Connoisseur",
    description:
      "Skip the cowork cafes and influencer hotspots. Find the quiet spot next to your apartment. Spend money there. The locals will notice.",
    icon: "faCoffee",
  },
  {
    id: 10,
    label: "Weather Roulette",
    description:
      "Chasing sun sounds easy until you land in peak monsoon by accident. Check seasons, not just flight deals. Every nomad learns this the wet way.",
    icon: "faSun",
  },
  {
    id: 11,
    label: "Local SIM Savvy",
    description:
      "It’s 2025. Stop searching for local SIM card spots. Just get an eSIM like everyone else.",
    icon: "faSimCard",
  },
  {
    id: 12,
    label: "Cultural Chameleon",
    description:
      "Monkey see, monkey do. Watch first, follow fast. The quicker you adapt, the smoother everything else runs. Your network and net worth will benefit.",
    icon: "faGlobeAsia",
  },
  {
    id: 13,
    label: "Nomad Health Reality",
    description:
      "Your gym membership is going to be month-to-month. Your diet changes with the countries. Your sleep schedule might too. There are trade offs. Focusing on health is not a negotiation.",
    icon: "faHeartbeat",
  },
  {
    id: 14,
    label: "Freedom vs Stability",
    description:
      "Some confuse location freedom with permanent vacation. Those people don’t last. Build structure you can take with you.",
    icon: "faBalanceScale",
  },
  {
    id: 15,
    label: "Community Everywhere",
    description:
      "Meetups, coworking spaces, WhatsApp groups. Nomads find each other. Whatever you are into, you'll find it if you look.",
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
    if (loading) {
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

    // If there are no lifestyle blogs, just return quick facts
    if (blogs.length === 0) {
      return quickFactCards;
    }

    // Dynamically create blog cards based on available blogs
    const blogCards = blogs.map((blog, index) => {
      const color = index % 2 === 0 ? "blue" : "orange";

      return {
        type: "blog",
        id: `blog-${index}`,
        component: (
          <CardThree key={`blog-${index}`} blog={blog} color={color} />
        ),
      };
    });

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
        headline={"Which Thai Island Makes Sense In 2026?"}
        shortDescription={
          "What it really costs to live on Thailand’s islands. Rent, food, transport, visas, and the hidden expenses that drain newcomers fast."
        }
        ctaProps={{
          buttonText: "Download the Free Guide",
          tags: ["free guide", "thailand"],
        }}
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
