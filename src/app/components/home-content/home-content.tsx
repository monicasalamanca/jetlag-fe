"use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { BlogPost } from "@/api/types";
import Hero from "../hero/hero";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faNewspaper,
//   faRightLong,
//   faRotateRight,
// } from "@fortawesome/free-solid-svg-icons";

import s from "./home-content.module.scss";
import CardOne from "../cards/card-one/card-one";
import CardTwo from "../cards/card-two/card-two";
import CardThree from "../cards/card-three/card-three";
import CardFive from "../cards/card-five/card-five";
import blogs from "@/app/blogs.json";

// const HomeContent = ({
//   latestBlogPosts,
// }: {
//   latestBlogPosts: BlogPost[] | null;
// }) => {
const HomeContent = () => {
  // const router = useRouter();

  // const formatDate = (dateString: string): string => {
  //   const options: Intl.DateTimeFormatOptions = {
  //     year: "numeric",
  //     month: "short",
  //     day: "2-digit",
  //   };
  //   const date = new Date(dateString);
  //   return new Intl.DateTimeFormat("en-US", options).format(date);
  // };

  // const handleReload = () => {
  //   window.location.reload();
  // };

  // const formatUrl = (url: string): string => {
  //   return url.replace(/\s+/g, "-").toLowerCase();
  // };

  // // Handle click manually on mobile
  // const handleClick = (url: string) => {
  //   router.push(url);
  // };

  return (
    <main className={s.container}>
      <Hero
        srcImage="/home-hero_apo3zo.jpg"
        headline={"Find Your Perfect City for Your Nomadic Lifestyle!"}
        shortDescription={
          "Discover your next destination with our curated guides for digital nomads and expats"
        }
      />
      <section className={s.latestChronicles}>
        <div className={s.wrapper}>
          <h2>Latest Stories</h2>
          <div className={s.cardWrapper}>
            <CardOne mockData={blogs[14]} color="blue" />
            <CardOne mockData={blogs[13]} color="green" />
          </div>
        </div>
      </section>
      <section className={s.mostViewed}>
        <div className={s.wrapper}>
          <h2>Most Viewed</h2>
          <div className={s.cardWrapper}>
            <CardFive mockData={blogs[12]} />
            <CardFive mockData={blogs[11]} />
            <CardFive mockData={blogs[10]} />
            <CardFive mockData={blogs[9]} />
            <CardFive mockData={blogs[8]} />
            <CardFive mockData={blogs[7]} />
          </div>
        </div>
      </section>
      <section className={s.trending}>
        <div className={s.wrapper}>
          <h2>Trending</h2>
          <div className={s.cardWrapper}>
            <CardTwo mockData={blogs[6]} color="red" />
            <CardTwo mockData={blogs[5]} color="green" />
            <CardTwo mockData={blogs[4]} color="purple" />
            <CardTwo mockData={blogs[3]} color="orange" />
          </div>
        </div>
      </section>
      <section className={s.mostPopular}>
        <div className={s.wrapper}>
          <h2>Most Popular</h2>
          <div className={s.cardWrapper}>
            <CardThree mockData={blogs[2]} color="purple" />
            <CardThree mockData={blogs[1]} color="blue" />
            <CardThree mockData={blogs[0]} color="red" />
            <CardThree mockData={blogs[11]} color="green" />
          </div>
        </div>
      </section>

      {/* {latestBlogPosts ? (
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
                  loading="lazy"
                  width={234}
                  height={156}
                />
                <div className={s.contentWrapper}>
                  <small>{formatDate(blogPost.publishedAt)}</small>
                  <h3>{blogPost.title}</h3>
                  <p>{blogPost.description}</p>
                  <Link
                    aria-label={`Click here to Read more about ${blogPost.title}`}
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
            <button
              type="button"
              aria-label="try again"
              onClick={() => handleReload()}
            >
              <FontAwesomeIcon icon={faRotateRight} className={s.btnIcon} /> Try
              Again
            </button>
            <div className={s.bottomLinks}>
              <p>Meanwhile, checkout our</p>
              <div className={s.links}>
                <a
                  aria-label=""
                  className={s.otherLinks}
                  href="https://twitter.com/jetlagchronicle"
                >
                  <FontAwesomeIcon icon={faBookOpen} className={s.icon} />{" "}
                  Featured Guides
                </a>
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
      )} */}
    </main>
  );
};

export default HomeContent;
