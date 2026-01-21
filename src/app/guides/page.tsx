import type { Metadata } from "next";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../components/seo/PageSchemas";
import { SITE_URL } from "../../../lib/seo/schema/utils";
import GuidesLander from "../components/guides-lander/guides-lander";

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: "Travel Guides | The Jet Lag Chronicles",
    description:
      "Comprehensive travel guides for digital nomads and slow travelers. Discover authentic destinations, practical tips, cost of living insights, and essential information for your adventures.",
    url: `${SITE_URL}/guides`,
    image: `${SITE_URL}/og/guides.jpg`,
  });
}

const GuidesPage = () => {
  return (
    <>
      {/* Page-specific SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_URL}/guides`,
          title: "Travel Guides | The Jet Lag Chronicles",
          description:
            "Comprehensive travel guides for digital nomads and slow travelers. Discover authentic destinations, practical tips, cost of living insights, and essential information for your adventures.",
          lang: "en",
          image: {
            url: `${SITE_URL}/og/guides.jpg`,
            width: 1200,
            height: 630,
            alt: "Travel Guides - The Jet Lag Chronicles",
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_URL, position: 1 },
          {
            name: "Guides",
            item: `${SITE_URL}/guides`,
            position: 2,
          },
        ]}
      />

      <GuidesLander />
    </>
  );
};

export default GuidesPage;
