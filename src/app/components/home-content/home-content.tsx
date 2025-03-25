"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/api/types";
import Hero from "../hero/hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCompass,
  faNewspaper,
  faRightLong,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

import s from "./home-content.module.scss";

const HomeContent = ({
  latestBlogPosts,
}: {
  latestBlogPosts: BlogPost[] | null;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run once on mount
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click manually on mobile
  const handleClick = (url: string) => {
    if (isMobile) router.push(url);
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
          <div className={s.wrapper}>
            {latestBlogPosts.map((blogPost) => (
              <div
                key={blogPost.id}
                className={s.latestBlogPost}
                onClick={() =>
                  handleClick(
                    formatUrl(`${blogPost.category}/${blogPost.title}`)
                  )
                }
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
                  <Link
                    href={`/${formatUrl(
                      `${blogPost.category}/${blogPost.title}`
                    )}`}
                    className={s.readMore}
                  >
                    Read More
                    <FontAwesomeIcon icon={faRightLong} className={s.icon} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
