/**
 * PrivacySettingsLink Component
 * Renders a link/button that opens the consent settings modal
 * Add this to the footer or settings menu
 */

"use client";

import { FC, useState } from "react";
import StorageBanner from "./storage-banner";

interface PrivacySettingsLinkProps {
  /**
   * Custom class name for the link
   */
  className?: string;
  /**
   * Link text
   */
  text?: string;
  /**
   * Render as button instead of anchor
   */
  asButton?: boolean;
}

/**
 * Privacy settings link that opens the consent modal
 * @example
 * ```tsx
 * <PrivacySettingsLink text="Privacy Settings" />
 * ```
 */
export const PrivacySettingsLink: FC<PrivacySettingsLinkProps> = ({
  className = "",
  text = "Privacy settings",
  asButton = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConsentChange = () => {
    setIsModalOpen(false);
  };

  const Element = asButton ? "button" : "a";

  return (
    <>
      <Element
        onClick={handleClick}
        className={className}
        {...(asButton
          ? { type: "button" as const }
          : { href: "#privacy-settings" })}
        aria-label="Open privacy settings"
      >
        {text}
      </Element>

      {isModalOpen && (
        <StorageBanner
          mode="settings"
          initiallyOpen={true}
          onConsentChange={handleConsentChange}
        />
      )}
    </>
  );
};

export default PrivacySettingsLink;
