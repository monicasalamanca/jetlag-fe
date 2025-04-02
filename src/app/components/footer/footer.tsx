import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import ContactForm from "../contact-form/contact-form";

import s from "./footer.module.scss";

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
                <Link
                  aria-label="Read more about us"
                  className={s.quickLink}
                  href="/about-us"
                  prefetch={false}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  aria-label="Read our privacy policy"
                  href="/privacy-policy"
                  prefetch={false}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  aria-label="Read our terms of service"
                  href="/terms-of-service"
                  prefetch={false}
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <ContactForm buttonName="Contact Us" showIcon />
              </li>
            </ul>
          </div>
          <div className={s.itemList}>
            <h3>Follow Us</h3>
            <div className={s.followUsLinks}>
              <a
                className={s.followLink}
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/the_jetlaggers"
              >
                <FontAwesomeIcon icon={faXTwitter} className={s.icon} />
              </a>
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
            <a
              aria-label="Follow us on x"
              target="_blank"
              rel="noopener noreferrer"
              className={s.followLink}
              href="https://twitter.com/the_jetlaggers"
            >
              <FontAwesomeIcon icon={faXTwitter} className={s.icon} />
            </a>
          </div>
        </div>
        <div className={s.footerLinks}>
          <ContactForm buttonName="Contact Us" showIcon />
          <div className={s.year}>© 2025 The Jet Lag Chronicles</div>
          <div className={s.links}>
            <Link
              aria-label="Read our privacy policy"
              href="/privacy-policy"
              prefetch={false}
            >
              Privacy Policy
            </Link>
            <Link
              aria-label="Read our terms of service"
              href="/terms-of-service"
              prefetch={false}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
