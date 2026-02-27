"use client";

import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { Post } from "@/api/types";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { CustomMarkdownRenderer } from "@/app/utils/markdownRenderer";

import s from "./blog-content.module.scss";

function useTrackPostView(blogId: number) {
  useEffect(() => {
    if (!blogId) return;

    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs/${blogId}/view`, {
      method: "POST",
    });
  }, [blogId]);
}

const BlogContent: FC<{ post: Post; readingTimeMins?: number }> = ({
  post,
  readingTimeMins,
}) => {
  useTrackPostView(post.id);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // check if the code is running in the browser
    if (typeof window !== "undefined") {
      // Detect mobile device
      setIsMobileDevice(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    }
  }, [post]);

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
      console.error("Web Share API not supported.");
    }
  };

  return (
    <article className={s.container}>
      <header>
        <div className={s.blogInfo}>
          <div className={s.blogDetail}>
            <FontAwesomeIcon icon={faCalendar} className={s.icon} />
            <p>{formatDate(post.publishedAt)}</p>
          </div>
          <div className={s.blogDetail}>
            <FontAwesomeIcon icon={faClock} className={s.icon} />
            <p>{readingTimeMins || 8} min read</p>
          </div>
        </div>
        <h1>{post.title}</h1>
        {isMobileDevice && (
          <div className={s.socialMedia}>
            <button
              aria-label="Share this article using your device's share menu"
              onClick={handleShare}
              className={s.mobileShareButton}
            >
              <FontAwesomeIcon icon={faShareNodes} className={s.icon} />
            </button>
          </div>
        )}
      </header>
      <section className={s.postContent}>
        <CustomMarkdownRenderer markdown={post.content} />
      </section>
    </article>
  );
};

export default BlogContent;
