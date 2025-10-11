import type { Metadata } from "next";
import ConfirmSubscriptionMsg from "@/components/confirm-subscription-msg/confirm-subscription-msg";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../components/seo/PageSchemas";
import { SITE_CONFIG } from "../../../lib/seo/schema/config";

export const metadata: Metadata = createMetadata({
  title: "Subscription Confirmed",
  description:
    "Thank you for subscribing to The Jet Lag Chronicles! Your subscription has been confirmed. Get ready to receive authentic travel stories and destination guides.",
  url: "https://thejetlagchronicles.com/confirm-subscription",
});

export default function ConfirmSubscription() {
  return (
    <>
      {/* Subscription Confirmation SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_CONFIG.url}/confirm-subscription`,
          title: "Subscription Confirmed",
          description:
            "Thank you for subscribing to The Jet Lag Chronicles! Your subscription has been confirmed. Get ready to receive authentic travel stories and destination guides.",
          lang: "en",
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_CONFIG.url, position: 1 },
          {
            name: "Subscription Confirmed",
            item: `${SITE_CONFIG.url}/confirm-subscription`,
            position: 2,
          },
        ]}
      />

      <ConfirmSubscriptionMsg />
    </>
  );
}
