import type { Metadata } from "next";
import ChronicleContent from "@/components/chronicle-content/chronicle-content";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../components/seo/PageSchemas";
import { SITE_URL } from "../../../lib/seo/schema/utils";

export const metadata: Metadata = createMetadata({
  title: "Travel Chronicles and Guides",
  description:
    "Discover authentic travel stories, destination guides, and practical tips from experienced travelers. Explore our collection of travel chronicles and find inspiration for your next adventure.",
  url: "https://thejetlagchronicles.com/blog",
  image: "https://thejetlagchronicles.com/blog-og.jpg",
});

export default function Blog() {
  return (
    <>
      {/* Page-specific SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_URL}/blog`,
          title: "Travel Chronicles and Guides",
          description:
            "Discover authentic travel stories, destination guides, and practical tips from experienced travelers. Explore our collection of travel chronicles and find inspiration for your next adventure.",
          lang: "en",
          image: {
            url: "https://thejetlagchronicles.com/blog-og.jpg",
            width: 1200,
            height: 630,
            alt: "The Jet Lag Chronicles Blog",
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_URL, position: 1 },
          { name: "Blog", item: `${SITE_URL}/blog`, position: 2 },
        ]}
      />

      <ChronicleContent />
    </>
  );
}
