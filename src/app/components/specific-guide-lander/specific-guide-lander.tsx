"use client";

import FAQ from "./faq/faq";
import IsThisGuideForYou from "./is-this-guide-for-you/is-this-guide-for-you";
import WhatsInside from "./whats-inside/whats-inside";
import PreviewSamplePages from "./preview-sample-pages/preview-sample-pages";
import SalesSection from "./sales-section/sales-section";
import PromoteBundlesSection from "./promote-bundles-section/promote-bundle-section";
import GuidePresentation from "./guide-presentation/guide-presentation";

import s from "./specific-guide-lander.module.scss";

const SpecificGuidesLander = () => {
  //   useEffect(() => {
  //     const loadGuides = async () => {
  //       try {
  //         setLoading(true);
  //         setError(null);
  //         const fetchedGuides = await fetchGuidesClient();

  //         if (fetchedGuides) {
  //           setGuides(fetchedGuides);
  //         } else {
  //           setGuides([]);
  //           setError("No guides available at the moment.");
  //         }
  //       } catch (err) {
  //         console.error("Error loading guides:", err);
  //         setError("Failed to load guides. Please try again later.");
  //         setGuides([]);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     loadGuides();
  //   }, []);

  return (
    <main className={s.container}>
      <GuidePresentation />
      <IsThisGuideForYou />
      <WhatsInside />
      <PreviewSamplePages />
      <SalesSection />
      <PromoteBundlesSection />
      <FAQ />
    </main>
  );
};

export default SpecificGuidesLander;
