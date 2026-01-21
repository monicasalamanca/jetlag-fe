import type { Metadata } from "next";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../../components/seo/PageSchemas";
import { SITE_URL } from "../../../../lib/seo/schema/utils";
import GuidesLander from "../../components/guides-lander/guides-lander";

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: "Premium Travel Guides | The Jet Lag Chronicles",
    description:
      "In-depth premium travel guides for digital nomads and slow travelers. Comprehensive destination insights, detailed cost breakdowns, and insider tips.",
    url: `${SITE_URL}/guides/paid`,
    image: `${SITE_URL}/og/guides-paid.jpg`,
  });
}

const PaidGuidesPage = () => {
  return (
    <>
      {/* Page-specific SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_URL}/guides/paid`,
          title: "Premium Travel Guides | The Jet Lag Chronicles",
          description:
            "In-depth premium travel guides for digital nomads and slow travelers. Comprehensive destination insights, detailed cost breakdowns, and insider tips.",
          lang: "en",
          image: {
            url: `${SITE_URL}/og/guides-paid.jpg`,
            width: 1200,
            height: 630,
            alt: "Premium Travel Guides - The Jet Lag Chronicles",
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
            name: "Premium Guides",
            item: `${SITE_URL}/guides/paid`,
            position: 3,
          },
        ]}
      />

      <GuidesLander />
    </>
  );
};

export default PaidGuidesPage;
