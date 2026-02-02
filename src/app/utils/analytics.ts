// Google Analytics Configuration
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-E04G0053EJ";

// Check if Google Analytics is available and not on localhost
const isGAAvailable = (): boolean => {
  if (typeof window === "undefined") return false;
  if (window.location && window.location.hostname === "localhost") return false;
  return !!window.gtag;
};

// Enhanced event tracking with better error handling
export const trackEvent = ({
  action,
  category,
  label,
  value,
  custom_parameters = {},
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
  custom_parameters?: Record<string, string | number | boolean | undefined>;
}) => {
  if (isGAAvailable()) {
    try {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
        ...custom_parameters,
      });
    } catch (error) {
      console.warn("GA tracking error:", error);
    }
  }
};

// Track page views with enhanced data
export const trackPageView = (url: string, title?: string) => {
  if (isGAAvailable()) {
    try {
      window.gtag("config", GA_ID, {
        page_location: url,
        page_title: title,
        send_page_view: true,
      });
    } catch (error) {
      console.warn("GA page view error:", error);
    }
  }
};

// Track clicks on links with enhanced data
export const trackLinkClick = ({
  url,
  text,
  location,
  link_type = "internal",
}: {
  url: string;
  text: string;
  location: string;
  link_type?: "internal" | "external" | "social";
}) => {
  trackEvent({
    action: "click",
    category: "link",
    label: `${location}: ${text} -> ${url}`,
    custom_parameters: {
      link_url: url,
      link_text: text,
      link_type,
      page_location: location,
    },
  });
};

// Track button clicks with enhanced data
export const trackButtonClick = ({
  buttonText,
  location,
  buttonType = "button",
  buttonId,
}: {
  buttonText: string;
  location: string;
  buttonType?: string;
  buttonId?: string;
}) => {
  trackEvent({
    action: "click",
    category: buttonType,
    label: `${location}: ${buttonText}`,
    custom_parameters: {
      button_text: buttonText,
      button_id: buttonId,
      page_location: location,
    },
  });
};

// Track form submissions with enhanced data
export const trackFormSubmission = ({
  formName,
  location,
  success = true,
  errorMessage,
}: {
  formName: string;
  location: string;
  success?: boolean;
  errorMessage?: string;
}) => {
  trackEvent({
    action: success ? "submit_success" : "submit_error",
    category: "form",
    label: `${location}: ${formName}`,
    value: success ? 1 : 0,
    custom_parameters: {
      form_name: formName,
      page_location: location,
      error_message: errorMessage,
    },
  });
};

// Track card clicks (for blog cards and guide cards) with enhanced data
export const trackCardClick = ({
  cardTitle,
  cardCategory,
  cardType,
  location,
  cardPosition,
}: {
  cardTitle: string;
  cardCategory: string;
  cardType: string;
  location: string;
  cardPosition?: number;
}) => {
  trackEvent({
    action: "click",
    category: "card",
    label: `${location}: ${cardType} - ${cardCategory} - ${cardTitle}`,
    custom_parameters: {
      card_title: cardTitle,
      card_category: cardCategory,
      card_type: cardType,
      card_position: cardPosition,
      page_location: location,
    },
  });
};

// Track navigation clicks with enhanced data
export const trackNavigation = ({
  destination,
  source,
  navigationText,
  navigationType = "header",
}: {
  destination: string;
  source: string;
  navigationText: string;
  navigationType?: "header" | "footer" | "sidebar" | "breadcrumb";
}) => {
  trackEvent({
    action: "navigate",
    category: "navigation",
    label: `${source} -> ${destination}: ${navigationText}`,
    custom_parameters: {
      navigation_type: navigationType,
      source_page: source,
      destination_page: destination,
      navigation_text: navigationText,
    },
  });
};

// Track search events
export const trackSearch = ({
  searchTerm,
  searchLocation,
  resultsCount,
}: {
  searchTerm: string;
  searchLocation: string;
  resultsCount?: number;
}) => {
  trackEvent({
    action: "search",
    category: "search",
    label: `${searchLocation}: ${searchTerm}`,
    value: resultsCount,
    custom_parameters: {
      search_term: searchTerm,
      search_location: searchLocation,
      results_count: resultsCount,
    },
  });
};

// Track scroll depth
export const trackScrollDepth = (depth: number, location: string) => {
  trackEvent({
    action: "scroll",
    category: "engagement",
    label: `${location}: ${depth}%`,
    value: depth,
    custom_parameters: {
      scroll_depth: depth,
      page_location: location,
    },
  });
};

// Track time on page
export const trackTimeOnPage = (seconds: number, location: string) => {
  trackEvent({
    action: "time_on_page",
    category: "engagement",
    label: `${location}: ${seconds}s`,
    value: seconds,
    custom_parameters: {
      time_seconds: seconds,
      page_location: location,
    },
  });
};

// Track downloads
export const trackDownload = ({
  fileName,
  fileType,
  location,
}: {
  fileName: string;
  fileType: string;
  location: string;
}) => {
  trackEvent({
    action: "download",
    category: "file",
    label: `${location}: ${fileName}`,
    custom_parameters: {
      file_name: fileName,
      file_type: fileType,
      page_location: location,
    },
  });
};

// Track video interactions
export const trackVideo = ({
  videoTitle,
  action,
  location,
  progress,
}: {
  videoTitle: string;
  action: "play" | "pause" | "complete" | "seek";
  location: string;
  progress?: number;
}) => {
  trackEvent({
    action: `video_${action}`,
    category: "video",
    label: `${location}: ${videoTitle}`,
    value: progress,
    custom_parameters: {
      video_title: videoTitle,
      video_action: action,
      video_progress: progress,
      page_location: location,
    },
  });
};
