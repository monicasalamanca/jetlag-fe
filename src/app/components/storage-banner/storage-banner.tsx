"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import s from "./storage-banner.module.scss";

interface StorageBannerProps {
  title?: string;
  body?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  privacyPolicyUrl?: string;
  storageKey?: string;
  className?: string;
}

const StorageBanner: FC<StorageBannerProps> = ({
  title = "✈️ Heads up, traveler!",
  body = "We use a sprinkle of localStorage 🧠 to remember your preferences and keep things running smoothly. If you accept, we'll also enable Google AdSense ads, which may use cookies or local storage to personalize content and measure performance. This helps keep the blog free! No creepy tracking. Just good vibes and smoother travels 🌍.",
  primaryButtonText = "Got it!",
  secondaryButtonText = "Tell me more",
  privacyPolicyUrl = "/privacy-policy",
  storageKey = "jetlag-storage-consent",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has already acknowledged the banner
    try {
      const consent = localStorage.getItem(storageKey);
      if (!consent) {
        setIsVisible(true);
      }
    } catch (error) {
      // If localStorage is not available, show the banner
      console.warn("localStorage not available:", error);
      setIsVisible(true);
    }
  }, [storageKey]);

  const handleAccept = () => {
    setIsAnimating(true);

    try {
      localStorage.setItem(storageKey, "accepted");
      localStorage.setItem(`${storageKey}-timestamp`, Date.now().toString());
    } catch (error) {
      console.warn("Failed to save storage consent:", error);
    }

    // Hide banner with animation
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`${s.bannerContainer} ${isAnimating ? s.hiding : ""} ${className}`}
      role="banner"
      aria-label="Storage usage notification"
    >
      <div className={s.banner}>
        <div className={s.content}>
          {title && <h3 className={s.title}>{title}</h3>}
          <p className={s.body}>{body}</p>
        </div>

        <div className={s.actions}>
          <button
            type="button"
            onClick={handleAccept}
            className={`${s.primaryButton} ${s.button}`}
            aria-label="Accept storage usage"
          >
            <FontAwesomeIcon icon={faCheck} className={s.icon} />
            {primaryButtonText}
          </button>

          <Link
            href={privacyPolicyUrl}
            className={`${s.secondaryButton} ${s.button}`}
            aria-label="Learn more about our privacy policy"
          >
            <FontAwesomeIcon icon={faInfoCircle} className={s.icon} />
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StorageBanner;
