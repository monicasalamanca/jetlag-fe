import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faFacebook,
  // faInstagram,
  // faPinterest,
  faXTwitter,
  // faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import s from "./footer.module.scss";
import ContactForm from "../contact-form/contact-form";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.desktopFooter}>
        <div className={s.top}>
          <div className={s.itemList}>
            <h3>The Jet Lag Chronicles</h3>
            <p>
              Your trusted companion for navigating the world as a global
              citizen.
            </p>
          </div>
          <div className={s.itemList}>
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link className={s.quickLink} href="/about-us">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <ContactForm buttonName="Contact Us" showIcon />
              </li>
            </ul>
          </div>
          <div className={s.itemList}>
            <h3>Follow Us</h3>
            <div className={s.followUsLinks}>
              <Link
                className={s.followLink}
                href="https://twitter.com/the_jetlaggers"
              >
                <FontAwesomeIcon icon={faXTwitter} className={s.icon} />
              </Link>
              {/* <Link
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
              </Link> */}
            </div>
          </div>
        </div>
        <div className={s.bottom}>
          &copy; 2025 The Jet Lag Chronicles. All rights reserved.
        </div>
      </div>
      <div className={s.mobileFooter}>
        <div className={s.footerContent}>
          <h3>Follow Us</h3>
          <div className={s.followUsLinks}>
            <Link
              className={s.followLink}
              href="https://twitter.com/the_jetlaggers"
            >
              <FontAwesomeIcon icon={faXTwitter} className={s.icon} />
            </Link>
            {/* <Link
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
            </Link> */}
          </div>
        </div>
        <div className={s.footerLinks}>
          <div className={s.year}>© 2025 The Jet Lag Chronicles</div>
          <div className={s.links}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
