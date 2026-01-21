import type { Metadata } from "next";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../../components/seo/PageSchemas";
import { SITE_URL } from "../../../../lib/seo/schema/utils";
import GuidesLander from "../../components/guides-lander/guides-lander";

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: "Free Travel Guides | The Jet Lag Chronicles",
    description:
      "Download free travel guides for digital nomads and slow travelers. Practical tips, cost of living insights, and destination information at no cost.",
    url: `${SITE_URL}/guides/free`,
    image: `${SITE_URL}/og/guides-free.jpg`,
  });
}

const FreeGuidesPage = () => {
  return (
    <>
      {/* Page-specific SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_URL}/guides/free`,
          title: "Free Travel Guides | The Jet Lag Chronicles",
          description:
            "Download free travel guides for digital nomads and slow travelers. Practical tips, cost of living insights, and destination information at no cost.",
          lang: "en",
          image: {
            url: `${SITE_URL}/og/guides-free.jpg`,
            width: 1200,
            height: 630,
            alt: "Free Travel Guides - The Jet Lag Chronicles",
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_URL, position: 1 },
          {
            name: "Guides",
            item: `${SITE_URL}/guides`,
            position: 2,
          },
          {
            name: "Free Guides",
            item: `${SITE_URL}/guides/free`,
            position: 3,
          },
        ]}
      />

      <GuidesLander />
    </>
  );
};

export default FreeGuidesPage;
