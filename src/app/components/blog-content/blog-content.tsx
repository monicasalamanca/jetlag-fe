"use client";

import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import ReactMarkdown from "react-markdown";
import { Post } from "@/api/types";

import s from "./blog-content.module.scss";

const BlogContent: FC<{ post: Post }> = ({ post }) => {
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
        {post.likes === 0 && (
          <div className={s.blogDetail}>
            <FontAwesomeIcon icon={faHeart} className={s.icon} />
            <p>{`${post.likes} likes`}</p>
          </div>
        )}
      </div>
      <h1>{post.title}</h1>
      <div className={s.socialMedia}>
        <FontAwesomeIcon icon={faXTwitter} className={s.icon} />
        <FontAwesomeIcon icon={faFacebook} className={s.icon} />
        <FontAwesomeIcon icon={faInstagram} className={s.icon} />
        <FontAwesomeIcon icon={faLinkedin} className={s.icon} />
        <FontAwesomeIcon icon={faHeart} className={s.icon} />
      </div>
      <section className={s.postContent}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </section>
    </div>
  );
};

export default BlogContent;
