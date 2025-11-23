"use client";

import { useEffect, useState } from "react";
import { fetchLatestBlogPostsClient } from "@/api/client";
import { BlogPost } from "@/api/types";
import { CardProps } from "@/components/cards/card.types";
import { getBlogCanonicalUrl } from "@/app/utils/canonicalUrl";
import { trackCardClick } from "@/app/utils/analytics";
import CardThree from "@/components/cards/card-three/card-three";

import s from "./you-might-also-like.module.scss";

interface YouMightAlsoLikeProps {
  currentBlogSlug: string;
  currentBlogTags?: string[];
  currentBlogCountry?: string;
}

interface BlogPriority {
  blog: CardProps;
  tagMatches: number;
  countryMatch: boolean;
  score: number;
}

const YouMightAlsoLike = ({
  currentBlogSlug,
  currentBlogTags = [],
  currentBlogCountry,
}: YouMightAlsoLikeProps) => {
  const [relatedBlogs, setRelatedBlogs] = useState<CardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);

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
      readTime: "5 mins", // Default read time since API doesn't provide it
      slug: blogPost.slug,
      url: url,
    };
  };

  // Priority scoring function
  const calculateBlogPriority = (
    blog: CardProps,
    currentTags: string[],
    currentCountry?: string,
  ): BlogPriority => {
    // Count tag matches (case-insensitive)
    const tagMatches = blog.tags.filter((tag) =>
      currentTags.some(
        (currentTag) => currentTag.toLowerCase() === tag.toLowerCase(),
      ),
    ).length;

    // Check country match (case-insensitive)
    const countryMatch =
      currentCountry &&
      blog.country.toLowerCase() === currentCountry.toLowerCase();

    // Calculate score: tags are worth 2 points each, country match is worth 1 point
    const score = tagMatches * 2 + (countryMatch ? 1 : 0);

    return {
      blog,
      tagMatches,
      countryMatch: !!countryMatch,
      score,
    };
  };

  // Simple seeded random function for consistent selection
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Enhanced card click tracking for "You Might Also Like" section
  const handleRelatedCardClick = (blog: CardProps, position: number) => {
    trackCardClick({
      cardTitle: blog.title,
      cardCategory: blog.country,
      cardType: "CardThree-YouMightAlsoLike",
      location: window.location.pathname,
      cardPosition: position,
    });
  };

  useEffect(() => {
    // Get daily seed for consistent daily selection
    const getDailySeed = () => {
      const today = new Date().toDateString(); // "Mon Oct 15 2025"
      return today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    };

    // Select 4 blogs with prioritization
    const selectRelatedBlogs = (
      eligibleBlogs: CardProps[],
      currentTags: string[],
      currentCountry?: string,
    ): CardProps[] => {
      if (eligibleBlogs.length < 4) return [];

      // Calculate priorities for all eligible blogs
      const prioritizedBlogs = eligibleBlogs.map((blog) =>
        calculateBlogPriority(blog, currentTags, currentCountry),
      );

      // Sort by score (highest first), then by random for ties
      const dailySeed = getDailySeed();
      prioritizedBlogs.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        // For ties, use seeded random based on blog slug for consistency
        const seedA = a.blog.slug
          .split("")
          .reduce((acc, char) => acc + char.charCodeAt(0), dailySeed);
        const seedB = b.blog.slug
          .split("")
          .reduce((acc, char) => acc + char.charCodeAt(0), dailySeed);
        return seededRandom(seedA) - seededRandom(seedB);
      });

      // Return top 4 blogs
      return prioritizedBlogs.slice(0, 4).map((item) => item.blog);
    };

    const getRelatedBlogs = async () => {
      try {
        setIsLoading(true);
        const blogData = await fetchLatestBlogPostsClient();

        if (blogData) {
          const mappedBlogs = blogData.map(mapBlogPostToCardProps);

          // Filter out current blog
          const withoutCurrentBlog = mappedBlogs.filter(
            (blog) => blog.slug !== currentBlogSlug,
          );

          // Filter out "latest blogs" (first 4 from homepage)
          const withoutLatestBlogs = withoutCurrentBlog.slice(4);

          // Select related blogs with prioritization
          const selectedBlogs = selectRelatedBlogs(
            withoutLatestBlogs,
            currentBlogTags,
            currentBlogCountry,
          );

          setRelatedBlogs(selectedBlogs);
          setShouldShow(selectedBlogs.length === 4);
        }
      } catch (error) {
        console.error("Error fetching related blogs:", error);
        setShouldShow(false);
      } finally {
        setIsLoading(false);
      }
    };

    getRelatedBlogs();
  }, [currentBlogSlug, currentBlogTags, currentBlogCountry]);

  // Don't render if loading, error, or insufficient blogs
  if (isLoading || !shouldShow) {
    return null;
  }

  return (
    <section className={s.container}>
      <div className={s.wrapper}>
        <h2>You Might Also Like</h2>
        <div className={s.cardWrapper}>
          {relatedBlogs.map((blog, index) => (
            <div
              key={blog.slug}
              onClick={() => handleRelatedCardClick(blog, index + 1)}
            >
              <CardThree
                blog={blog}
                color={
                  ["purple", "blue", "green", "red"][index % 4] || "purple"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouMightAlsoLike;
