import type { Metadata } from "next";
import LifestyleLander from "@/components/lifestyle-lander/lifestyle-lander";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../components/seo/PageSchemas";
import { SITE_CONFIG } from "../../../lib/seo/schema/config";

export const metadata: Metadata = createMetadata({
  title: "Digital Nomad Lifestyle",
  description:
    "Discover the digital nomad lifestyle with The Jet Lag Chronicles. Learn about remote work, location independence, and creating a sustainable nomadic lifestyle.",
  url: "https://thejetlagchronicles.com/lifestyle",
  image: "https://thejetlagchronicles.com/lifestyle-og.jpg",
});

const LifestylePage = () => {
  return (
    <>
      {/* Lifestyle Page SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_CONFIG.url}/lifestyle`,
          title: "Digital Nomad Lifestyle",
          description:
            "Discover the digital nomad lifestyle with The Jet Lag Chronicles. Learn about remote work, location independence, and creating a sustainable nomadic lifestyle.",
          lang: "en",
          image: {
            url: "https://thejetlagchronicles.com/lifestyle-og.jpg",
            width: 1200,
            height: 630,
            alt: "Digital Nomad Lifestyle",
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_CONFIG.url, position: 1 },
          {
            name: "Lifestyle",
            item: `${SITE_CONFIG.url}/lifestyle`,
            position: 2,
          },
        ]}
      />

      <LifestyleLander />
    </>
  );
};

export default LifestylePage;
