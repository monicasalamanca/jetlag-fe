"use client";

import { useEffect, useState } from "react";
import { fetchLatestBlogPostsClient } from "@/api/client";
import { BlogPost } from "@/api/types";
import { CardProps } from "@/components/cards/card.types";
import Hero from "../hero/hero";
import CardThree from "../cards/card-three/card-three";

import s from "./chronicle-content.module.scss";

const ChronicleContent = () => {
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
        headline={"Which Thai Island Makes Sense In 2026?"}
        shortDescription={
          "What it really costs to live on Thailand’s islands. Rent, food, transport, visas, and the hidden expenses that drain newcomers fast."
        }
        ctaProps={{
          buttonText: "Download the Free Guide",
          tags: ["free guide", "thailand"],
        }}
      />
      <section className={s.latestChronicles}>
        <div className={s.wrapper}>
          <h2>Latest Stories</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className={s.cardWrapper}>
              {blogs.slice(0, 8).map((blog, index) => (
                <CardThree
                  key={blog.slug}
                  blog={blog}
                  color={colors[index % colors.length]}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ChronicleContent;
