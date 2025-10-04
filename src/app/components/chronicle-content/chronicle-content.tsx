"use client";

import { useEffect, useState } from "react";
import { fetchLatestBlogPostsClient } from "@/api/client";
import { BlogPost } from "@/api/types";
import { CardProps } from "@/components/cards/card.types";
import { getBlogCanonicalUrl } from "@/app/utils/canonicalUrl";
import Hero from "../hero/hero";
import CardOne from "../cards/card-one/card-one";
import QuizContainer from "@/app/components/quiz/quiz-container";

import s from "./chronicle-content.module.scss";

const ChronicleContent = () => {
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

  const colors = ["blue", "green", "purple", "orange"];

  return (
    <main className={s.container}>
      <Hero
        srcImage="/grocerytime_ihgtnt.jpg"
        headline="Discover inpiring travel stories, tips and guides"
        shortDescription="Find your perfect destination tailored to your lifestyle"
      />
      <section className={s.latestChronicles}>
        <div className={s.wrapper}>
          <h2>Latest Stories</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className={s.cardWrapper}>
              {blogs.slice(0, 8).map((blog, index) => (
                <CardOne
                  key={blog.slug}
                  blog={blog}
                  color={colors[index % colors.length]}
                  position={index + 1}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <QuizContainer quizId={1} />
    </main>
  );
};

export default ChronicleContent;
