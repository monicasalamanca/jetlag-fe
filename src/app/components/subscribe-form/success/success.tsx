import {
  faCat,
  faCheck,
  faHeartCrack,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import s from "./success.module.scss";

const Success = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className={s.container}>
      <div className={s.iconWrapper}>
        <FontAwesomeIcon icon={faCheck} className={s.icon} />
      </div>
      <h2 className={s.title}>
        Boom! Your message is <br></br>out in the wild
        <FontAwesomeIcon icon={faRocket} className={s.rocketIcon} />
      </h2>
      <p className={s.headline}>
        The internet gods have accepted your offering, and we&apos;ll get back
        to you faster than a cat spotting an open box
        <FontAwesomeIcon icon={faCat} className={s.catIcon} />
      </p>
      <p className={s.description}>
        This modal will disappear in a few seconds, unless you&apos;re too
        attached, in which case, you can manualy break it up with it:
      </p>
      <button
        aria-label="close now"
        type="button"
        className={s.closeNowButton}
        onClick={closeModal}
      >
        Close Now
        <FontAwesomeIcon icon={faHeartCrack} className={s.icon} />
      </button>
    </div>
  );
};

export default Success;
