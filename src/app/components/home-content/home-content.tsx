"use client";

import { useEffect, useState } from "react";
import { fetchLatestBlogPostsClient } from "@/api/client";
import {
  BlogPost,
  LifestyleSpotlightCard,
  TrendingThisWeekCard,
} from "@/api/types";
import { CardProps } from "@/components/cards/card.types";
import Hero from "@/components/hero/hero";
import CardThree from "@/components/cards/card-three/card-three";
import LifestyleSpotlightSection from "@/app/components/lifestyle-spotlight-section/lifestyle-spotlight-section";
import TrendingThisWeekSection from "@/app/components/trending-this-week-section/trending-this-week-section";

import s from "./home-content.module.scss";

interface HomeContentProps {
  lifestyleSpotlightCards: LifestyleSpotlightCard[];
  trendingThisWeekCards: TrendingThisWeekCard[];
}

const HomeContent = ({
  lifestyleSpotlightCards,
  trendingThisWeekCards,
}: HomeContentProps) => {
  const [blogs, setBlogs] = useState<CardProps[]>([]);
  const [shuffledBlogs, setShuffledBlogs] = useState<CardProps[]>([]);
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
      description: blogPost.description,
      thumbnail: blogPost.imageUrl || "/placeholder-image.jpg",
      tags: tagsToUse, // Use API tags or fallback to default
      date: new Date(blogPost.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      country: countryToUse, // Use first country from countries array or fallback
      readTime: "5 mins", // Default read time since API doesn't provide it
      slug: blogPost.slug,
      url: url, // Pre-computed URL
    };
  };

  // Utility function for daily shuffling with consistent seed
  const getDailyShuffledBlogs = (blogs: CardProps[]): CardProps[] => {
    if (blogs.length === 0) return blogs;

    // Use current date as seed for consistent daily shuffle
    const today = new Date().toDateString(); // "Mon Oct 15 2025"
    const seed = today
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Fisher-Yates shuffle with seeded random
    const shuffled = [...blogs];
    let random = seed;

    for (let i = shuffled.length - 1; i > 0; i--) {
      random = (random * 9301 + 49297) % 233280; // Simple LCG
      const j = Math.floor((random / 233280) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogData = await fetchLatestBlogPostsClient();
        if (blogData) {
          const mappedBlogs = blogData.map(mapBlogPostToCardProps);

          // Exclude first 6 blogs (used in Latest Stories) from shuffling
          const blogsForShuffling = mappedBlogs.slice(6); // Skip first 6 blogs
          const dailyShuffled = getDailyShuffledBlogs(blogsForShuffling);

          setBlogs(mappedBlogs); // Keep original order for "Latest Stories" (indexes 0-5)
          setShuffledBlogs(dailyShuffled); // Use shuffled remaining blogs for other sections (no duplicates)
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

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

      {loading ? (
        <section className={s.latestChronicles}>
          <div className={s.wrapper}>
            <div>Loading...</div>
          </div>
        </section>
      ) : (
        <>
          {blogs.length >= 6 && (
            <section className={s.latestChronicles}>
              <div className={s.wrapper}>
                <h2>Latest Stories</h2>
                <div className={s.cardWrapper}>
                  <CardThree blog={blogs[0]} color="blue" section="latest" />
                  <CardThree blog={blogs[1]} color="green" section="latest" />
                  <CardThree blog={blogs[2]} color="red" section="latest" />
                  <CardThree blog={blogs[3]} color="purple" section="latest" />
                  <CardThree blog={blogs[4]} color="blue" section="latest" />
                  <CardThree blog={blogs[5]} color="green" section="latest" />
                </div>
              </div>
            </section>
          )}
          {shuffledBlogs.length >= 6 && (
            <section className={s.mostViewed}>
              <div className={s.wrapper}>
                <h2>Most Viewed</h2>
                <div className={s.cardWrapper}>
                  <CardThree
                    blog={shuffledBlogs[0]}
                    color="red"
                    section="mostViewed"
                  />
                  <CardThree
                    blog={shuffledBlogs[1]}
                    color="green"
                    section="mostViewed"
                  />
                  <CardThree
                    blog={shuffledBlogs[2]}
                    color="blue"
                    section="mostViewed"
                  />
                  <CardThree
                    blog={shuffledBlogs[3]}
                    color="purple"
                    section="mostViewed"
                  />
                  <CardThree
                    blog={shuffledBlogs[4]}
                    color="red"
                    section="mostViewed"
                  />
                  <CardThree
                    blog={shuffledBlogs[5]}
                    color="green"
                    section="mostViewed"
                  />
                </div>
              </div>
            </section>
          )}
          {shuffledBlogs.length >= 18 && (
            <section className={s.mostPopular}>
              <div className={s.wrapper}>
                <h2>Most Popular</h2>
                <div className={s.cardWrapper}>
                  <CardThree
                    blog={shuffledBlogs[12]}
                    color="purple"
                    section="mostPopular"
                  />
                  <CardThree
                    blog={shuffledBlogs[13]}
                    color="blue"
                    section="mostPopular"
                  />
                  <CardThree
                    blog={shuffledBlogs[14]}
                    color="green"
                    section="mostPopular"
                  />
                  <CardThree
                    blog={shuffledBlogs[15]}
                    color="red"
                    section="mostPopular"
                  />
                  <CardThree
                    blog={shuffledBlogs[16]}
                    color="purple"
                    section="mostPopular"
                  />
                  <CardThree
                    blog={shuffledBlogs[17]}
                    color="blue"
                    section="mostPopular"
                  />
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
};

export default HomeContent;
