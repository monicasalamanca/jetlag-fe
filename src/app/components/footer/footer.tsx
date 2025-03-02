import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import s from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footerContent}>
        <h3>Follow Us</h3>
        <div className={s.followUsLinks}>
          <Link
            className={s.followLink}
            href="https://twitter.com/jetlagchronicle"
          >
            <FontAwesomeIcon icon={faXTwitter} className={s.icon} />
          </Link>
          <Link
            className={s.followLink}
            href="https://twitter.com/jetlagchronicle"
          >
            <FontAwesomeIcon icon={faPinterest} className={s.icon} />
          </Link>

          <Link
            className={s.followLink}
            href="https://twitter.com/jetlagchronicle"
          >
            <FontAwesomeIcon icon={faInstagram} className={s.icon} />
          </Link>
          <Link
            className={s.followLink}
            href="https://twitter.com/jetlagchronicle"
          >
            <FontAwesomeIcon icon={faYoutube} className={s.icon} />
          </Link>
          <Link
            className={s.followLink}
            href="https://twitter.com/jetlagchronicle"
          >
            <FontAwesomeIcon icon={faFacebook} className={s.icon} />
          </Link>
        </div>
      </div>
      <div className={s.footerLinks}>
        <div className={s.year}>© 2025 The Jet Lag Chronicles</div>
        <div className={s.links}>
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
