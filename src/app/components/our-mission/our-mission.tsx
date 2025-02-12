import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";

import s from "./our-mission.module.scss";

const OurMission = () => {
  return (
    <section className={s.container}>
      <FontAwesomeIcon
        icon={faCompass}
        className={s.compassIcon}
        style={{ color: "#3A78FC" }}
      />
      <h2>Our Mission</h2>
      <p>
        To help Expats and Digital Nomads find their ideal destinations and
        build thriving communities worldwide
      </p>
    </section>
  );
};

export default OurMission;
