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

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogData = await fetchLatestBlogPostsClient();
        if (blogData) {
          const mappedBlogs = blogData.map(mapBlogPostToCardProps);
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
              </div>
            </div>
          </section>
          <section className={s.mostViewed}>
            <div className={s.wrapper}>
              <h2>Most Viewed</h2>
              <div className={s.cardWrapper}>
                {blogs[2] && <CardFive blog={blogs[2]} />}
                {blogs[3] && <CardFive blog={blogs[3]} />}
              </div>
            </div>
          </section>
          <QuizContainer quizId={2} />
          <section className={s.trending}>
            <div className={s.wrapper}>
              <h2>Trending</h2>
              <div className={s.cardWrapper}>
                {blogs[4] && <CardTwo blog={blogs[4]} color="red" />}
                {blogs[5] && <CardTwo blog={blogs[5]} color="green" />}
              </div>
            </div>
          </section>
          <section className={s.mostPopular}>
            <div className={s.wrapper}>
              <h2>Most Popular</h2>
              <div className={s.cardWrapper}>
                {blogs[6] && <CardThree blog={blogs[6]} color="purple" />}
                {blogs[7] && <CardThree blog={blogs[7]} color="blue" />}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default HomeContent;
