import { useState } from "react";
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

import s from "./burger-menu.module.scss";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
              <div className={s.continent}>
                <div className={s.wrapper}>
                  <h3>Asia Pacific</h3>
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className={s.icon}
                      />
                      <Link href="/thailand">Thailand</Link>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className={s.icon}
                      />
                      <Link href="/japan">Japan</Link>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className={s.icon}
                      />
                      <Link href="/indonesia">Indonesia</Link>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className={s.icon}
                      />
                      <Link href="/vietnam">Vietnam</Link>
                    </li>
                  </ul>
                  <Link href="/" className={s.viewMore}>
                    View all 20 countries
                  </Link>
                </div>
              </div>
              <div className={s.continent}>
                <div className={s.wrapper}>
                  <h3>Europe</h3>
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className={s.icon}
                      />
                      <Link href="/thailand">Portugal</Link>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className={s.icon}
                      />
                      <Link href="/japan">Spain</Link>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className={s.icon}
                      />
                      <Link href="/indonesia">Croatia</Link>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className={s.icon}
                      />
                      <Link href="/vietnam">Greece</Link>
                    </li>
                  </ul>
                  <Link href="/" className={s.viewMore}>
                    View all 20 countries
                  </Link>
                </div>
              </div>
              <div className={s.continent}>
                <div className={s.wrapper}>
                  <h3>Americas</h3>
                  <ul>
                    <li>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className={s.icon}
                      />
                      <Link href="/thailand">Mexico</Link>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className={s.icon}
                      />
                      <Link href="/japan">Colombia</Link>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className={s.icon}
                      />
                      <Link href="/indonesia">Brasil</Link>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className={s.icon}
                      />
                      <Link href="/vietnam">Costa Rica</Link>
                    </li>
                  </ul>
                  <Link href="/" className={s.viewMore}>
                    View all 20 countries
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <FontAwesomeIcon icon={faUsers} className={s.icon} />
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faNewspaper} className={s.icon} />
              <Link href="/about">Blogs and Articles</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className={s.icon} />
              <Link href="/contact">Contact Us</Link>
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
