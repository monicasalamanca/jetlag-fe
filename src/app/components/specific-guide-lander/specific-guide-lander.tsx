"use client";

import { useRef } from "react";
import { DetailedGuide } from "@/api/types";
import { trackButtonClick } from "@/app/utils/analytics";
// import FAQ from "./faq/faq";
import IsThisGuideForYou from "./is-this-guide-for-you/is-this-guide-for-you";
import WhatsInside from "./whats-inside/whats-inside";
import PreviewSamplePages from "./preview-sample-pages/preview-sample-pages";
import SalesSection from "./sales-section/sales-section";
import PromoteBundlesSection from "./promote-bundles-section/promote-bundle-section";
import GuidePresentation from "./guide-presentation/guide-presentation";

import s from "./specific-guide-lander.module.scss";

interface SpecificGuidesLanderProps {
  guide: DetailedGuide;
}

const SpecificGuidesLander = ({ guide }: SpecificGuidesLanderProps) => {
  // Refs for scroll targets
  const previewSamplePagesRef = useRef<HTMLElement>(null);
  const promoteBundlesSectionRef = useRef<HTMLElement>(null);

  // Scroll handler for "Flip through real pages" button
  const handleCtaFlipClick = () => {
    // Track analytics event
    trackButtonClick({
      buttonText: "Flip through real pages",
      location: `Guide: ${guide.title}`,
      buttonType: "cta",
      buttonId: "cta_flip_button",
    });

    // Scroll to PreviewSamplePages section
    if (previewSamplePagesRef.current) {
      previewSamplePagesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Scroll handler for "View Bundle Options" button
  const handleCtaOptionsClick = () => {
    // Track analytics event
    trackButtonClick({
      buttonText: "View Bundle Options",
      location: `Guide: ${guide.title}`,
      buttonType: "cta",
      buttonId: "cta_options_button",
    });

    // Scroll to PromoteBundlesSection (only if rendered)
    if (promoteBundlesSectionRef.current) {
      promoteBundlesSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main className={s.container}>
      <GuidePresentation
        guide={guide}
        onCtaFlip={handleCtaFlipClick}
        onCtaOptions={handleCtaOptionsClick}
      />
      <IsThisGuideForYou guide={guide} />
      <WhatsInside guide={guide} />
      <PreviewSamplePages guide={guide} ref={previewSamplePagesRef} />
      <SalesSection guide={guide} />
      {guide.type === "single" && (
        <PromoteBundlesSection guide={guide} ref={promoteBundlesSectionRef} />
      )}
      {/* <FAQ /> */}
    </main>
  );
};

export default SpecificGuidesLander;
