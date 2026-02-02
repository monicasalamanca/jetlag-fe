"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CardProps } from "@/components/cards/card.types";

import s from "./tiny-blog-card.module.scss";
// import Link from "next/dist/client/link";

interface TinyBlogCardProps {
  blog: CardProps;
  onClick: () => void;
}

const TinyBlogCard = ({ blog, onClick }: TinyBlogCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      href={blog.url || "#"}
      className={s.card}
      onClick={onClick}
      aria-label={`Read more about ${blog.title}`}
    >
      <div className={s.thumbnailWrapper}>
        {!imageLoaded && <div className={s.skeleton} />}
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          fill
          sizes="(max-width: 600px) 120px, 150px"
          className={`${s.thumbnail} ${imageLoaded ? s.loaded : ""}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className={s.content}>
        <h3 className={s.title}>{blog.title}</h3>
        <div className={s.readMore}>
          <span>Read More</span>
          <FontAwesomeIcon icon={faArrowRight} className={s.arrow} />
        </div>
      </div>
    </Link>
  );
};

export default TinyBlogCard;
