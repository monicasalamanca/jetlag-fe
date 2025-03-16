import { FC } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import s from "./travel-resource-card.module.scss";

const TravelResourceCard: FC<{
  icon: IconDefinition;
  color: string;
  title: string;
}> = ({ icon, color, title }) => {
  return (
    <div className={s.container}>
      <Link href="https://www.google.com" className={s.link}>
        <div className={s.leftWrapper}>
          <FontAwesomeIcon
            icon={icon}
            className={s.icon}
            style={{ color: color }}
          />
          <h2>{title}</h2>
        </div>
        <FontAwesomeIcon icon={faUpRightFromSquare} className={s.icon} />
        {/* <FontAwesomeIcon
          icon={icon}
          className={s.icon}
          style={{ color: color }}
        /> */}
      </Link>
    </div>
  );
};

export default TravelResourceCard;
