import type { Metadata } from "next";
import ConfirmSubscriptionMsg from "@/components/confirm-subscription-msg/confirm-subscription-msg";
import { createMetadata } from "@/app/utils/metadata";

export const metadata: Metadata = createMetadata({
  title: "Subscription Confirmed",
  description:
    "Thank you for subscribing to The Jet Lag Chronicles! Your subscription has been confirmed. Get ready to receive authentic travel stories and destination guides.",
  url: "https://thejetlagchronicles.com/confirm-subscription",
});

export default function ConfirmSubscription() {
  return <ConfirmSubscriptionMsg />;
}
