import React from "react";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { CardProps } from "../card.types";

import s from "./card-four.module.scss";

interface blogProps {
  blog: CardProps;
}

const CardFour = ({ blog }: blogProps) => {
  return (
    <div className={s.container}>
      <div className={s.imageWrapper}>
        <Image
          className={s.image}
          src={blog.thumbnail}
          alt="Grocery time"
          width={330}
          height={250}
          loading="lazy"
        />
        <div className={s.tag}>
          <FontAwesomeIcon icon={faFire} className={s.icon} />
          {blog.tags[1]}
        </div>
      </div>
      <div className={s.content}>
        <h3>{blog.title}</h3>
        <p>{blog.description}</p>
        <div className={s.country}>
          <FontAwesomeIcon icon={faLocationDot} className={s.icon} />
          {blog.country}
        </div>
      </div>
    </div>
  );
};

export default CardFour;
