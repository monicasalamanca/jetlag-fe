"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import s from "./storage-banner.module.scss";
import { ConsentMode } from "./consent-constants";
import {
  saveConsentState,
  isStorageAvailable,
  hasConsentChoice,
} from "./consent-utils";
import { notifyConsentChange } from "./use-consent";

interface StorageBannerProps {
  mode?: ConsentMode;
  privacyPolicyUrl?: string;
  className?: string;
  onConsentChange?: (state: "accepted" | "rejected") => void;
  initiallyOpen?: boolean;
}

const StorageBanner: FC<StorageBannerProps> = ({
  mode = "banner",
  privacyPolicyUrl = "/privacy-policy",
  className = "",
  onConsentChange,
  initiallyOpen = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const [currentMode, setCurrentMode] = useState<ConsentMode>(mode);

  useEffect(() => {
    // Check if user has already made a consent choice
    const hasChoice = hasConsentChoice();

    // Check storage availability
    const storageWorks = isStorageAvailable();
    setStorageUnavailable(!storageWorks);

    // Show banner if no consent choice has been made or if forced open
    if (!hasChoice || initiallyOpen) {
      setIsVisible(true);
    }
  }, [initiallyOpen]);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  const handleAccept = () => {
    setIsAnimating(true);
    const success = saveConsentState("accepted");

    if (!success) {
      console.warn("Consent saved to session memory only");
    }

    // Notify all listeners about consent change
    notifyConsentChange();

    // Notify parent component
    onConsentChange?.("accepted");

    // Hide banner with animation
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimating(false);
    }, 300);
  };

  const handleReject = () => {
    setIsAnimating(true);
    const success = saveConsentState("rejected");

    if (!success) {
      console.warn("Consent rejection saved to session memory only");
    }

    // Notify all listeners about consent change
    notifyConsentChange();

    // Notify parent component
    onConsentChange?.("rejected");

    // Hide banner with animation
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimating(false);
    }, 300);
  };

  const openSettings = () => {
    setCurrentMode("settings");
  };

  if (!isVisible) {
    return null;
  }

  const isBannerMode = currentMode === "banner";
  const isSettingsMode = currentMode === "settings";

  return (
    <div
      className={`${s.bannerContainer} ${isAnimating ? s.hiding : ""} ${
        isSettingsMode ? s.settingsMode : ""
      } ${className}`}
      role={isBannerMode ? "banner" : "dialog"}
      aria-label={
        isBannerMode ? "Privacy and storage notification" : "Privacy settings"
      }
      aria-modal={isSettingsMode ? "true" : undefined}
    >
      <div className={s.banner}>
        <div className={s.content}>
          {isBannerMode && (
            <>
              <h3 className={s.title}>✈️ Heads up, traveler!</h3>
              <p className={s.body}>
                We use a sprinkle of localStorage 🧠 to remember your
                preferences and keep things running smoothly. If you accept,
                we&apos;ll also enable Google AdSense ads, which may use cookies
                or local storage to personalize content and measure performance.
                This helps keep the blog free! No creepy tracking. Just good
                vibes and smoother travels 🌍.
              </p>
              {storageUnavailable && (
                <div className={s.fallbackMessage} role="status">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className={s.fallbackIcon}
                  />
                  <span>
                    Your browser is blocking storage. We&apos;ll apply your
                    choice for this session, but you may be asked again next
                    time.
                  </span>
                </div>
              )}
            </>
          )}

          {isSettingsMode && (
            <>
              <h3 className={s.title}>Privacy settings</h3>
              <p className={s.body}>
                We use essential storage to keep the site working. With your
                permission, we also use analytics and ads to understand traffic
                and fund the content. You can change this anytime.
              </p>
              <p className={s.essentialInfo}>
                <strong>Essential:</strong> always on (required for site
                functionality).
              </p>
              {storageUnavailable && (
                <div className={s.fallbackMessage} role="status">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className={s.fallbackIcon}
                  />
                  <span>
                    Your browser is blocking storage. We&apos;ll apply your
                    choice for this session, but you may be asked again next
                    time.
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        <div className={s.actions}>
          {isBannerMode && (
            <>
              <button
                type="button"
                onClick={handleAccept}
                className={`${s.primaryButton} ${s.button}`}
                aria-label="Accept all cookies and storage"
              >
                <FontAwesomeIcon icon={faCheck} className={s.icon} />
                Got it!
              </button>

              <button
                type="button"
                onClick={handleReject}
                className={`${s.rejectButton} ${s.button}`}
                aria-label="Reject all non-essential cookies and storage"
              >
                <FontAwesomeIcon icon={faTimes} className={s.icon} />
                Reject
              </button>

              <button
                type="button"
                onClick={openSettings}
                className={`${s.secondaryButton} ${s.button}`}
                aria-label="Open privacy settings"
              >
                <FontAwesomeIcon icon={faInfoCircle} className={s.icon} />
                Tell me more
              </button>
            </>
          )}

          {isSettingsMode && (
            <>
              <button
                type="button"
                onClick={handleAccept}
                className={`${s.primaryButton} ${s.button}`}
                aria-label="Accept all cookies and storage"
              >
                <FontAwesomeIcon icon={faCheck} className={s.icon} />
                Accept all
              </button>

              <button
                type="button"
                onClick={handleReject}
                className={`${s.rejectButton} ${s.button}`}
                aria-label="Reject all non-essential cookies and storage"
              >
                <FontAwesomeIcon icon={faTimes} className={s.icon} />
                Reject all
              </button>

              <Link
                href={privacyPolicyUrl}
                className={`${s.secondaryButton} ${s.button}`}
                aria-label="Learn more about our privacy policy"
              >
                <FontAwesomeIcon icon={faInfoCircle} className={s.icon} />
                Privacy policy
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorageBanner;
