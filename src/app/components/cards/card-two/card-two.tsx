"use client";

import React, { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { CardProps } from "../card.types";
import { trackCardClick } from "@/app/utils/analytics";

import s from "./card-two.module.scss";

const CardTwo: FC<{ blog: CardProps; color: string }> = ({ blog, color }) => {
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

  const generateBlogUrl = () => {
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
        cardType: "CardTwo",
        location: window.location.pathname,
      });
    }
  };

  return (
    <Link
      href={generateBlogUrl()}
      className={s.cardLink}
      onClick={handleCardClick}
    >
      <div className={s.container}>
        <div className={s.imageWrapper}>
          <Image
            className={s.image}
            src={blog.thumbnail}
            alt={blog.title}
            width={330}
            height={250}
            loading="lazy"
          />
          <div className={s.readTime}>
            <FontAwesomeIcon icon={faClockRotateLeft} className={s.icon} />
            {blog.readTime}
          </div>
          <div className={s.bottomInfo}>
            <div className={`${s.tag} ${getColourClassNames(color)}`}>
              {blog.tags[0]}
            </div>
            <h3>{blog.title}</h3>
          </div>
        </div>
        <div className={s.content}>
          <div className={s.topContent}>
            <div className={s.country}>
              <FontAwesomeIcon
                icon={faLocationDot}
                className={`${s.icon} ${getColourClassNames(color)}`}
              />
              {blog.country}
            </div>
            <div className={s.date}>{blog.date}</div>
          </div>
          <p>{blog.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardTwo;
