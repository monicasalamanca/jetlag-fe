"use client";

import { useEffect, useState } from "react";
import { fetchGuideBySlugAndType } from "@/api/client";

// TypeScript interfaces
export interface CityGuide {
  id: string | number;
  name: string;
}

export interface BundleWithCityGuides {
  bundleId: number;
  bundleSlug: string;
  cityGuides: CityGuide[];
}

// In-memory cache for bundle city guides (persists during session)
const bundleCityGuidesCache = new Map<string, CityGuide[]>();

/**
 * Custom hook to fetch city guides for multiple bundles in parallel
 *
 * @param bundleSlugs - Array of bundle slugs to fetch city guides for
 * @returns Object containing city guides per bundle slug, loading state, and errors
 */
export const useBundleCityGuides = (bundleSlugs: string[]) => {
  const [cityGuidesMap, setCityGuidesMap] = useState<
    Record<string, CityGuide[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Create a stable string representation for dependency comparison
  const bundleSlugsKey = JSON.stringify(bundleSlugs.sort());

  useEffect(() => {
    // Reset state when bundle slugs change
    setIsLoading(true);
    setErrors({});

    const fetchAllBundleCityGuides = async () => {
      // Determine which bundles need to be fetched (not in cache)
      const slugsToFetch = bundleSlugs.filter(
        (slug) => !bundleCityGuidesCache.has(slug),
      );

      // If all bundles are cached, use cache immediately
      if (slugsToFetch.length === 0) {
        const cachedMap: Record<string, CityGuide[]> = {};
        bundleSlugs.forEach((slug) => {
          const cached = bundleCityGuidesCache.get(slug);
          if (cached) {
            cachedMap[slug] = cached;
          }
        });
        setCityGuidesMap(cachedMap);
        setIsLoading(false);
        return;
      }

      // Fetch all bundles in parallel
      const fetchPromises = slugsToFetch.map(async (slug) => {
        try {
          const bundleDetails = await fetchGuideBySlugAndType(slug, "bundle");

          if (bundleDetails && bundleDetails.bundleIncludes) {
            // Extract city guides from bundleIncludes
            const cityGuides: CityGuide[] = bundleDetails.bundleIncludes.map(
              (include) => ({
                id: include.id,
                name: include.attributes.title,
              }),
            );

            // Cache the result
            bundleCityGuidesCache.set(slug, cityGuides);

            return { slug, cityGuides, error: null };
          } else {
            const errorMsg = `No bundleIncludes found for bundle: ${slug}`;
            console.error(errorMsg);
            return { slug, cityGuides: null, error: errorMsg };
          }
        } catch (error) {
          const errorMsg = `Failed to fetch bundle ${slug}: ${error instanceof Error ? error.message : "Unknown error"}`;
          console.error(errorMsg);
          return { slug, cityGuides: null, error: errorMsg };
        }
      });

      // Wait for all fetches to complete
      const results = await Promise.all(fetchPromises);

      // Build the map from results and cache
      const newCityGuidesMap: Record<string, CityGuide[]> = {};
      const newErrors: Record<string, string> = {};

      // Add newly fetched data
      results.forEach(({ slug, cityGuides, error }) => {
        if (cityGuides) {
          newCityGuidesMap[slug] = cityGuides;
        } else if (error) {
          newErrors[slug] = error;
        }
      });

      // Add previously cached data for bundles not in slugsToFetch
      bundleSlugs.forEach((slug) => {
        if (!slugsToFetch.includes(slug)) {
          const cached = bundleCityGuidesCache.get(slug);
          if (cached) {
            newCityGuidesMap[slug] = cached;
          }
        }
      });

      setCityGuidesMap(newCityGuidesMap);
      setErrors(newErrors);
      setIsLoading(false);
    };

    if (bundleSlugs.length > 0) {
      fetchAllBundleCityGuides();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bundleSlugsKey]);

  return {
    cityGuidesMap,
    isLoading,
    errors,
    hasErrors: Object.keys(errors).length > 0,
  };
};
