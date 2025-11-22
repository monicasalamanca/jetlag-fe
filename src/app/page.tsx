import type { Metadata } from "next";
import HomeContent from "@/components/home-content/home-content";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../components/seo/PageSchemas";
import { SITE_CONFIG } from "../../lib/seo/schema/config";

export const metadata: Metadata = createMetadata({
  title: "The Jet Lag Chronicles | Authentic Travel Stories and Guides",
  description:
    "Discover authentic travel experiences, destination guides, and practical tips from seasoned travelers. Your companion for meaningful travel adventures.",
  url: "https://thejetlagchronicles.com",
  image: "https://thejetlagchronicles.com/home-og.jpg",
});

const Home = async () => {
  return (
    <>
      {/* Homepage SEO Schemas */}
      <PageSchemas
        page={{
          url: SITE_CONFIG.url,
          title: "The Jet Lag Chronicles | Authentic Travel Stories and Guides",
          description:
            "Discover authentic travel experiences, destination guides, and practical tips from seasoned travelers. Your companion for meaningful travel adventures.",
          lang: "en",
          image: {
            url: "https://thejetlagchronicles.com/home-og.jpg",
            width: 1200,
            height: 630,
            alt: "The Jet Lag Chronicles - Travel Stories and Guides",
          },
        }}
        breadcrumbs={[{ name: "Home", item: SITE_CONFIG.url, position: 1 }]}
      />

      <HomeContent />
    </>
  );
};

export default Home;
