import BestTimesCard from "./best-time-card/best-time-card";
import {
  faSnowflake,
  faSun,
  faLeaf,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";

import s from "./best-times.module.scss";

const BestTimes = () => {
  return (
    <section className={s.container}>
      <h1>Best Times to Travel</h1>
      <div className={s.wrapper}>
        <BestTimesCard
          icon={faSun}
          color="#EC4899"
          title="Spring"
          description="Mar-May: Cherry Blossoms, mild weather"
        />
        <BestTimesCard
          icon={faUmbrellaBeach}
          color="#F59E0B"
          title="Summer"
          description="Jun-Aug: Festivals, warm & humid"
        />
        <BestTimesCard
          icon={faLeaf}
          color="#F87315"
          title="Autumn"
          description="Sep-Nov: Fall colors, pleasant"
        />
        <BestTimesCard
          icon={faSnowflake}
          color="#3B81F6"
          title="Winter"
          description="Dec-Feb: Skiing, hot springs"
        />
      </div>
    </section>
  );
};

export default BestTimes;
