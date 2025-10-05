import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEnvelope,
  faGlobe,
  faHouse,
  faInbox,
  faPaperPlane,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { GroupedCountries } from "@/api/types";
import ContactForm from "@/components/contact-form/contact-form";
import SubscribeForm from "../../subscribe-form/subscribe-form";

import s from "./burger-menu.module.scss";

const BurgerMenu: FC<{ destinations: GroupedCountries | null }> = ({
  destinations,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAlreadySubscribed, setHasAlreadySubscribed] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Check subscription status from localStorage on component mount
  useEffect(() => {
    try {
      const subscriptionStatus = localStorage.getItem(
        "hasSubscribedToDownload",
      );
      if (subscriptionStatus === "true") {
        setHasAlreadySubscribed(true);
      }
    } catch (error) {
      console.warn("Failed to check subscription status:", error);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(s.noScroll);
    } else {
      document.body.classList.remove(s.noScroll);
    }
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={s.burgerMenu}>
      <button
        type="button"
        aria-label={isOpen ? "close menu" : "open menu"}
        aria-expanded={isOpen}
        className={s.burgerButton}
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faBars} className={s.icon} />
      </button>
      {isOpen && (
        <nav className={`${s.backdrop} ${isOpen ? s.open : ""}`}>
          <div className={`${s.menuWrapper} ${isOpen ? s.open : ""}`}>
            <ul>
              <li className={s.closeMenu}>
                <button className={s.closeBtn} onClick={closeMenu}>
                  <FontAwesomeIcon icon={faXmark} className={s.icon} />
                </button>
              </li>
              <li>
                <FontAwesomeIcon icon={faHouse} className={s.icon} />
                <Link
                  aria-label="Go to home page"
                  href="/"
                  onClick={closeMenu}
                  rel="canonical"
                >
                  Home
                </Link>
              </li>
              <li className={s.destinationSection}>
                <div className={s.destinationsWrapper}>
                  <FontAwesomeIcon icon={faGlobe} className={s.icon} />
                  <h2>Destinations</h2>
                </div>
                {destinations &&
                  Object.entries(destinations).map(([continent, countries]) => (
                    <div className={s.continent} key={continent}>
                      <div className={s.wrapper}>
                        <h3>
                          {continent.charAt(0).toUpperCase() +
                            continent.slice(1).toLowerCase()}
                        </h3>
                        <ul>
                          {countries.map((country) => (
                            <li key={country}>
                              <Link
                                aria-label={`Go to ${country} page`}
                                href={`/${country}`}
                                onClick={closeMenu}
                                rel="canonical"
                              >
                                {country}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {countries.length > 4 && (
                          <Link
                            aria-label="view all countries"
                            href="/"
                            className={s.viewMore}
                            rel="canonical"
                          >
                            View all 20 countries
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
              </li>
              <li>
                <FontAwesomeIcon icon={faPaperPlane} className={s.icon} />
                <Link
                  aria-label="Read all our chronicles"
                  href="/blog"
                  rel="canonical"
                  onClick={closeMenu}
                >
                  Chronicles
                </Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faUsers} className={s.icon} />
                <Link
                  aria-label="Read more about us"
                  href="/about-us"
                  rel="canonical"
                  onClick={closeMenu}
                >
                  About Us
                </Link>
              </li>
              {!hasAlreadySubscribed && (
                <li className={s.subscribe}>
                  <FontAwesomeIcon icon={faInbox} className={s.icon} />
                  <SubscribeForm
                    buttonName="Subscribe"
                    showIcon={false}
                    trackEventName="mobileMenu"
                  />
                </li>
              )}
              <li>
                <FontAwesomeIcon icon={faEnvelope} className={s.icon} />
                <ContactForm buttonName="Contact Us" showIcon={false} />
              </li>
            </ul>
            <footer>
              <div className={s.followUsLinks}>
                <a
                  aria-label="Follow us on x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.followLink}
                  href="https://twitter.com/the_jetlaggers"
                  onClick={closeMenu}
                >
                  <FontAwesomeIcon icon={faXTwitter} className={s.icon} />
                </a>
              </div>
            </footer>
          </div>
        </nav>
      )}
    </div>
  );
};

export default BurgerMenu;
