// generate simple empty react component
"use client";

import { DetailedGuide } from "@/api/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import s from "./is-this-guide-for-you.module.scss";

interface GuidePresentationProps {
  guide: DetailedGuide;
}

const IsThisGuideForYou = ({ guide }: GuidePresentationProps) => {
  // Hide section if both arrays are empty or missing
  if (
    (!guide.whoFor || guide.whoFor.length === 0) &&
    (!guide.whoNotFor || guide.whoNotFor.length === 0)
  ) {
    return null;
  }

  return (
    <section className={s.isThisGuideForYou}>
      <div className={s.wrapper}>
        <h2>Is This Guide For You?</h2>
        <div className={s.points}>
          {guide.whoFor && guide.whoFor.length > 0 && (
            <div className={s.perfectForPoints}>
              <div className={s.title}>
                <FontAwesomeIcon className={s.icon} icon={faCheck} />
                <h3>Perfect For</h3>
              </div>
              <div className={s.pointsList}>
                {guide.whoFor.map((item) => (
                  <div key={item.id}>
                    <FontAwesomeIcon className={s.icon} icon={faCheck} />
                    <p>{item.whoFor}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {guide.whoNotFor && guide.whoNotFor.length > 0 && (
            <div className={s.notForPoints}>
              <div className={s.title}>
                <FontAwesomeIcon
                  className={s.icon + " " + s.notForIcon}
                  icon={faXmark}
                />
                <h3>Not For</h3>
              </div>
              <div className={s.pointsList}>
                {guide.whoNotFor.map((item) => (
                  <div key={item.id}>
                    <FontAwesomeIcon className={s.icon} icon={faXmark} />
                    <p>{item.whoNotFor}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IsThisGuideForYou;
