"use client";

import { trackEvent } from "@/app/utils/analytics";
import { ReactNode } from "react";

interface TrackSpotlightClickProps {
  children: ReactNode;
  blogId: number;
  blogSlug: string;
  lifestyle: boolean;
  position: number;
  className?: string;
  href: string;
}

/**
 * Minimal Client Component for tracking spotlight card clicks
 * Wraps a link to add analytics tracking without making the whole section client-side
 */
const TrackSpotlightClick = ({
  children,
  blogId,
  blogSlug,
  lifestyle,
  position,
  className,
  href,
}: TrackSpotlightClickProps) => {
  const handleClick = () => {
    trackEvent({
      action: "spotlight_card_click",
      category: "engagement",
      label: `Lifestyle Spotlight: ${blogSlug}`,
      custom_parameters: {
        blog_id: blogId,
        blog_slug: blogSlug,
        is_lifestyle: lifestyle,
        card_position: position,
        destination_url: href,
      },
    });
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      aria-label={`Read article: ${blogSlug}`}
    >
      {children}
    </a>
  );
};

export default TrackSpotlightClick;
