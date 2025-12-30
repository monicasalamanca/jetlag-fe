import type { Metadata } from "next";
import Hero from "@/components/hero/hero";
import AboutUsContent from "@/components/about-us-content/about-us-content";
import WhatYouWillFind from "../../components/what-you-will-find/what-you-will-find";
import OurMission from "@/components/our-mission/our-mission";
import WhoWeAre from "@/components/who-we-are/who-we-are";
import WhyTrustUs from "@/components/why-trust-us/why-trust-us";
import MeetTheJetlaggers from "@/components/meet-the-jetlaggers/meet-the-jetlaggers";
import OurValues from "@/components/our-values/our-values";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../components/seo/PageSchemas";
import { SITE_CONFIG } from "../../../lib/seo/schema/config";

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
      {/* About Us SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_CONFIG.url}/about-us`,
          title: "About Us",
          description:
            "Meet the travel enthusiasts behind The Jet Lag Chronicles. Learn about our mission to empower expats and digital nomads to find their perfect destination through authentic travel experiences.",
          lang: "en",
          image: {
            url: "https://thejetlagchronicles.com/about-us-og.jpg",
            width: 1200,
            height: 630,
            alt: "About The Jet Lag Chronicles",
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_CONFIG.url, position: 1 },
          {
            name: "About Us",
            item: `${SITE_CONFIG.url}/about-us`,
            position: 2,
          },
        ]}
      />

      <Hero
        srcImage="/aboutus-hero_vpxp49.jpg"
        headline={"Which Thai Island Makes Sense In 2026?"}
        shortDescription={
          "What it really costs to live on Thailand’s islands. Rent, food, transport, visas, and the hidden expenses that drain newcomers fast."
        }
        ctaProps={{
          buttonText: "Download the Free Guide",
          tags: ["free guide", "thailand"],
        }}
      />
      <AboutUsContent />
      <WhatYouWillFind />
      <OurMission />
      <WhoWeAre />
      <WhyTrustUs />
      <MeetTheJetlaggers />
      <OurValues />
    </>
  );
}
