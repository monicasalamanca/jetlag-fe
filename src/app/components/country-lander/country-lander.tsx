"use client";

import { FC, useMemo, useState, useEffect } from "react";
// import CountryInfo from "../country-info/country-info";
// import TravelResources from "../travel-resources/travel-resources";
import { notFound } from "next/navigation";
import Hero from "../hero/hero";
import QuickFactCard from "../country-facts-card/card/card";
import InfoCard from "../country-facts-card/info-card/info-card";
import ComingSoonSection from "../coming-soon-section/coming-soon-section";
import CardOne from "../cards/card-one/card-one";
import CardTwo from "../cards/card-two/card-two";
import CardThree from "../cards/card-three/card-three";
import CardFive from "../cards/card-five/card-five";
import { Country, BlogPost } from "@/api/types";
import { fetchBlogsByCountry } from "@/api/client";

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
  const [blogData, setBlogData] = useState<BlogPost[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Fetch blog data for the country with fallback logic
  useEffect(() => {
    if (!country) return;

    const fetchBlogs = async () => {
      setIsLoadingBlogs(true);
      setShowComingSoon(false);

      try {
        // First, try to fetch blogs for the current country
        const countrySlug = country.name.toLowerCase();

        const blogs = await fetchBlogsByCountry(countrySlug);

        if (blogs && blogs.length > 0) {
          // Found blogs for this country
          setBlogData(blogs);
          setShowComingSoon(false);
        } else {
          // No blogs found for this country
          setBlogData([]); // Don't show any blog cards in masonry grid
          setShowComingSoon(true); // Show ComingSoonSection (which handles Thailand fallback internally)
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogData([]);
        setShowComingSoon(true);
      } finally {
        setIsLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, [country]);

  if (!country) {
    return notFound();
  }

  const { name, tagline, intro, quickFacts, deepInfo } = country;

  // Helper function to convert BlogPost to CardProps format
  const blogToCardProps = (blog: BlogPost) => {
    // Use country first, fallback to country_temp
    const countryName = blog.country || blog.country_temp || "Unknown";
    
    // Generate the correct URL based on lifestyle vs country
    let url = "";
    if (blog.lifestyle) {
      url = `/lifestyle/${blog.slug}`;
    } else if (blog.country) {
      url = `/${blog.country.toLowerCase().replace(/\s+/g, "-")}/${blog.slug}`;
    } else {
      url = `/unknown/${blog.slug}`;
    }

    return {
      title: blog.title,
      description: blog.description || "",
      thumbnail: blog.imageUrl || "/placeholder-image.jpg",
      tags: ["travel", countryName],
      date: new Date(blog.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      country: countryName,
      readTime: "5 min",
      slug: blog.slug,
      url: url,
    };
  };

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
    const quickFactCards =
      quickFacts?.length > 0
        ? quickFacts.map((fact, index) => ({
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
          }))
        : [];

    const deepInfoCards =
      deepInfo?.length > 0
        ? deepInfo.map((info) => ({
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
          }))
        : [];

    // Add blog cards for any country that has blogs - mix of different card types
    const blogCards =
      blogData.length > 0
        ? blogData.map((blog, index) => {
            const cardProps = blogToCardProps(blog);
            const color = getColour(index, name);

            // Cycle through different card types for variety
            const cardType = index % 4;
            let cardComponent;

            switch (cardType) {
              case 0:
                cardComponent = (
                  <CardOne
                    key={`blog-${blog.id}`}
                    blog={cardProps}
                    color={color}
                  />
                );
                break;
              case 1:
                cardComponent = (
                  <CardTwo
                    key={`blog-${blog.id}`}
                    blog={cardProps}
                    color={color}
                  />
                );
                break;
              case 2:
                cardComponent = (
                  <CardThree
                    key={`blog-${blog.id}`}
                    blog={cardProps}
                    color={color}
                  />
                );
                break;
              case 3:
                cardComponent = (
                  <CardFive key={`blog-${blog.id}`} blog={cardProps} />
                );
                break;
              default:
                cardComponent = (
                  <CardOne
                    key={`blog-${blog.id}`}
                    blog={cardProps}
                    color={color}
                  />
                );
            }

            return {
              type: "blog",
              id: `blog-${blog.id}`,
              component: cardComponent,
            };
          })
        : [];

    return [...quickFactCards, ...deepInfoCards, ...blogCards];
  }, [quickFacts, deepInfo, name, blogData]);

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
      {showComingSoon && <ComingSoonSection countryName={name} />}
      <section className={s.countryIntro}>
        <p>{intro}</p>
        {isLoadingBlogs && (
          <p style={{ fontStyle: "italic", color: "#666" }}>
            Loading travel stories...
          </p>
        )}
      </section>
      <section className={s.masonryGridSection}>
        {/* {filteredCards.map((card: any) => card.component)} */}
        <div className={s.column}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {firstHalf.map((card: any, index: number) => (
            <div key={`first-${card.id}-${index}`}>{card.component}</div>
          ))}
        </div>
        <div className={s.column}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {secondHalf.map((card: any, index: number) => (
            <div key={`second-${card.id}-${index}`}>{card.component}</div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CountryLander;
