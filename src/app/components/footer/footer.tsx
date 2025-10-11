"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import ContactForm from "../contact-form/contact-form";
import { trackLinkClick } from "@/app/utils/analytics";

import s from "./footer.module.scss";
import SubscribeForm from "../subscribe-form/subscribe-form";

const Footer = () => {
  const handleTwitterClick = () => {
    trackLinkClick({
      url: "https://x.com/thejetLaggers_X",
      text: "Twitter/X Follow Link",
      location: "Footer",
      link_type: "social",
    });
  };

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
                <SubscribeForm
                  buttonName="Subscribe"
                  showIcon={false}
                  trackEventName="footerDesktopMenu"
                />
              </li>
              <li>
                <Link
                  aria-label="Read more about us"
                  className={s.quickLink}
                  href="/about-us"
                  rel="canonical"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  aria-label="Read our privacy policy"
                  href="/privacy-policy"
                  rel="canonical"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  aria-label="Read our terms of service"
                  href="/terms-of-service"
                  rel="canonical"
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
                href="https://x.com/thejetLaggers_X"
                onClick={handleTwitterClick}
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
              href="https://x.com/thejetLaggers_X"
              onClick={handleTwitterClick}
            >
              <FontAwesomeIcon icon={faXTwitter} className={s.icon} />
            </a>
          </div>
        </div>
        <div className={s.footerLinks}>
          <SubscribeForm
            buttonName="Subscribe"
            showIcon={false}
            trackEventName="footerMobileMenu"
          />
          <ContactForm buttonName="Contact Us" showIcon />
          <div className={s.year}>© 2025 The Jet Lag Chronicles</div>
          <div className={s.links}>
            <Link
              aria-label="Read our privacy policy"
              href="/privacy-policy"
              rel="canonical"
              onClick={() =>
                trackLinkClick({
                  url: "/privacy-policy",
                  text: "Privacy Policy",
                  location: "footer",
                  link_type: "internal",
                })
              }
            >
              Privacy Policy
            </Link>
            <Link
              aria-label="Read our terms of service"
              href="/terms-of-service"
              rel="canonical"
              onClick={() =>
                trackLinkClick({
                  url: "/terms-of-service",
                  text: "Terms of Service",
                  location: "footer",
                  link_type: "internal",
                })
              }
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
