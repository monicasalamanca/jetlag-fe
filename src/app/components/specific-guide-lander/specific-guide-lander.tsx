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
  console.log("Specific Guide Lander received guide:", guide);

  return (
    <main className={s.container}>
      <GuidePresentation guide={guide} />
      <IsThisGuideForYou guide={guide} />
      <WhatsInside guide={guide} />
      <PreviewSamplePages guide={guide} />
      <SalesSection guide={guide} />
      {guide.type === "single" && <PromoteBundlesSection guide={guide} />}
      <FAQ />
    </main>
  );
};

export default SpecificGuidesLander;
