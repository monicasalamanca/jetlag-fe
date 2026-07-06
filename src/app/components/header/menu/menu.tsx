"use client";

import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import NavLink from "./nav-link/nav-link";
import { GroupedCountries } from "@/api/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import s from "./menu.module.scss";

const Menu: FC<{ destinations: GroupedCountries | null }> = ({
  destinations,
}) => {
  const [isDestinationsMenuOpen, setIsDestinationsMenuOpen] = useState(false);
  const [openContinent, setOpenContinent] = useState<string | null>(null);
  const menuRef = useRef<HTMLLIElement>(null);

  const capitalize = (country: string) => {
    if (!country) return "";
    return country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
  };

  const toggleContinent = (continent: string) => {
    setOpenContinent((prev) => (prev === continent ? null : continent));
  };

  const closeAll = () => {
    setIsDestinationsMenuOpen(false);
    setOpenContinent(null);
  };

  useEffect(() => {
    if (!isDestinationsMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDestinationsMenuOpen]);

  return (
    <nav className={s.container} aria-label="Primary navigation">
      <ul>
        <li ref={menuRef} className={s.dropdown} tabIndex={0}>
          {/* Trigger */}
          <div
            className={s.menuItem}
            onClick={() => {
              if (isDestinationsMenuOpen) closeAll();
              else setIsDestinationsMenuOpen(true);
            }}
          >
            Destinations
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`${s.icon} ${isDestinationsMenuOpen ? s.iconOpen : ""}`}
              aria-hidden="true"
            />
          </div>

          {/* Dropdown panel — accordion, same pattern as burger menu */}
          {isDestinationsMenuOpen && destinations && (
            <div className={s.destinations}>
              {Object.entries(destinations).map(([continent, countries]) => {
                if (countries.length === 0) return null;
                const isExpanded = openContinent === continent;
                const continentId = `desktop-continent-${continent}`;
                const countriesId = `desktop-countries-${continent}`;
                return (
                  <div key={continent}>
                    <button
                      id={continentId}
                      type="button"
                      className={s.continentBtn}
                      aria-expanded={isExpanded}
                      aria-controls={countriesId}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleContinent(continent);
                      }}
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
                                onClick={closeAll}
                                aria-label={`Go to ${country} page`}
                              >
                                {capitalize(country)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </li>

        <li>
          <NavLink href="/guides" name="guides">
            Guides
          </NavLink>
        </li>
        <li>
          <NavLink href="/blog" name="chronicles">
            Chronicles
          </NavLink>
        </li>
        <li>
          <NavLink href="/lifestyle" name="lifestyle">
            Lifestyle
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
