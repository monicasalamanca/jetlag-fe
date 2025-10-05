"use client";

import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPlane } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { CardProps } from "../card.types";
import { trackCardClick } from "@/app/utils/analytics";

import s from "./card-one.module.scss";

const CardOne: FC<{
  blog: CardProps;
  color: string;
  position?: number;
}> = ({ blog, color, position }) => {
  const getColourClassNames = (color: string) => {
    switch (color) {
      case "blue":
        return `${s.blue}`;
      case "green":
        return `${s.green}`;
      case "purple":
        return `${s.purple}`;
      case "orange":
        return `${s.orange}`;
      case "red":
        return `${s.red}`;
    }
  };

  // Use the pre-computed URL from the blog data
  const getCardUrl = () => {
    // Use pre-computed URL, fallback to country-based URL, or home page as last resort
    return (
      blog?.url ||
      (blog?.country && blog?.slug
        ? `/${blog.country.toLowerCase()}/${blog.slug}`
        : "/")
    );
  };

  const handleCardClick = () => {
    if (blog) {
      trackCardClick({
        cardTitle: blog.title || "Unknown Title",
        cardCategory: blog.country || "Unknown Country",
        cardType: "CardOne",
        location: window.location.pathname,
        cardPosition: position,
      });
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <Link
      href={getCardUrl()}
      className={s.cardLink}
      onClick={handleCardClick}
      rel="canonical"
    >
      <div className={s.container}>
        <div className={s.imageWrapper}>
          <Image
            className={s.image}
            src={blog.thumbnail}
            alt={`${blog.title} - ${blog.country}`}
            // fill
            // sizes="(max-width: 768px) 100vw, 50vw"
            width={330}
            height={250}
            loading="lazy"
          />
          <div className={s.topTag}>
            <FontAwesomeIcon
              icon={faPlane}
              className={`${s.icon} ${getColourClassNames(color)}`}
            />
            {blog.tags && blog.tags.length > 0 ? blog.tags[0] : "Travel"}
          </div>
        </div>
        <div className={s.content}>
          <div className={s.tags}>
            <div className={`${s.tag} ${getColourClassNames(color)}`}>
              {blog.tags && blog.tags.length > 1 ? blog.tags[1] : "Blog"}
            </div>
            <div className={s.date}>{blog.date}</div>
          </div>
          <h3>{blog.title}</h3>
          <p>{blog.description}</p>
          <div className={s.bottomInfo}>
            <div className={s.country}>
              <FontAwesomeIcon
                icon={faLocationDot}
                className={`${s.icon} ${getColourClassNames(color)}`}
              />
              {blog.country}
            </div>
            <div className={s.readTime}>
              <FontAwesomeIcon icon={faClock} className={s.icon} />
              {blog.readTime}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardOne;
