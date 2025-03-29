"use client";

import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import ReactMarkdown from "react-markdown";
import { Post } from "@/api/types";

import s from "./blog-content.module.scss";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const BlogContent: FC<{ post: Post }> = ({ post }) => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [shareText, setShareText] = useState("");

  useEffect(() => {
    // check if the code is running in the browser
    if (typeof window !== "undefined") {
      // Detect mobile device
      setIsMobileDevice(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
      setShareUrl(encodeURIComponent(window.location.href));
      setShareText(encodeURIComponent(post.title));
    }
  }, [post.title]);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      // Handle invalid date string
      return "Invalid date";
    }
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check out this article!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.log("Web Share API not supported.");
    }
  };

  return (
    <div className={s.container}>
      <div className={s.blogInfo}>
        <div className={s.blogDetail}>
          <FontAwesomeIcon icon={faCalendar} className={s.icon} />
          <p>{formatDate(post.publishedAt)}</p>
        </div>
        <div className={s.blogDetail}>
          <FontAwesomeIcon icon={faClock} className={s.icon} />
          <p>8 min read</p>
        </div>
        {/* {post.likes === 0 && (
          <div className={s.blogDetail}>
            <FontAwesomeIcon icon={faHeart} className={s.icon} />
            <p>{`${post.likes} likes`}</p>
          </div>
        )} */}
      </div>
      <h1>{post.title}</h1>
      <div className={s.socialMedia}>
        {isMobileDevice ? (
          <button onClick={handleShare}>
            <FontAwesomeIcon icon={faShareNodes} className={s.icon} />
          </button>
        ) : (
          <>
            <Link
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
            >
              <FontAwesomeIcon icon={faXTwitter} className={s.icon} />
            </Link>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            >
              <FontAwesomeIcon icon={faFacebook} className={s.icon} />
            </Link>
            <Link
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
            >
              <FontAwesomeIcon icon={faLinkedin} className={s.icon} />
            </Link>

            {/* <FontAwesomeIcon icon={faHeart} className={s.icon} /> */}
          </>
        )}
      </div>
      <section className={s.postContent}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </section>
    </div>
  );
};

export default BlogContent;
