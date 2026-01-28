import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchGuideBySlugAndType } from "@/api/client";
import SpecificGuidesLander from "@/app/components/specific-guide-lander/specific-guide-lander";
import PageSchemas from "../../../../components/seo/PageSchemas";
import { SITE_CONFIG } from "../../../../lib/seo/schema/config";
import { createMetadata } from "@/app/utils/metadata";

type Props = {
  params: Promise<{ guideSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guideSlug } = await params;
  const decodedSlug = decodeURIComponent(guideSlug);
  const cleanSlug = decodedSlug.split("?")[0].split("&")[0];

  const isBundleGuide =
    cleanSlug.includes("-bundle") || cleanSlug.includes("playbook");
  const guideType: "single" | "bundle" = isBundleGuide ? "bundle" : "single";

  const guide = await fetchGuideBySlugAndType(cleanSlug, guideType);

  if (!guide) {
    return createMetadata({
      title: "Guide Not Found",
      description: "The guide you're looking for could not be found.",
      url: `${SITE_CONFIG.url}/guides/${cleanSlug}`,
    });
  }

  const firstSamplePage = guide.samplePages?.[0];
  const imageUrl =
    firstSamplePage?.attributes?.url || `${SITE_CONFIG.url}/country-og.jpg`;

  return createMetadata({
    title: guide.title,
    description: guide.description,
    url: `${SITE_CONFIG.url}/guides/${cleanSlug}`,
    image: imageUrl,
    type: "website",
  });
}

const SpecificGuideLanderPage = async ({ params }: Props) => {
  const { guideSlug } = await params;

  // Decode URL encoding and clean the slug by removing any query parameters
  const decodedSlug = decodeURIComponent(guideSlug);
  const cleanSlug = decodedSlug.split("?")[0].split("&")[0];

  // Determine the guide type based on the slug pattern
  // Bundles typically have "-bundle" or "playbook" in their slug
  const isBundleGuide =
    cleanSlug.includes("-bundle") || cleanSlug.includes("playbook");
  const guideType: "single" | "bundle" = isBundleGuide ? "bundle" : "single";

  // Fetch guide data from API for SEO and metadata
  const guide = await fetchGuideBySlugAndType(cleanSlug, guideType);

  if (!guide) return notFound();

  // Use real guide data for SEO
  const guideTitle = guide.title;
  const guideDescription = guide.description;

  // Use first sample page image if available, otherwise use default
  const firstSamplePage = guide.samplePages?.[0];
  const guideImage =
    firstSamplePage?.attributes?.url || `${SITE_CONFIG.url}/country-og.jpg`;
  const guideImageWidth = firstSamplePage?.attributes?.width || 1200;
  const guideImageHeight = firstSamplePage?.attributes?.height || 630;

  return (
    <>
      {/* Guide Page SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_CONFIG.url}/guides/${cleanSlug}`,
          title: guideTitle,
          description: guideDescription,
          lang: "en",
          image: {
            url: guideImage,
            width: guideImageWidth,
            height: guideImageHeight,
            alt: guideTitle,
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_CONFIG.url, position: 1 },
          {
            name: "Guides",
            item: `${SITE_CONFIG.url}/guides`,
            position: 2,
          },
          {
            name: guideTitle,
            item: `${SITE_CONFIG.url}/guides/${cleanSlug}`,
            position: 3,
          },
        ]}
      />

      <SpecificGuidesLander slug={cleanSlug} type={guideType} guide={guide} />
    </>
  );
};

export default SpecificGuideLanderPage;
