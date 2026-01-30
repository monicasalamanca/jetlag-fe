import type { Metadata } from "next";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../components/seo/PageSchemas";
import { SITE_URL } from "../../../lib/seo/schema/utils";
import HeroThankYou from "@/components/hero-thank-you/hero-thank-you";
import InlineSubscribeForm from "@/components/subscribe-form/inline-subscribe-form";
import LatestBlogsSection from "@/components/latest-blogs-section/latest-blogs-section";

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: "Thank You for Your Purchase | The Jet Lag Chronicles",
    description:
      "Thank you for your purchase! Your order has been confirmed. Start exploring your travel resources and guides.",
    url: `${SITE_URL}/thank-you`,
    image: `${SITE_URL}/og/thank-you.jpg`,
  });
}

const ThankYouPage = () => {
  return (
    <>
      {/* Page-specific SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_URL}/thank-you`,
          title: "Thank You for Your Purchase | The Jet Lag Chronicles",
          description:
            "Thank you for your purchase! Your order has been confirmed. Start exploring your travel resources and guides.",
          lang: "en",
          image: {
            url: `${SITE_URL}/og/thank-you.jpg`,
            width: 1200,
            height: 630,
            alt: "Thank You - The Jet Lag Chronicles",
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_URL, position: 1 },
          {
            name: "Thank You",
            item: `${SITE_URL}/thank-you`,
            position: 2,
          },
        ]}
      />

      <HeroThankYou srcImage="/thank-you-dog_b6365y.jpg" />

      <InlineSubscribeForm
        trackEventName="Thank You Page"
        config={{
          apiEndpoint: "/api/subscribe",
          title: "Want travel stories, guides, and updates?",
          description:
            "We send occasional emails with new stories, guides, and honest takes on life abroad.\nNo spam. Unsubscribe anytime.",
          buttonText: "Subscribe",
        }}
      />

      <LatestBlogsSection />
    </>
  );
};

export default ThankYouPage;
