"use client";

import { ReactNode } from "react";
import { trackEvent } from "@/app/utils/analytics";

interface TrackJustinsPickClickProps {
  children: ReactNode;
  blogId: number;
  blogSlug: string;
  blogTitle: string;
  lifestyle: boolean;
  countryName: string | null;
  position: number;
  href: string;
  className?: string;
}

/**
 * Minimal Client Component for tracking Justin's Picks card clicks.
 * Wraps a link to add analytics tracking without making the whole
 * section client-side.
 */
const TrackJustinsPickClick = ({
  children,
  blogId,
  blogSlug,
  blogTitle,
  lifestyle,
  countryName,
  position,
  href,
  className,
}: TrackJustinsPickClickProps) => {
  const handleClick = () => {
    trackEvent({
      action: "home_justins_picks_card_click",
      category: "engagement",
      label: `Justin's Picks: ${blogSlug}`,
      custom_parameters: {
        blog_id: blogId,
        blog_slug: blogSlug,
        blog_title: blogTitle,
        is_lifestyle: lifestyle,
        country: countryName ?? "lifestyle",
        card_position: position + 1, // 1-based position for analytics
        destination_url: href,
      },
    });
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      aria-label={`Read article: ${blogTitle}`}
    >
      {children}
    </a>
  );
};

export default TrackJustinsPickClick;
