"use client";

import { BlogPost } from "@/api/types";
import { CardProps } from "@/components/cards/card.types";
import { trackCardClick } from "@/app/utils/analytics";
import TinyBlogCard from "./tiny-blog-card";

import s from "./you-might-also-like.module.scss";

interface YouMightAlsoLikeProps {
  currentBlogSlug: string;
  currentBlogTags?: string[];
  currentBlogCountry?: string;
  allBlogs: BlogPost[];
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
  allBlogs,
}: YouMightAlsoLikeProps) => {
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
      cardType: "TinyBlogCard-YouMightAlsoLike",
      location: window.location.pathname,
      cardPosition: position,
    });
  };

  const getDailySeed = () => {
    const today = new Date().toDateString();
    return today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  };

  const selectRelatedBlogs = (
    eligibleBlogs: CardProps[],
    allMapped: CardProps[],
    currentTags: string[],
    currentCountry?: string,
  ): CardProps[] => {
    let blogsToUse = eligibleBlogs;

    if (blogsToUse.length < 4) {
      blogsToUse = allMapped.filter((blog) => blog.slug !== currentBlogSlug);
    }

    while (blogsToUse.length > 0 && blogsToUse.length < 4) {
      blogsToUse = [
        ...blogsToUse,
        ...blogsToUse.slice(0, 4 - blogsToUse.length),
      ];
    }

    blogsToUse = blogsToUse.slice(0, Math.max(4, blogsToUse.length));

    const prioritizedBlogs = blogsToUse.map((blog) =>
      calculateBlogPriority(blog, currentTags, currentCountry),
    );

    const dailySeed = getDailySeed();
    prioritizedBlogs.sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      const seedA = a.blog.slug
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), dailySeed);
      const seedB = b.blog.slug
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), dailySeed);
      return seededRandom(seedA) - seededRandom(seedB);
    });

    const result = prioritizedBlogs.slice(0, 4).map((item) => item.blog);
    return result.length === 4
      ? result
      : prioritizedBlogs
          .slice(0, Math.min(4, prioritizedBlogs.length))
          .map((item) => item.blog);
  };

  const mappedBlogs = allBlogs.map(mapBlogPostToCardProps);
  const withoutCurrentBlog = mappedBlogs.filter(
    (blog) => blog.slug !== currentBlogSlug,
  );
  const withoutOldestBlogs = withoutCurrentBlog.slice(0, -4);
  const relatedBlogs = selectRelatedBlogs(
    withoutOldestBlogs,
    mappedBlogs,
    currentBlogTags,
    currentBlogCountry,
  );

  if (relatedBlogs.length === 0) return null;

  const cardsToDisplay = [...relatedBlogs];
  while (cardsToDisplay.length < 4 && relatedBlogs.length > 0) {
    cardsToDisplay.push(...relatedBlogs.slice(0, 4 - cardsToDisplay.length));
  }
  const displayCards = cardsToDisplay.slice(0, 4);

  return (
    <section className={s.container}>
      <div className={s.wrapper}>
        <h2>You Might Also Like</h2>
        <div className={s.cardWrapper}>
          {displayCards.map((blog, index) => (
            <TinyBlogCard
              key={`${blog.slug}-${index}`}
              blog={blog}
              onClick={() => handleRelatedCardClick(blog, index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouMightAlsoLike;
