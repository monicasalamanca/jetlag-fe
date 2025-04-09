import React, { FC } from "react";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import s from "./card-three.module.scss";

interface mockDataProps {
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  date: string;
  country: string;
  readTime: string;
}

const CardThree: FC<{ mockData: mockDataProps; color: string }> = ({
  mockData,
  color,
}) => {
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
          // src="https://res.cloudinary.com/jetlagchronicles/image/upload/v1741481814/blog-assets/japanese-culture_clexsv.jpg"
          src={mockData.thumbnail}
          alt="Grocery time"
          width={330}
          height={250}
          loading="lazy"
        />
        <div className={s.topInfo}>
          <div className={`${s.tag} ${getColourClassNames(color)}`}>
            {mockData.tags[0]}
          </div>
          <div className={s.readTime}>{`${mockData.readTime} read`}</div>
        </div>
      </div>
      <div className={s.content}>
        <div className={s.country}>
          <FontAwesomeIcon
            icon={faLocationDot}
            className={`${s.icon} ${getColourClassNames(color)}`}
          />
          {mockData.country}
        </div>
        <h3>{mockData.title}</h3>
        <p>{mockData.description}</p>
        <div className={s.date}>{mockData.date}</div>
      </div>
    </div>
  );
};

export default CardThree;
