import React from "react";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import s from "./card-five.module.scss";

const CardFive = () => {
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
        <div className={s.backgroundOverlay}>
          <div className={s.tag}>
            <FontAwesomeIcon icon={faFire} className={s.icon} />
            Trending
          </div>
          <div className={s.content}>
            <h3>Best Beach Destinations</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFive;
