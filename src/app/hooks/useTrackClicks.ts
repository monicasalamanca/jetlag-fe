"use client";

import { useCallback } from "react";
import * as gtag from "@/lib/gtag";

type GAEventProps = {
  action?: string;
  category: string;
  label: string;
  value?: number;
};

export function useTrackClick({
  action = "click",
  category,
  label,
  value,
}: GAEventProps) {
  return useCallback(() => {
    gtag.event({
      action,
      category,
      label,
      value,
    });
  }, [action, category, label, value]);
}
