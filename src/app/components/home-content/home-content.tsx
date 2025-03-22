// import { FC } from "react";
import { BlogPost } from "@/api/types";
import Hero from "../hero/hero";

import s from "./home-content.module.scss";
import Image from "next/image";
import Link from "next/link";

const HomeContent = ({ latestBlogPosts }: { latestBlogPosts: BlogPost[] }) => {
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  return (
    <main className={s.container}>
      <Hero
        srcImage={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1739143592/blog-assets/home-hero_apo3zo.jpg`}
        headline={"Find Your Perfect City for Your Nomadic Lifestyle!"}
        shortDescription={
          "Discover your next destination with our curated guides for digital nomads and expats"
        }
      />
      <section className={s.latestBlogPosts}>
        <h2>Latest Posts</h2>
        {latestBlogPosts.map((blogPost) => (
          <Link
            key={blogPost.id}
            className={s.latestBlogPost}
            href={`${blogPost.category}/${blogPost.title}`}
          >
            <Image
              className={s.thumbnail}
              src={blogPost.imageUrl}
              alt="Blog Post Thumbnail"
              width={234}
              height={156}
            />
            <div className={s.contentWrapper}>
              <small>{formatDate(blogPost.publishedAt)}</small>
              <h3>{blogPost.title}</h3>
              <p>{blogPost.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default HomeContent;
