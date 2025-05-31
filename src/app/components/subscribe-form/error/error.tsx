import {
  faCircle,
  faExclamation,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import s from "./error.module.scss";

const Error = ({ tryAgain }: { tryAgain: () => void }) => {
  return (
    <div className={s.container}>
      <div className={s.iconWrapper}>
        <FontAwesomeIcon icon={faExclamation} className={s.icon} />
      </div>
      <h2 className={s.title}>
        Grounded Before Takeoff
        <FontAwesomeIcon icon={faCircle} className={s.circleIcon} />
      </h2>
      <p className={s.headline}>Well, that didn&apos;t fly.</p>
      <p className={s.description}>
        Something glitched while signing you up. Refresh, retry, or offer your
        router a peace offering (maybe a cookie?).
      </p>
      <button
        aria-label="try again"
        type="button"
        className={s.closeNowButton}
        onClick={tryAgain}
      >
        Let&apos;s Try Again
        <FontAwesomeIcon icon={faRotateRight} className={s.icon} />
      </button>
    </div>
  );
};

export default Error;
