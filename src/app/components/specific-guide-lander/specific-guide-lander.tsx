"use client";

import { DetailedGuide } from "@/api/types";
import FAQ from "./faq/faq";
import IsThisGuideForYou from "./is-this-guide-for-you/is-this-guide-for-you";
import WhatsInside from "./whats-inside/whats-inside";
import PreviewSamplePages from "./preview-sample-pages/preview-sample-pages";
import SalesSection from "./sales-section/sales-section";
import PromoteBundlesSection from "./promote-bundles-section/promote-bundle-section";
import GuidePresentation from "./guide-presentation/guide-presentation";

import s from "./specific-guide-lander.module.scss";

interface SpecificGuidesLanderProps {
  guide: DetailedGuide; // Passed from server component
}

const SpecificGuidesLander = ({ guide }: SpecificGuidesLanderProps) => {
  // TODO: Pass guide data to child components to display real data
  // Currently child components use hardcoded data
  // Future improvement: Update child components to accept guide prop

  console.log("Specific Guide Lander received guide:", guide);
  //   console.log("Guide slug:", slug);
  //   console.log("Guide type:", type);

  return (
    <main className={s.container}>
      <GuidePresentation guide={guide} />
      <IsThisGuideForYou guide={guide} />
      <WhatsInside />
      <PreviewSamplePages />
      <SalesSection />
      <PromoteBundlesSection />
      <FAQ />
    </main>
  );
};

export default SpecificGuidesLander;
