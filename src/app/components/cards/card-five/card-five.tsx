import React from "react";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import s from "./card-five.module.scss";

interface mockDataProps {
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  date: string;
  country: string;
  readTime: string;
}

interface CardProps {
  mockData: mockDataProps;
}

const CardFive = ({ mockData }: CardProps) => {
  return (
    <div className={s.container}>
      <div className={s.imageWrapper}>
        <Image
          className={s.image}
          // src="https://res.cloudinary.com/jetlagchronicles/image/upload/v1741481814/blog-assets/japanese-culture_clexsv.jpg"
          src={mockData.thumbnail}
          alt="Grocery time"
          width={330}
          height={250}
          loading="lazy"
        />
        <div className={s.backgroundOverlay}>
          <div className={s.tag}>
            <FontAwesomeIcon icon={faFire} className={s.icon} />
            {mockData.tags[1]}
          </div>
          <div className={s.content}>
            <h3>{mockData.title}</h3>
            <p>{mockData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFive;
