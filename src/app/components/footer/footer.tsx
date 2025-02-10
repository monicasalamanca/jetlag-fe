import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
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
            <FontAwesomeIcon icon={faXTwitter} size={"10x"} />
          </Link>
          <Link
            className={s.followLink}
            href="https://twitter.com/jetlagchronicle"
          >
            <FontAwesomeIcon icon={faInstagram} size={"10x"} />
          </Link>
          <Link
            className={s.followLink}
            href="https://twitter.com/jetlagchronicle"
          >
            <FontAwesomeIcon icon={faYoutube} size={"10x"} />
          </Link>
          <Link
            className={s.followLink}
            href="https://twitter.com/jetlagchronicle"
          >
            <FontAwesomeIcon icon={faFacebook} size={"10x"} />
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
