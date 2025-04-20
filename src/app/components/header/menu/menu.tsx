import { FC } from "react";
import Link from "next/link";
import NavLink from "./nav-link/nav-link";
import { GroupedCountries } from "@/api/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia } from "@fortawesome/free-solid-svg-icons";

import s from "./menu.module.scss";

const Menu: FC<{ destinations: GroupedCountries | null }> = ({
  destinations,
}) => {
  const capitalize = (country: string) => {
    if (!country) return "";
    return country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
  };
  return (
    <nav className={s.container}>
      <ul>
        <li>
          <NavLink href="/" name="home">
            Home
          </NavLink>
        </li>
        <li>
          <div className={s.menuItem}>
            Destinations
            <div className={s.destinations}>
              <div className={s.destinationsWrapper}>
                {destinations &&
                  Object.entries(destinations).map(([continent, countries]) => (
                    <div className={s.continent} key={continent}>
                      <div className={s.wrapper}>
                        <h3>
                          <FontAwesomeIcon
                            icon={faEarthAsia}
                            className={s.icon}
                          />
                          {continent}
                        </h3>
                        <ul>
                          {countries.map((country) => (
                            <li key={country}>
                              <Link
                                aria-label={`Read more about ${country}`}
                                href={`/${country.replace(" ", "-")}`}
                              >
                                {capitalize(country)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
              </div>
              {/* <div className={s.popularDestinations}>
                <Link href="/" className={s.viewAll}>
                  View All Destinations
                  <FontAwesomeIcon icon={faArrowRight} className={s.icon} />
                </Link>
              </div> */}
            </div>
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
      </ul>
    </nav>
  );
};

export default Menu;
