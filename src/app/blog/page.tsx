import type { Metadata } from "next";
import ChronicleContent from "@/components/chronicle-content/chronicle-content";
import { createMetadata } from "@/app/utils/metadata";

export const metadata: Metadata = createMetadata({
  title: "Travel Chronicles & Guides",
  description:
    "Discover authentic travel stories, destination guides, and practical tips from experienced travelers. Explore our collection of travel chronicles and find inspiration for your next adventure.",
  url: "https://thejetlagchronicles.com/blog",
  image: "https://thejetlagchronicles.com/blog-og.jpg",
});

export default function Blog() {
  return <ChronicleContent />;
}
