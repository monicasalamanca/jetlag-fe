import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import s from "./weather-overview-card.module.scss";

const WeatherOverviewCard: FC<{
  icon: IconDefinition;
  color: string;
  season: string;
  temperature: string;
}> = ({ icon, color, season, temperature }) => {
  return (
    <div className={s.container}>
      <p>{season}</p>
      <p>
        <span>
          <FontAwesomeIcon
            icon={icon}
            className={s.icon}
            style={{ color: color }}
          />
        </span>
        {temperature}
      </p>
    </div>
  );
};

export default WeatherOverviewCard;
