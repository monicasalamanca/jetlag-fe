import type { Metadata } from "next";
import AboutUsHero from "@/components/about-us-hero/about-us-hero";
import OurStory from "@/components/our-story/our-story";
import MissionCoverage from "@/components/mission-coverage/mission-coverage";
import WhyTrustUs from "@/components/why-trust-us/why-trust-us";
import WhatWeAreNot from "@/components/what-we-are-not/what-we-are-not";
import MeetTheCrew from "@/components/meet-the-crew/meet-the-crew";
import OurValues from "@/components/our-values/our-values";
// import NewsletterCta from "@/components/newsletter-cta/newsletter-cta";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "@/components/seo/PageSchemas";
import { SITE_CONFIG } from "@/lib/seo/schema/config";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "Meet the team behind The Jet Lag Chronicles, helping digital nomads and expats navigate life, work, and relocation abroad.",
  url: `${SITE_CONFIG.url}/about-us`,
  image: `${SITE_CONFIG.url}/about-us-og.jpg`,
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
            "Meet the team behind The Jet Lag Chronicles, helping digital nomads and expats navigate life, work, and relocation abroad.",
          lang: "en",
          image: {
            url: `${SITE_CONFIG.url}/about-us-og.jpg`,
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
      <AboutUsHero />
      <OurStory />
      <MeetTheCrew />
      <MissionCoverage />
      <WhyTrustUs />
      <WhatWeAreNot />
      <OurValues />
      {/* <NewsletterCta /> */}
    </>
  );
}
