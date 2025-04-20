import React from "react";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { CardProps } from "../card.types";

import s from "./card-five.module.scss";

interface mockDataProps {
  mockData: CardProps;
}

const CardFive = ({ mockData }: mockDataProps) => {
  return (
    <div className={s.container}>
      <div className={s.imageWrapper}>
        <Image
          className={s.image}
          src={mockData.thumbnail}
          alt="Grocery time"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          // width={330}
          // height={250}
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
