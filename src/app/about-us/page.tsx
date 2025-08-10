import type { Metadata } from "next";
import Hero from "@/components/hero/hero";
import AboutUsContent from "@/components/about-us-content/about-us-content";
import OurMission from "@/components/our-mission/our-mission";
import MeetUs from "@/components/meet-us/meet-us";
import OurValues from "@/components/our-values/our-values";
import { createMetadata } from "@/app/utils/metadata";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "Meet the travel enthusiasts behind The Jet Lag Chronicles. Learn about our mission to empower expats and digital nomads to find their perfect destination through authentic travel experiences.",
  url: "https://thejetlagchronicles.com/about-us",
  image: "https://thejetlagchronicles.com/about-us-og.jpg",
});

export default function About() {
  return (
    <>
      <Hero
        srcImage="/aboutus-hero_vpxp49.jpg"
        headline="About Jet Lag Chronicles"
        shortDescription="Empowering Expats and Digital Nomads to Find Their Perfect Destination"
      />
      <AboutUsContent />
      <OurMission />
      <MeetUs />
      <OurValues />
    </>
  );
}
