import type { Metadata } from "next";
import NotFound from "@/components/not-found/not-found";
import { createMetadata } from "@/app/utils/metadata";

export const metadata: Metadata = createMetadata({
  title: "Page Not Found",
  description:
    "The page you're looking for could not be found. Explore our travel stories, destination guides, and authentic travel experiences.",
  url: "https://thejetlagchronicles.com/404",
});

export default function NotFoundPage() {
  return <NotFound />;
}
