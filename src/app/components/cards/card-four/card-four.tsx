import React from "react";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faLocationDot } from "@fortawesome/free-solid-svg-icons";

import s from "./card-four.module.scss";

interface mockDataProps {
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  date: string;
  country: string;
  readTime: string;
}

interface CardFourProps {
  mockData: mockDataProps;
}

const CardFour = ({ mockData }: CardFourProps) => {
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
        <div className={s.tag}>
          <FontAwesomeIcon icon={faFire} className={s.icon} />
          {mockData.tags[1]}
        </div>
      </div>
      <div className={s.content}>
        <h3>{mockData.title}</h3>
        <p>{mockData.description}</p>
        <div className={s.country}>
          <FontAwesomeIcon icon={faLocationDot} className={s.icon} />
          {mockData.country}
        </div>
      </div>
    </div>
  );
};

export default CardFour;
