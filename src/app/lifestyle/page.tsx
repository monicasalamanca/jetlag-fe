import type { Metadata } from "next";
import LifestyleLander from "@/components/lifestyle-lander/lifestyle-lander";
import { createMetadata } from "@/app/utils/metadata";

export const metadata: Metadata = createMetadata({
  title: "Digital Nomad Lifestyle",
  description:
    "Discover the digital nomad lifestyle with The Jet Lag Chronicles. Learn about remote work, location independence, and creating a sustainable nomadic lifestyle.",
  url: "https://thejetlagchronicles.com/lifestyle",
  image: "https://thejetlagchronicles.com/lifestyle-og.jpg",
});

const LifestylePage = () => {
  return <LifestyleLander />; // Placeholder for the actual component
};

export default LifestylePage;
