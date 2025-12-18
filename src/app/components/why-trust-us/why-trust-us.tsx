import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faCheck } from "@fortawesome/free-solid-svg-icons";

import s from "./why-trust-us.module.scss";

const WhyTrustUs = () => {
  return (
    <section id="why-trust-us" className={s.section}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.header}>
            <div className={s.iconWrapper}>
              <FontAwesomeIcon icon={faLock} className={s.lockIcon} />
            </div>
            <h2>Why Trust Us?</h2>
          </div>
          <div className={s.grid}>
            <div className={s.card}>
              <div className={s.checkIconWrapper}>
                <FontAwesomeIcon icon={faCheck} className={s.checkIcon} />
              </div>
              <div className={s.cardContent}>
                <h3>Real experience</h3>
                <p>
                  We&apos;ve lived and worked across multiple countries and it
                  only continues.
                </p>
              </div>
            </div>
            <div className={s.card}>
              <div className={s.checkIconWrapper}>
                <FontAwesomeIcon icon={faCheck} className={s.checkIcon} />
              </div>
              <div className={s.cardContent}>
                <h3>Transparency</h3>
                <p>
                  No sugarcoating. We hate that! We provide information we wish
                  someone would show us.
                </p>
              </div>
            </div>
            <div className={s.card}>
              <div className={s.checkIconWrapper}>
                <FontAwesomeIcon icon={faCheck} className={s.checkIcon} />
              </div>
              <div className={s.cardContent}>
                <h3>Independent voices</h3>
                <p>
                  We&apos;re not sponsored to push destinations. If we love a
                  place, you&apos;ll know why.
                </p>
              </div>
            </div>
            <div className={s.card}>
              <div className={s.checkIconWrapper}>
                <FontAwesomeIcon icon={faCheck} className={s.checkIcon} />
              </div>
              <div className={s.cardContent}>
                <h3>Community-driven</h3>
                <p>Quizzes and guides shaped by expats and nomads worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;
