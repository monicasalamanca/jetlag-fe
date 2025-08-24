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
        Almost there!
        <FontAwesomeIcon icon={faRocket} className={s.rocketIcon} />
      </h2>
      <p className={s.headline}>
        We just sent you an email to confirm your subscription. Hit that button,
        and we&apos;ll send the good stuff straight to your inbox — free guides,
        tips, and sunshine.
        <FontAwesomeIcon icon={faCat} className={s.catIcon} />
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
