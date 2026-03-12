"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faXTwitter,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import ContactForm from "../contact-form/contact-form";
import { trackLinkClick } from "@/app/utils/analytics";
import s from "./social-follow-section.module.scss";

export interface SocialLinkConfig {
  name: string;
  url: string;
  icon: IconDefinition;
  ariaLabel: string;
  /** Official brand color for the icon */
  color: string;
  /** Set to false to hide this social link */
  show?: boolean;
}

export interface SocialFollowSectionProps {
  /** Section title */
  title?: string;
  /** Short body text below the title */
  text?: string;
  /** Additional body text below the first paragraph */
  subText?: string;
  /** Cloudinary image URL for the left-side image */
  imageUrl?: string;
  /** URL for the "More About Us" CTA link */
  aboutUsUrl?: string;
  /** Show / hide the "More About Us" link */
  showAboutUs?: boolean;
  /** Show / hide the "Work With Us" ContactForm CTA */
  showContactForm?: boolean;
  /**
   * List of social platforms to render.
   * Defaults to Twitter/X, Facebook and Instagram.
   * Set `show: false` on any entry to hide it.
   * Pass additional entries to extend.
   */
  socialLinks?: SocialLinkConfig[];
}

const DEFAULT_SOCIAL_LINKS: SocialLinkConfig[] = [
  {
    name: "Twitter",
    url: "https://x.com/thejetLaggers_X",
    icon: faXTwitter,
    ariaLabel: "Follow us on Twitter / X",
    color: "#000000",
    show: true,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/thejetlaggersfb",
    icon: faFacebookF,
    ariaLabel: "Follow us on Facebook",
    color: "#1877F2",
    show: true,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/thejetlaggers_ig",
    icon: faInstagram,
    ariaLabel: "Follow us on Instagram",
    color: "#E1306C",
    show: true,
  },
];

const IMAGE_URL =
  "https://res.cloudinary.com/jetlagchronicles/image/upload/v1772176092/blog-assets/social-media-follow-us_j7wcya.jpg";
const IMAGE_ALT = "The Jet Lag Chronicles team – follow us on social media";

/**
 * SocialFollowSection
 *
 * Reusable section to promote the About Us page and social media channels.
 * Renders a left-side image alongside a column of title, body text,
 * CTA links and social icons with tracked analytics clicks.
 *
 * All content and visibility are configurable via props.
 */
const SocialFollowSection: FC<SocialFollowSectionProps> = ({
  title = "Come slowmad with us",
  text = "The Jet Lag Chronicles breaks down the real side of life abroad. Cost of living, tax arbitrage, visas, strategy, mistakes, and the daily reality of building a life across borders.",
  subText = "Meet the team and follow the journey on your favorite platform.",
  imageUrl = IMAGE_URL,
  aboutUsUrl = "/about-us",
  showAboutUs = true,
  showContactForm = true,
  socialLinks = DEFAULT_SOCIAL_LINKS,
}) => {
  const visibleSocials = socialLinks.filter((s) => s.show !== false);

  return (
    <section
      className={s.section}
      aria-label="Follow us and learn more about us"
    >
      <div className={s.imageWrapper}>
        <Image
          src={imageUrl}
          alt={IMAGE_ALT}
          width={400}
          height={400}
          className={s.image}
        />
      </div>

      <div className={s.content}>
        <h2 className={s.title}>{title}</h2>
        <p className={s.text}>{text}</p>
        <p className={s.text}>{subText}</p>

        {(showAboutUs || showContactForm) && (
          <div className={s.ctas}>
            {showAboutUs && (
              <Link
                href={aboutUsUrl}
                className={s.ctaLink}
                aria-label="Learn more about The Jet Lag Chronicles team"
                onClick={() =>
                  trackLinkClick({
                    url: aboutUsUrl,
                    text: "More About Us",
                    location: "SocialFollowSection",
                    link_type: "internal",
                  })
                }
              >
                More About Us
              </Link>
            )}

            {showContactForm && (
              <ContactForm
                buttonName="Work With Us"
                showIcon={false}
                className={s.workWithUsBtn}
              />
            )}
          </div>
        )}

        {visibleSocials.length > 0 && (
          <div className={s.socials}>
            {visibleSocials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={s.socialLink}
                aria-label={social.ariaLabel}
                style={{ color: social.color }}
                onClick={() =>
                  trackLinkClick({
                    url: social.url,
                    text: `${social.name} Follow Link`,
                    location: "SocialFollowSection",
                    link_type: "social",
                  })
                }
              >
                <FontAwesomeIcon
                  icon={social.icon}
                  className={s.socialIcon}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SocialFollowSection;
