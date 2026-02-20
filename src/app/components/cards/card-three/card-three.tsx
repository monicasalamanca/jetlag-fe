"use client";

import React, { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBolt,
  faEye,
  faFire,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { CardProps } from "../card.types";
import { trackCardClick } from "@/app/utils/analytics";

import s from "./card-three.module.scss";

type SectionType = "latest" | "mostViewed" | "trending" | "mostPopular";

interface CardThreeProps {
  blog: CardProps;
  color: string;
  section?: SectionType;
}

const CardThree: FC<CardThreeProps> = ({ blog, color, section }) => {
  // Section icon and color mapping
  const sectionConfig = {
    latest: { icon: faBolt, color: "#3B82F6" },
    mostViewed: { icon: faEye, color: "#06B6D4" },
    trending: { icon: faFire, color: "#F59E0B" },
    mostPopular: { icon: faStar, color: "#EAB308" },
  };
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
        cardType: "CardThree",
        location: window.location.pathname,
      });
    }
  };

  return (
    <Link
      href={generateBlogUrl()}
      className={s.cardLink}
      onPointerDown={handleCardClick}
      rel="canonical"
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
          <div className={s.topInfo}>
            <div className={`${s.tag} ${getColourClassNames(color)}`}>
              {blog.tags && blog.tags.length > 0 ? blog.tags[0] : "Travel"}
            </div>
            <div className={s.date}>{blog.date}</div>
          </div>
          {section && sectionConfig[section] && (
            <div className={s.sectionIcon}>
              <FontAwesomeIcon
                icon={sectionConfig[section].icon}
                style={{ color: sectionConfig[section].color }}
              />
            </div>
          )}
        </div>
        <div className={s.content}>
          <div className={s.country}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={`${s.icon} ${getColourClassNames(color)}`}
            />
            {blog.country}
          </div>
          <h3>{blog.title}</h3>
          <p>{blog.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardThree;
