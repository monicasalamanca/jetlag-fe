"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { CardProps } from "../card.types";
import { trackCardClick } from "@/app/utils/analytics";

import s from "./card-five.module.scss";

interface blogProps {
  blog: CardProps;
}

const CardFive = ({ blog }: blogProps) => {
  // Handle case where blog is undefined
  if (!blog) {
    return null;
  }

  const generateBlogUrl = () => {
    // Use pre-computed URL or fallback to country-based URL, or home page as last resort
    return (
      blog?.url ||
      `/${blog?.country?.toLowerCase() || ""}/${blog?.slug || ""}` ||
      "/"
    );
  };

  const handleCardClick = () => {
    if (blog) {
      trackCardClick({
        cardTitle: blog.title || "Unknown Title",
        cardCategory: blog.country || "Unknown Country",
        cardType: "CardFive",
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
            fill
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
          <div className={s.backgroundOverlay}>
            <div className={s.tag}>
              <FontAwesomeIcon icon={faFire} className={s.icon} />
              Hot
            </div>
            <div className={s.content}>
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardFive;
