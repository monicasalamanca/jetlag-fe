"use client";

import { useEffect, useState } from "react";
import { fetchLatestBlogPostsClient } from "@/api/client";
import { BlogPost } from "@/api/types";
import { CardProps } from "@/components/cards/card.types";
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

  // Function to map API BlogPost to CardProps format
  const mapBlogPostToCardProps = (blogPost: BlogPost): CardProps => {
    const tagsToUse =
      blogPost.tags.length > 0 ? blogPost.tags : ["travel", "blog"];

    // Use country for display name
    const countryToUse = blogPost.country || "Lifestyle";

    // Generate the correct URL based on lifestyle vs country
    let url = "";
    if (blogPost.lifestyle) {
      url = `/lifestyle/${blogPost.slug}`;
    } else if (blogPost.country) {
      url = `/${blogPost.country.toLowerCase().replace(/\s+/g, "-")}/${blogPost.slug}`;
    } else {
      url = `/unknown/${blogPost.slug}`;
    }

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

    // Select 4 blogs with prioritization - always return up to 4 blogs
    const selectRelatedBlogs = (
      eligibleBlogs: CardProps[],
      allBlogs: CardProps[],
      currentTags: string[],
      currentCountry?: string,
    ): CardProps[] => {
      // Start with eligible blogs (excluding current and oldest 4)
      let blogsToUse = eligibleBlogs;

      // If we don't have enough eligible blogs, expand to include oldest blogs (but still exclude current)
      if (blogsToUse.length < 4) {
        blogsToUse = allBlogs.filter((blog) => blog.slug !== currentBlogSlug);
      }

      // If still not enough (edge case), duplicate some blogs to reach 4
      while (blogsToUse.length > 0 && blogsToUse.length < 4) {
        blogsToUse = [
          ...blogsToUse,
          ...blogsToUse.slice(0, 4 - blogsToUse.length),
        ];
      }

      // Take only what we need (up to 4)
      blogsToUse = blogsToUse.slice(0, Math.max(4, blogsToUse.length));

      // Calculate priorities for all blogs
      const prioritizedBlogs = blogsToUse.map((blog) =>
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

      // Return up to 4 blogs, but ensure we return exactly 4 if possible
      const result = prioritizedBlogs.slice(0, 4).map((item) => item.blog);
      return result.length === 4
        ? result
        : prioritizedBlogs
            .slice(0, Math.min(4, prioritizedBlogs.length))
            .map((item) => item.blog);
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

          // Filter out "oldest blogs" (last 4 from homepage) - keep the newest content
          const withoutOldestBlogs = withoutCurrentBlog.slice(0, -4);

          // Select related blogs with prioritization - always get 4 blogs
          const selectedBlogs = selectRelatedBlogs(
            withoutOldestBlogs,
            mappedBlogs, // Pass all mapped blogs as fallback
            currentBlogTags,
            currentBlogCountry,
          );

          setRelatedBlogs(selectedBlogs);
        }
      } catch (error) {
        console.error("Error fetching related blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRelatedBlogs();
  }, [currentBlogSlug, currentBlogTags, currentBlogCountry]);

  // Don't render if loading or no blogs available
  if (isLoading || relatedBlogs.length === 0) {
    return null;
  }

  // Ensure we always have 4 cards to display (pad with duplicates if needed)
  const cardsToDisplay = [...relatedBlogs];
  while (cardsToDisplay.length < 4 && relatedBlogs.length > 0) {
    const extraCards = relatedBlogs.slice(0, 4 - cardsToDisplay.length);
    cardsToDisplay.push(...extraCards);
  }
  const displayCards = cardsToDisplay.slice(0, 4);

  return (
    <section className={s.container}>
      <div className={s.wrapper}>
        <h2>You Might Also Like</h2>
        <div className={s.cardWrapper}>
          {displayCards.map((blog, index) => (
            <div
              key={`${blog.slug}-${index}`} // Use index to handle duplicates
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
