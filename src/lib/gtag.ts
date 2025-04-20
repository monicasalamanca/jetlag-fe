declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
//
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Pageview tracking
export const pageview = (url: string) => {
  if (!GA_TRACKING_ID || typeof window === "undefined") return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// Custom event tracking
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (!GA_TRACKING_ID || typeof window === "undefined") return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
