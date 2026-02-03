/**
 * ConsentGate Component
 * Only renders children when user has accepted consent
 * Use this to wrap analytics/ads/marketing scripts
 */

"use client";

import { FC, ReactNode } from "react";
import { useConsent } from "./use-consent";

interface ConsentGateProps {
  children: ReactNode;
  /**
   * If true, renders children when consent is rejected or not yet given
   * Useful for "no tracking" message or fallback content
   */
  inverse?: boolean;
  /**
   * Fallback content to show while checking consent
   */
  fallback?: ReactNode;
}

/**
 * Gate component that conditionally renders children based on consent state
 * @example
 * ```tsx
 * <ConsentGate>
 *   <Script src="https://www.googletagmanager.com/gtag/js" />
 * </ConsentGate>
 * ```
 */
export const ConsentGate: FC<ConsentGateProps> = ({
  children,
  inverse = false,
  fallback = null,
}) => {
  const { hasAccepted, isLoading } = useConsent();

  if (isLoading) {
    return <>{fallback}</>;
  }

  const shouldRender = inverse ? !hasAccepted : hasAccepted;

  return shouldRender ? <>{children}</> : null;
};

export default ConsentGate;
