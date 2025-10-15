"use client";

import { useEffect, useState } from "react";
import { fetchLatestBlogPostsClient } from "@/api/client";
import { BlogPost } from "@/api/types";
import { CardProps } from "@/components/cards/card.types";
import { getBlogCanonicalUrl } from "@/app/utils/canonicalUrl";
import Hero from "@/components/hero/hero";
import CardOne from "@/components/cards/card-one/card-one";
import CardTwo from "@/components/cards/card-two/card-two";
import CardThree from "@/components/cards/card-three/card-three";
import CardFive from "@/components/cards/card-five/card-five";
import QuizContainer from "@/components/quiz/quiz-container";

import s from "./home-content.module.scss";

const HomeContent = () => {
  const [blogs, setBlogs] = useState<CardProps[]>([]);
  const [shuffledBlogs, setShuffledBlogs] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to map API BlogPost to CardProps format
  const mapBlogPostToCardProps = (blogPost: BlogPost): CardProps => {
    const tagsToUse =
      blogPost.tags.length > 0 ? blogPost.tags : ["travel", "blog"];
    const countryToUse =
      blogPost.countries.length > 0 ? blogPost.countries[0] : "Unknown";

    // Generate the correct URL based on lifestyle vs country
    const url = getBlogCanonicalUrl(
      blogPost.slug,
      blogPost.lifestyle ? undefined : countryToUse,
      blogPost.lifestyle,
    ).replace(
      process.env.NEXT_PUBLIC_SITE_URL || "https://thejetlagchronicles.com",
      "",
    );

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
          const dailyShuffled = getDailyShuffledBlogs(mappedBlogs);

          setBlogs(mappedBlogs); // Keep original order for "Latest Stories"
          setShuffledBlogs(dailyShuffled); // Use shuffled for other sections
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
        headline={"Find Your Perfect City for Your Nomadic Lifestyle!"}
        shortDescription={
          "Discover your next destination with our curated guides for digital nomads and expats"
        }
      />
      {loading ? (
        <section className={s.latestChronicles}>
          <div className={s.wrapper}>
            <div>Loading...</div>
          </div>
        </section>
      ) : (
        <>
          <section className={s.latestChronicles}>
            <div className={s.wrapper}>
              <h2>Latest Stories</h2>
              <div className={s.cardWrapper}>
                {blogs[0] && <CardOne blog={blogs[0]} color="blue" />}
                {blogs[1] && <CardOne blog={blogs[1]} color="green" />}
                {blogs[2] && <CardOne blog={blogs[2]} color="red" />}
                {blogs[3] && <CardOne blog={blogs[3]} color="purple" />}
              </div>
            </div>
          </section>
          <section className={s.mostViewed}>
            <div className={s.wrapper}>
              <h2>Most Viewed</h2>
              <div className={s.cardWrapper}>
                {shuffledBlogs[0] && <CardFive blog={shuffledBlogs[0]} />}
                {shuffledBlogs[1] && <CardFive blog={shuffledBlogs[1]} />}
              </div>
            </div>
          </section>
          <QuizContainer quizId={2} />
          <section className={s.trending}>
            <div className={s.wrapper}>
              <h2>Trending</h2>
              <div className={s.cardWrapper}>
                {shuffledBlogs[2] && (
                  <CardTwo blog={shuffledBlogs[2]} color="red" />
                )}
                {shuffledBlogs[3] && (
                  <CardTwo blog={shuffledBlogs[3]} color="green" />
                )}
              </div>
            </div>
          </section>
          <section className={s.mostPopular}>
            <div className={s.wrapper}>
              <h2>Most Popular</h2>
              <div className={s.cardWrapper}>
                {shuffledBlogs[4] && (
                  <CardThree blog={shuffledBlogs[4]} color="purple" />
                )}
                {shuffledBlogs[5] && (
                  <CardThree blog={shuffledBlogs[5]} color="blue" />
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default HomeContent;
