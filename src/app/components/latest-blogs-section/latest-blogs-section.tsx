"use client";

import { useEffect, useState } from "react";
import { fetchLatestBlogPostsClient } from "@/api/client";
import { BlogPost } from "@/api/types";
import { CardProps } from "@/components/cards/card.types";
import CardTwo from "@/components/cards/card-two/card-two";

import s from "./latest-blogs-section.module.scss";

const LatestBlogsSection = () => {
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
          const mappedBlogs = blogData.slice(0, 4).map(mapBlogPostToCardProps);
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

  // Only render if we have at least 4 blogs
  if (loading || blogs.length < 4) {
    return null;
  }

  return (
    <section className={s.latestBlogs}>
      <div className={s.wrapper}>
        <h2>Keep exploring</h2>
        <div className={s.cardWrapper}>
          <CardTwo blog={blogs[0]} color="blue" />
          <CardTwo blog={blogs[1]} color="green" />
          <CardTwo blog={blogs[2]} color="red" />
          <CardTwo blog={blogs[3]} color="purple" />
        </div>
      </div>
    </section>
  );
};

export default LatestBlogsSection;
