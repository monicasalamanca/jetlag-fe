import type { Metadata } from "next";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "@/components/seo/PageSchemas";
import { SITE_URL } from "@/lib/seo/schema/utils";
import GuidesLander from "@/components/guides-lander/guides-lander";
import { fetchGuides } from "@/api/client";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: "Travel Guides | The Jet Lag Chronicles",
    description:
      "Digital nomad and expat guides covering visas, taxes, cost of living, remote work, and life abroad.",
    url: `${SITE_URL}/guides`,
    image: `${SITE_URL}/default-og.jpg`,
  });
}

const GuidesPage = async () => {
  const guides = await fetchGuides();

  return (
    <>
      {/* Page-specific SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_URL}/guides`,
          title: "Travel Guides | The Jet Lag Chronicles",
          description:
            "Digital nomad and expat guides covering visas, taxes, cost of living, remote work, and life abroad.",
          lang: "en",
          image: {
            url: `${SITE_URL}/default-og.jpg`,
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

      <GuidesLander guides={guides ?? []} />
    </>
  );
};

export default GuidesPage;
