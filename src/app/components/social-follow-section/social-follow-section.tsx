"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import ContactForm from "../contact-form/contact-form";
import { trackLinkClick } from "@/app/utils/analytics";
import s from "./social-follow-section.module.scss";

const DEFAULT_IMAGE_URL = `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1772176092/blog-assets/social-media-follow-us_j7wcya.jpg`;
const IMAGE_ALT = "The Jet Lag Chronicles team on the road";

const SOCIAL_LINKS = [
  {
    label: "X / Twitter",
    href: "https://x.com/thejetLaggers_X",
    icon: faXTwitter,
    ariaLabel: "Follow us on X / Twitter",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/thejetlaggers_ig",
    icon: faInstagram,
    ariaLabel: "Follow us on Instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/thejetlaggersfb",
    icon: faFacebookF,
    ariaLabel: "Follow us on Facebook",
  },
];

export interface SocialFollowSectionProps {
  teamImageSrc?: string;
  aboutHref?: string;
}

const SocialFollowSection: FC<SocialFollowSectionProps> = ({
  teamImageSrc = DEFAULT_IMAGE_URL,
  aboutHref = "/about-us",
}) => {
  return (
    <section
      className={s.section}
      aria-label="Follow us and learn more about us"
    >
      <div className={s.container}>
        <div className={s.layout}>
          {/* Left — Copy */}
          <div className={s.copy}>
            <p className={s.eyebrow}>Follow the Journey</p>
            <h2 className={s.heading}>
              Come <span className={s.accent}>Slowmad</span>
              <br />
              With Us
            </h2>
            <p className={s.description}>
              The Jet Lag Chronicles breaks down the real side of life abroad —
              cost of living, tax arbitrage, visas, strategy, mistakes, and the
              daily reality of building a life across borders. Meet the team and
              follow the journey.
            </p>
            <div className={s.ctaRow}>
              <Link
                href={aboutHref}
                className={s.ctaPrimary}
                onClick={() =>
                  trackLinkClick({
                    url: aboutHref,
                    text: "More About Us",
                    location: "SocialFollowSection",
                    link_type: "internal",
                  })
                }
              >
                More About Us
              </Link>
              <ContactForm
                buttonName="Work With Us"
                showIcon={false}
                className={s.workWithUsBtn}
              />
            </div>
            <div className={s.taglineWrapper}>
              <p className={s.tagline}>
                Independent · No Tourism Board Influence
                <br />
                Real People · Real Experiences · Built for the Long Haul
              </p>
            </div>
          </div>

          {/* Right — Visual Panel */}
          <div className={s.panel}>
            <div className={s.photoFrame}>
              <Image
                src={teamImageSrc}
                alt={IMAGE_ALT}
                fill
                className={s.photo}
                sizes="(max-width: 1024px) 100vw, 540px"
              />
              <span className={s.photoCaption}>
                The Jet Lag Chronicles — The Jetlaggers on the Road
              </span>
            </div>
            <div className={s.platforms}>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.platformBtn}
                  aria-label={link.ariaLabel}
                  onClick={() =>
                    trackLinkClick({
                      url: link.href,
                      text: `${link.label} Follow Link`,
                      location: "SocialFollowSection",
                      link_type: "social",
                    })
                  }
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    aria-hidden="true"
                    className={s.platformIcon}
                  />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialFollowSection;
