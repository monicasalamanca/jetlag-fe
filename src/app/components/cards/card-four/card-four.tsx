import React from "react";

import Image from "next/image";

import s from "./card-four.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const CardFour = () => {
  // const getColourClassNames = (color: string) => {
  //   switch (color) {
  //     case "blue":
  //       return `${s.blue}`;
  //     case "green":
  //       return `${s.green}`;
  //     case "purple":
  //       return `${s.purple}`;
  //     case "orange":
  //       return `${s.orange}`;
  //     case "red":
  //       return `${s.red}`;
  //   }
  // };

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
        <div className={s.tag}>
          <FontAwesomeIcon icon={faFire} className={s.icon} />
          Trending
        </div>
      </div>
      <div className={s.content}>
        <h3>Best Beach Destinations</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        </p>
        <div className={s.country}>
          <FontAwesomeIcon icon={faLocationDot} className={s.icon} />
          Bali, Indonesia
        </div>
      </div>
    </div>
  );
};

export default CardFour;
