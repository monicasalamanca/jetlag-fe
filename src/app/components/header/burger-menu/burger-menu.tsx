import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGlobe,
  faHouse,
  faLocationDot,
  faNewspaper,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { GroupedCountries } from "@/api/types";

import s from "./burger-menu.module.scss";

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

  return (
    <div className={s.burgerMenu}>
      <button className={s.burgerButton} onClick={toggleMenu}>
        <span className={s.burgerIcon}></span>
        <span className={s.burgerIcon}></span>
        <span className={s.burgerIcon}></span>
      </button>
      {isOpen && (
        <nav className={s.menu}>
          <ul>
            <li>
              <FontAwesomeIcon icon={faHouse} className={s.icon} />
              <Link href="/">Home</Link>
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
                            />
                            <Link href="/thailand">{country}</Link>
                          </li>
                        ))}
                      </ul>
                      {countries.length > 4 && (
                        <Link href="/" className={s.viewMore}>
                          View all 20 countries
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
            </li>
            <li>
              <FontAwesomeIcon icon={faUsers} className={s.icon} />
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faNewspaper} className={s.icon} />
              <Link href="/about-us">Blogs and Articles</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className={s.icon} />
              <Link href="/about-us">Contact Us</Link>
            </li>
          </ul>
          <footer>
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
          </footer>
        </nav>
      )}
    </div>
  );
};

export default BurgerMenu;
