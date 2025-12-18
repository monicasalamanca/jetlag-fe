import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faChartBar,
  faMap,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import s from "./what-you-will-find.module.scss";

const WhatYouWillFind = () => {
  return (
    <section id="what-youll-find" className={s.section}>
      <div className={s.container}>
        <h2>At The Jet Lag Chronicles, you&apos;ll find:</h2>
        <div className={s.grid}>
          <div className={s.card}>
            <div className={s.imageWrapper}>
              <FontAwesomeIcon
                icon={faPlane}
                className={`${s.icon} ${s.blue}`}
              />
            </div>
            <div className={s.wrapper}>
              <h3>First-hand experiences</h3>
              <p className={s.desc}>
                Real stories of life as expats and digital nomads
              </p>
            </div>
          </div>
          <div className={s.card}>
            <div className={s.imageWrapper}>
              <FontAwesomeIcon
                icon={faChartBar}
                className={`${s.icon} ${s.cyan}`}
              />
            </div>
            <div className={s.wrapper}>
              <h3>Cost-of-living breakdowns</h3>
              <p className={s.desc}>The real numbers, not fantasy</p>
            </div>
          </div>
          <div className={s.card}>
            <div className={s.imageWrapper}>
              <FontAwesomeIcon
                icon={faMap}
                className={`${s.icon} ${s.green}`}
              />
            </div>
            <div className={s.wrapper}>
              <h3>Destination guides</h3>
              <p className={s.desc}>Mix culture, lifestyle, and local hacks</p>
            </div>
          </div>
          <div className={s.card}>
            <div className={s.imageWrapper}>
              <FontAwesomeIcon
                icon={faUsers}
                className={`${s.icon} ${s.yellow}`}
              />
            </div>
            <div className={s.wrapper}>
              <h3>Community engagement</h3>
              <p className={s.desc}>
                Interactive quizzes and community input to keep it engaging
              </p>
            </div>
          </div>
        </div>
        <div className={s.bottomText}>
          <p>
            Because life is too short to stay put. “Let’s shoot for the moon! If
            we only get halfway there, so be it… better than working for The Man
            or dying 5 miles from where you were born.”
          </p>
          <p>Here’s to the adventurous! 🌍✈️</p>
        </div>
      </div>
    </section>
  );
};

export default WhatYouWillFind;
