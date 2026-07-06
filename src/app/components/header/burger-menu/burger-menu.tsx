"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { GroupedCountries } from "@/api/types";
import ContactForm from "@/components/contact-form/contact-form";
import SubscribeForm from "../../subscribe-form/subscribe-form";

import s from "./burger-menu.module.scss";

interface BurgerMenuProps {
  destinations: GroupedCountries | null;
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Chronicles" },
  { href: "/lifestyle", label: "Lifestyle" },
  { href: "/about-us", label: "About Us" },
];

const BurgerMenu: FC<BurgerMenuProps> = ({ destinations, isOpen, onClose }) => {
  const [openContinent, setOpenContinent] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleContinent = (continent: string) => {
    setOpenContinent((prev) => (prev === continent ? null : continent));
  };

  return (
    <nav
      id="mobilePanel"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
      className={`${s.panel} ${isOpen ? s.panelOpen : ""}`}
    >
      <div className={s.panelInner}>
        <ul className={s.navList}>
          {/* Destinations with continent accordion */}
          {destinations && (
            <li className={s.destinationSection}>
              <div className={s.destinationHeader}>
                <span>Destinations</span>
              </div>
              {Object.entries(destinations).map(([continent, countries]) => {
                if (countries.length === 0) return null;
                const isExpanded = openContinent === continent;
                const continentId = `panel-continent-${continent}`;
                const countriesId = `panel-countries-${continent}`;
                return (
                  <div key={continent}>
                    <button
                      id={continentId}
                      type="button"
                      className={s.continentBtn}
                      aria-expanded={isExpanded}
                      aria-controls={countriesId}
                      onClick={() => toggleContinent(continent)}
                    >
                      <span>
                        {continent.charAt(0).toUpperCase() +
                          continent.slice(1).toLowerCase()}
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`${s.caret} ${isExpanded ? s.caretOpen : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      id={countriesId}
                      role="region"
                      aria-labelledby={continentId}
                      className={`${s.countriesList} ${isExpanded ? s.countriesListOpen : ""}`}
                    >
                      <div className={s.countriesInner}>
                        <ul>
                          {countries.map((country) => (
                            <li key={country}>
                              <Link
                                href={`/${country.replace(/ /g, "-").toLowerCase()}`}
                                onClick={onClose}
                                aria-label={`Go to ${country} page`}
                              >
                                {country.charAt(0).toUpperCase() +
                                  country.slice(1)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </li>
          )}

          {/* Regular nav links */}
          {navLinks.map((link) => (
            <li
              key={link.href}
              className={[s.navItem, pathname === link.href ? s.active : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <Link href={link.href} onClick={onClose} rel="canonical">
                {link.label}
              </Link>
            </li>
          ))}

          {/* Contact Us — opens modal, styled like a nav item */}
          <li className={`${s.navItem} ${s.noBorder}`}>
            <ContactForm
              buttonName="Contact Us"
              showIcon={false}
              className={s.navContactBtn}
            />
          </li>
        </ul>

        {/* Debrief CTA */}
        <SubscribeForm
          buttonName="Get The Debrief"
          showName={false}
          showIcon={false}
          trackEventName="debriefMobilePanel"
          buttonClassName={s.panelDebrief}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 7l10 7 10-7" />
          </svg>
          <span className={s.debriefMain}>GET THE DEBRIEF</span>
        </SubscribeForm>

        {/* Social links */}
        <div className={s.socialLinks}>
          <a
            aria-label="Follow us on X"
            href="https://x.com/thejetLaggers_X"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
          <a
            aria-label="Follow us on Facebook"
            href="https://www.facebook.com/thejetlaggersfb"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            aria-label="Follow us on Instagram"
            href="https://www.instagram.com/thejetlaggers_ig"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default BurgerMenu;
