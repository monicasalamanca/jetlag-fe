import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import NavLink from "./nav-link/nav-link";
import SubscribeForm from "../../subscribe-form/subscribe-form";
import { GroupedCountries } from "@/api/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import s from "./menu.module.scss";

const Menu: FC<{ destinations: GroupedCountries | null }> = ({
  destinations,
}) => {
  const [isDestinationsMenuOpen, setIsDestinationsMenuOpen] = useState(false);
  const [hasAlreadySubscribed, setHasAlreadySubscribed] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const capitalize = (country: string) => {
    if (!country) return "";
    return country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
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
    if (!isDestinationsMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDestinationsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDestinationsMenuOpen]);

  return (
    <nav className={s.container}>
      <ul>
        <li>
          <NavLink href="/" name="home">
            Home
          </NavLink>
        </li>
        <li
          ref={menuRef}
          className={s.dropdown}
          onClick={() => setIsDestinationsMenuOpen((prev) => !prev)}
          tabIndex={0}
        >
          <div className={s.menuItem}>
            Destinations
            <FontAwesomeIcon
              icon={isDestinationsMenuOpen ? faChevronUp : faChevronDown}
              className={s.icon}
            />
            {isDestinationsMenuOpen && (
              <div className={s.destinations}>
                <div className={s.destinationsWrapper}>
                  {destinations &&
                    Object.entries(destinations).map(
                      ([continent, countries]) => (
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
                                    aria-label={`Read more about ${country}`}
                                    href={`/${country.replace(" ", "-")}`}
                                    rel="canonical"
                                  >
                                    {capitalize(country)}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ),
                    )}
                </div>
              </div>
            )}
          </div>
        </li>
        <li>
          <NavLink href="/blog" name="chronicles">
            Chronicles
          </NavLink>
        </li>
        <li>
          <NavLink href="/about-us" name="about us">
            About Us
          </NavLink>
        </li>
        {!hasAlreadySubscribed && (
          <li className={s.subscribe}>
            <SubscribeForm
              buttonName="Subscribe"
              showIcon={false}
              trackEventName="desktopMenu"
            />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
