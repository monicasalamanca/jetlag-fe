"use client";

import { BlogPost } from "@/api/types";
import Hero from "../hero/hero";

import s from "./home-content.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCompass,
  faNewspaper,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

const HomeContent = ({
  latestBlogPosts,
}: {
  latestBlogPosts: BlogPost[] | null;
}) => {
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  const handleReload = () => {
    window.location.reload();
  };
  const formatUrl = (url: string): string => {
    return url.replace(/\s+/g, "-").toLowerCase();
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
      {latestBlogPosts ? (
        <section className={s.latestBlogPosts}>
          <h2>Latest Posts</h2>
          {latestBlogPosts.map((blogPost) => (
            <Link
              key={blogPost.id}
              className={s.latestBlogPost}
              href={formatUrl(`${blogPost.category}/${blogPost.title}`)}
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
      ) : (
        <section className={s.latestBlogPosts}>
          <h2>Latest Posts</h2>
          <div className={s.notWorking}>
            <FontAwesomeIcon
              icon={faNewspaper}
              className={s.icon}
              style={{ color: "#3A78FC" }}
            />
            <h3>Oops! Something went wrong</h3>
            <p>
              We&apos;re having trouble loading the latest articles right now.
            </p>
            <button onClick={() => handleReload()}>
              <FontAwesomeIcon icon={faRotateRight} className={s.btnIcon} /> Try
              Again
            </button>
            <div className={s.bottomLinks}>
              <p>Meanwhile, checkout our</p>
              <div className={s.links}>
                <Link
                  className={s.otherLinks}
                  href="https://twitter.com/jetlagchronicle"
                >
                  <FontAwesomeIcon icon={faBookOpen} className={s.icon} />{" "}
                  Featured Guides
                </Link>
                <Link
                  className={s.otherLinks}
                  href="https://twitter.com/jetlagchronicle"
                >
                  <FontAwesomeIcon icon={faCompass} className={s.icon} /> City
                  Quiz
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default HomeContent;
