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
        Oops! your message <br></br>tripped into a wire
        <FontAwesomeIcon icon={faCircle} className={s.circleIcon} />
      </h2>
      <p className={s.headline}>
        Something went wrong, and your message is currently wandering the void.
        Maybe try again? Or bribe your WiFi with a kind word?
      </p>
      <p className={s.description}>
        Don&apos;t worry, even the best messages stumble sometimes!
      </p>
      <button type="submit" className={s.closeNowButton} onClick={tryAgain}>
        Let&apos;s Try Again
        <FontAwesomeIcon icon={faRotateRight} className={s.icon} />
      </button>
    </div>
  );
};

export default Error;
