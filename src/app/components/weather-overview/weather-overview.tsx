import {
  faLeaf,
  faSnowflake,
  faSun,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
import WeatherOverviewCard from "./weather-overview-card/weather-overview-card";

import s from "./weather-overview.module.scss";

const WeatherOverview = () => {
  return (
    <section className={s.container}>
      <h1>Weather Overview</h1>
      <div className={s.wrapper}>
        <WeatherOverviewCard
          icon={faUmbrellaBeach}
          color="#F59E0B"
          season="Summer (Jun-Aug)"
          temperature="19-31 C"
        />
        <WeatherOverviewCard
          icon={faLeaf}
          color="#F87315"
          season="Autumn (Sep-Nov)"
          temperature="9-27 C"
        />
        <WeatherOverviewCard
          icon={faSun}
          color="#EC4899"
          season="Spring (May-May)"
          temperature="10-20 C"
        />
        <WeatherOverviewCard
          icon={faSnowflake}
          color="#3B81F6"
          season="Winter (Dec-Feb)"
          temperature="2-12 C"
        />
      </div>
    </section>
  );
};

export default WeatherOverview;
