"use client";

import { trackEvent } from "@/app/utils/analytics";
import { ReactNode } from "react";

interface TrackTrendingClickProps {
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
 * Minimal Client Component for tracking trending card clicks.
 * Wraps a link to add analytics tracking without making the whole
 * section client-side.
 */
const TrackTrendingClick = ({
  children,
  blogId,
  blogSlug,
  blogTitle,
  lifestyle,
  countryName,
  position,
  href,
  className,
}: TrackTrendingClickProps) => {
  const handleClick = () => {
    trackEvent({
      action: "trending_card_click",
      category: "engagement",
      label: `Trending This Week: ${blogSlug}`,
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
      aria-label={`Read trending article: ${blogTitle}`}
    >
      {children}
    </a>
  );
};

export default TrackTrendingClick;
