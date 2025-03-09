import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import s from "./quick-fact-card.module.scss";

const QuickfactCard: FC<{
  icon: IconDefinition;
  color: string;
  title: string;
  description: string;
}> = ({ icon, color, title, description }) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <FontAwesomeIcon
          icon={icon}
          className={s.icon}
          style={{ color: color }}
        />
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default QuickfactCard;
