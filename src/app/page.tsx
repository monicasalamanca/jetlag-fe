import type { Metadata } from "next";
import HomeContent from "@/components/home-content/home-content";
import { createMetadata } from "@/app/utils/metadata";

export const metadata: Metadata = createMetadata({
  title: "The Jet Lag Chronicles | Authentic Travel Stories & Guides",
  description:
    "Discover authentic travel experiences, destination guides, and practical tips from seasoned travelers. Your companion for meaningful travel adventures.",
  url: "https://thejetlagchronicles.com/",
  image: "https://thejetlagchronicles.com/home-og.jpg",
});

const Home = async () => {
  return <HomeContent />;
};

export default Home;
