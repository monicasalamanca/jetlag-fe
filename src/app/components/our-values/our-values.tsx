import ValuesCard from "./values-card/values-card";
import {
  faHeart,
  faLightbulb,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

import s from "./our-values.module.scss";

const OurValues = () => {
  return (
    <section className={s.container}>
      <h1>Our Values</h1>
      <ValuesCard
        icon={faHeart}
        color="#FF6B6B"
        headline="Community First"
        description="Building connections across borders"
      />
      <ValuesCard
        icon={faLightbulb}
        color="#FFD83D"
        headline="Innovation"
        description="Constantly improving our services"
      />
      <ValuesCard
        icon={faShieldHalved}
        color="#6B5CE7"
        headline="Trust & Security"
        description="Realiable information you can count on"
      />
    </section>
  );
};

export default OurValues;
