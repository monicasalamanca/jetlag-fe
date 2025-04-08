import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faHouse,
  faLocationDot,
  faPaperPlane,
  // faNewspaper,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  // faFacebook,
  // faInstagram,
  // faPinterest,
  faXTwitter,
  // faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { GroupedCountries } from "@/api/types";

import s from "./burger-menu.module.scss";
import ContactForm from "@/components/contact-form/contact-form";

const BurgerMenu: FC<{ destinations: GroupedCountries | null }> = ({
  destinations,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
        arial-label={isOpen ? "close menu" : "open menu"}
        aria-expanded={isOpen}
        className={s.burgerButton}
        onClick={toggleMenu}
      >
        <span className={`${s.burgerIcon} ${s.srOnly}`}>Open menu</span>
        <span className={s.burgerIcon}></span>
        <span className={s.burgerIcon}></span>
      </button>
      {isOpen && (
        <nav className={s.menu}>
          <ul>
            <li>
              <FontAwesomeIcon icon={faHouse} className={s.icon} />
              <Link aria-label="Go to home page" href="/" onClick={closeMenu}>
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
                      <h3>{continent}</h3>
                      <ul>
                        {countries.map((country) => (
                          <li key={country}>
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              className={s.icon}
                              onClick={closeMenu}
                            />
                            <Link
                              aria-label={`Go to ${country} page`}
                              href={`/${country}`}
                              onClick={closeMenu}
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
                onClick={closeMenu}
              >
                About Us
              </Link>
            </li>
            <li>
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
        </nav>
      )}
    </div>
  );
};

export default BurgerMenu;
