import type { Metadata } from "next";
import LifestyleLander from "@/components/lifestyle-lander/lifestyle-lander";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "@/components/seo/PageSchemas";
import { SITE_URL } from "@/lib/seo/schema/utils";
import { fetchLifestyleArticles, fetchLifestyleGuides } from "@/api/client";
import SocialFollowSection from "@/components/social-follow-section/social-follow-section";

// ISR: revalidate the lifestyle listing page every 2 days
export const revalidate = 172800;

export const metadata: Metadata = createMetadata({
  title: "Digital Nomad Lifestyle",
  description:
    "Discover the digital nomad lifestyle with The Jet Lag Chronicles. Learn about remote work, location independence, and creating a sustainable nomadic lifestyle.",
  url: `${SITE_URL}/lifestyle`,
  image: `${SITE_URL}/lifestyle-og.jpg`,
});

export default async function LifestylePage() {
  const [articles, guides] = await Promise.all([
    fetchLifestyleArticles(),
    fetchLifestyleGuides(),
  ]);

  return (
    <>
      {/* Lifestyle Page SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_URL}/lifestyle`,
          title: "Digital Nomad Lifestyle",
          description:
            "Discover the digital nomad lifestyle with The Jet Lag Chronicles. Learn about remote work, location independence, and creating a sustainable nomadic lifestyle.",
          lang: "en",
          image: {
            url: `${SITE_URL}/lifestyle-og.jpg`,
            width: 1200,
            height: 630,
            alt: "Digital Nomad Lifestyle",
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_URL, position: 1 },
          { name: "Lifestyle", item: `${SITE_URL}/lifestyle`, position: 2 },
        ]}
      />

      <LifestyleLander articles={articles} guides={guides} />

      {/* Social Follow Section */}
      <SocialFollowSection />
    </>
  );
}
