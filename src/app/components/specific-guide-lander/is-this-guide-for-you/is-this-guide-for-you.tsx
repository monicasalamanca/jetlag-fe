// generate simple empty react component
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import s from "./is-this-guide-for-you.module.scss";

const IsThisGuideForYou = () => {
  return (
    <section className={s.isThisGuideForYou}>
      <div className={s.wrapper}>
        <h2>Is This Guide For You?</h2>
        <div className={s.points}>
          <div className={s.perfectForPoints}>
            <div className={s.title}>
              <FontAwesomeIcon className={s.icon} icon={faCheck} />
              <h3>Perfect For</h3>
            </div>
            <div className={s.pointsList}>
              <div>
                <FontAwesomeIcon className={s.icon} icon={faCheck} />
                <p>Individuals planning to move to Thailand</p>
              </div>
              <div>
                <FontAwesomeIcon className={s.icon} icon={faCheck} />
                <p>Expats seeking in-depth island living info</p>
              </div>
              <div>
                <FontAwesomeIcon className={s.icon} icon={faCheck} />
                <p>Long-term travelers wanting local insights</p>
              </div>
              <div>
                <FontAwesomeIcon className={s.icon} icon={faCheck} />
                <p>Digital nomads exploring Thailand&apos;s islands</p>
              </div>
            </div>
          </div>
          <div className={s.notForPoints}>
            <div className={s.title}>
              <FontAwesomeIcon
                className={s.icon + " " + s.notForIcon}
                icon={faXmark}
              />
              <h3>Not For</h3>
            </div>
            <div className={s.pointsList}>
              <div>
                <FontAwesomeIcon className={s.icon} icon={faXmark} />
                <p>Budget travelers on a tight budget</p>
              </div>
              <div>
                <FontAwesomeIcon className={s.icon} icon={faXmark} />
                <p>Short-term tourists visiting for a week</p>
              </div>
              <div>
                <FontAwesomeIcon className={s.icon} icon={faXmark} />
                <p>Travelers seeking only luxury options</p>
              </div>
              <div>
                <FontAwesomeIcon className={s.icon} icon={faXmark} />
                <p>Individuals uninterested in Thailand</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IsThisGuideForYou;
