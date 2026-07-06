"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Destination, GroupedCountries } from "@/api/types";
import SubscribeForm from "../subscribe-form/subscribe-form";
import AnimatedBurgerIcon from "./burger-menu/animated-burger-icon";

import s from "./header.module.scss";

const BurgerMenu = dynamic(() => import("./burger-menu/burger-menu"), {
  ssr: false,
});
const Menu = dynamic(() => import("./menu/menu"), {
  ssr: false,
});

const Header: FC<{ destinations: Destination[] | null }> = ({
  destinations,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const groupedByContinent = destinations
    ? destinations.reduce((acc, destination) => {
        const { continent } = destination;
        if (!acc[continent]) {
          acc[continent] = [];
        }
        acc[continent].push(destination.name);
        return acc;
      }, {} as GroupedCountries)
    : null;

  // Lock body scroll when nav panel is open.
  // Uses a class rather than inline style so it doesn't conflict with
  // the Modal component's own scroll-lock (which uses inline style).
  useEffect(() => {
    document.body.classList.toggle("nav-open", isOpen);
    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [isOpen]);

  // Close panel on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      // Don't close if the click landed inside an open modal portal
      if (target.closest("[data-modal-portal]")) return;
      if (headerRef.current && !headerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // Close panel on Escape key, return focus to hamburger
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Close panel if viewport grows past the mobile breakpoint (e.g. orientation change)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 861) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <header ref={headerRef} className={s.header} id="siteHeader">
      <div className={s.inner}>
        {/* Logo */}
        <Link
          href="/"
          aria-label="The Jet Lag Chronicles — home"
          className={s.logoLink}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1783208863/blog-assets/tjlc-logo-white-font_btidni.png`}
            alt="The Jet Lag Chronicles"
            width={222}
            height={77}
            className={s.logoImage}
            priority
          />
        </Link>

        {/* Desktop nav (hidden on mobile) */}
        <Menu destinations={groupedByContinent} />

        {/* Desktop Debrief CTA (hidden on mobile) */}
        <SubscribeForm
          buttonName="Get The Debrief"
          showName={false}
          showIcon={false}
          trackEventName="debriefDesktop"
          buttonClassName={s.debriefCta}
        >
          <svg
            width="16"
            height="16"
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

        {/* Mobile controls: Debrief icon + hamburger (hidden on desktop) */}
        <div className={s.mobileControls}>
          <SubscribeForm
            buttonName="Get The Debrief"
            showName={false}
            showIcon={false}
            trackEventName="debriefMobile"
            buttonClassName={s.mobileDebriefIcon}
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
          </SubscribeForm>
          <button
            ref={hamburgerRef}
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobilePanel"
            className={s.hamburger}
            onClick={toggle}
          >
            <AnimatedBurgerIcon isOpen={isOpen} />
          </button>
        </div>
      </div>

      {/* Mobile slide-down panel */}
      <BurgerMenu
        destinations={groupedByContinent}
        isOpen={isOpen}
        onClose={close}
      />
    </header>
  );
};

export default Header;
