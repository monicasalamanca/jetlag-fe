import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";

import s from "./our-mission.module.scss";

const OurMission = () => {
  return (
    <section className={s.container}>
      <div className={s.wrapper}>
        <div className={s.iconWrapper}>
          <FontAwesomeIcon icon={faCompass} className={s.compassIcon} />
        </div>
        <h2>Our Mission</h2>
        <p>
          To help <b>Expats and Digital Nomads</b> find their ideal
          destinations, make smarter lifestyle choices, and prepare for a life
          abroad. By the way, by ideal destinations, we don’t mean your
          favorite. We are talking about the best cost of living, lifestyle, tax
          brackets, visa options, etc.
        </p>
      </div>
    </section>
  );
};

export default OurMission;
