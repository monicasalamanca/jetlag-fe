import { FC } from "react";
import BestTimesCard from "./best-time-card/best-time-card";
import {
  faSnowflake,
  faSun,
  faLeaf,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";

import s from "./best-times.module.scss";

const BestTimes: FC<{
  springBestTimeTotravel: string;
  summerBestTimeToTravel: string;
  automnBestTimeToTravel: string;
  winterBestTimeToTravel: string;
}> = ({
  springBestTimeTotravel,
  summerBestTimeToTravel,
  automnBestTimeToTravel,
  winterBestTimeToTravel,
}) => {
  return (
    <section className={s.container}>
      <h1>Best Times to Travel</h1>
      <div className={s.wrapper}>
        <BestTimesCard
          icon={faSun}
          color="#EC4899"
          title="Spring"
          description={springBestTimeTotravel}
        />
        <BestTimesCard
          icon={faUmbrellaBeach}
          color="#F59E0B"
          title="Summer"
          description={summerBestTimeToTravel}
        />
        <BestTimesCard
          icon={faLeaf}
          color="#F87315"
          title="Autumn"
          description={automnBestTimeToTravel}
        />
        <BestTimesCard
          icon={faSnowflake}
          color="#3B81F6"
          title="Winter"
          description={winterBestTimeToTravel}
        />
      </div>
    </section>
  );
};

export default BestTimes;
