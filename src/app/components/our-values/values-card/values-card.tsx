import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import s from "./values-card.module.scss";

const ValueCard: FC<{
  icon: IconDefinition;
  color: string;
  headline: string;
  description: string;
}> = ({ icon, color, headline, description }) => {
  return (
    <div className={s.container}>
      <FontAwesomeIcon
        icon={icon}
        className={s.icon}
        style={{ color: color }}
      />
      <div className={s.wrapper}>
        <h2>{headline}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ValueCard;
