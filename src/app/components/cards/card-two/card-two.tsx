import React, { FC } from "react";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import s from "./card-two.module.scss";

const CardTwo: FC<{ color: string }> = ({ color }) => {
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

  return (
    <div className={s.container}>
      <div className={s.imageWrapper}>
        <Image
          className={s.image}
          src="https://res.cloudinary.com/jetlagchronicles/image/upload/v1741481814/blog-assets/japanese-culture_clexsv.jpg"
          alt="Grocery time"
          width={330}
          height={250}
          loading="lazy"
        />
        <div className={s.readTime}>
          <FontAwesomeIcon icon={faClockRotateLeft} className={s.icon} />5 mins
        </div>
        <div className={s.bottomInfo}>
          <div className={`${s.tag} ${getColourClassNames(color)}`}>
            Remote Work
          </div>
          <h3>Best Beach Destinations</h3>
        </div>
      </div>
      <div className={s.content}>
        <div className={s.topContent}>
          <div className={s.country}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={`${s.icon} ${getColourClassNames(color)}`}
            />
            Bali, Indonesia
          </div>
          <div className={s.date}>March 15, 2025</div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};

export default CardTwo;
