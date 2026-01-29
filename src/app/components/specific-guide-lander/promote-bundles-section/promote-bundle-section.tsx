"use client";

import { forwardRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { DetailedGuide } from "@/api/types";
import { useBundleCityGuides } from "./useBundleCityGuides";

import s from "./promote-bundle-section.module.scss";

// Color variant type for cycling through border colors
type ColorVariant = "purple" | "pink" | "orange" | "teal";

interface PreviewSamplePagesProps {
  guide: DetailedGuide;
}

const PromoteBundlesSection = forwardRef<HTMLElement, PreviewSamplePagesProps>(
  ({ guide }, ref) => {
    // Helper function to get color class based on index
    const getColorClass = (index: number): ColorVariant => {
      const variants: ColorVariant[] = ["purple", "pink", "orange", "teal"];
      return variants[index % variants.length];
    };

    // Extract bundles from guide data (memoized to prevent array recreation)
    const bundles = useMemo(
      () => guide.includedInBundles || [],
      [guide.includedInBundles],
    );

    // Extract bundle slugs for fetching city guides (memoized to prevent infinite loops)
    const bundleSlugs = useMemo(
      () => bundles.map((bundle) => bundle.attributes.slug),
      [bundles],
    );

    // Fetch city guides for all bundles using the custom hook
    const { cityGuidesMap, isLoading } = useBundleCityGuides(bundleSlugs);

    // Don't render section if no bundles
    if (bundles.length === 0) {
      return null;
    }

    // Filter out bundles that failed to load city guides
    const bundlesWithCityGuides = bundles.filter((bundle) => {
      const slug = bundle.attributes.slug;
      return cityGuidesMap[slug] && cityGuidesMap[slug].length > 0;
    });

    // If all bundles failed to load or are still loading and no cached data, show nothing
    if (bundlesWithCityGuides.length === 0 && !isLoading) {
      console.warn("No bundles with city guides available to display");
      return null;
    }

    return (
      <section className={s.promoteBundleSection} ref={ref}>
        <div className={s.wrapper}>
          <div className={s.pill}>
            <FontAwesomeIcon icon={faLayerGroup} className={s.icon} />
            Bundle & Save
          </div>
          <h2>{guide.title} is Included in These Bundles</h2>
          <p>
            Planning to explore multiple cities? Get this guide plus more and
            save up to 40%
          </p>
          <div className={s.bundlesWrapper}>
            <div className={s.bundleScroll}>
              {bundlesWithCityGuides.map((bundle) => {
                const { id, attributes } = bundle;
                const slug = attributes.slug;
                const cityGuides = cityGuidesMap[slug] || [];

                return (
                  <div key={id} className={s.bundleCard}>
                    <div className={s.bundleType}>
                      <FontAwesomeIcon icon={faLayerGroup} className={s.icon} />
                      Bundle
                    </div>
                    <h3>{attributes.title}</h3>
                    <p>{attributes.description}</p>
                    <div className={s.includes}>
                      <h4>includes:</h4>
                      <div className={s.includesPills}>
                        {cityGuides.map((city, index) => (
                          <span
                            key={city.id}
                            className={s[`pill--${getColorClass(index)}`]}
                            data-color-index={index % 4}
                          >
                            {city.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={s.pricing}>
                      <div className={s.originalPrice}>
                        ${attributes.originalPriceCents}
                      </div>
                      <div className={s.pages}>
                        {attributes.pageCount} pages total
                      </div>
                    </div>
                    <button className={s.ctaButton}>
                      Get the Bundle
                      <FontAwesomeIcon icon={faArrowRight} className={s.icon} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  },
);

PromoteBundlesSection.displayName = "PromoteBundlesSection";

export default PromoteBundlesSection;
