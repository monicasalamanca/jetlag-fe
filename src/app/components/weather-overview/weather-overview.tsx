import { FC } from "react";
import {
  faLeaf,
  faSnowflake,
  faSun,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
import WeatherOverviewCard from "./weather-overview-card/weather-overview-card";

import s from "./weather-overview.module.scss";

const WeatherOverview: FC<{
  summerTemp: string;
  automnTemp: string;
  springTemp: string;
  winterTemp: string;
}> = ({ summerTemp, automnTemp, springTemp, winterTemp }) => {
  return (
    <section className={s.container}>
      <h1>Weather Overview</h1>
      <div className={s.wrapper}>
        <WeatherOverviewCard
          icon={faUmbrellaBeach}
          color="#F59E0B"
          season="Summer (Jun-Aug)"
          temperature={`${summerTemp} C`}
        />
        <WeatherOverviewCard
          icon={faLeaf}
          color="#F87315"
          season="Autumn (Sep-Nov)"
          temperature={`${automnTemp} C`}
        />
        <WeatherOverviewCard
          icon={faSun}
          color="#EC4899"
          season="Spring (May-May)"
          temperature={`${springTemp} C`}
        />
        <WeatherOverviewCard
          icon={faSnowflake}
          color="#3B81F6"
          season="Winter (Dec-Feb)"
          temperature={`${winterTemp} C`}
        />
      </div>
    </section>
  );
};

export default WeatherOverview;
