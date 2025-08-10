import type { Metadata } from "next";
import PrivacyPolicyComponent from "@/components/privacy-policy/privacy-policy";
import { createMetadata } from "@/app/utils/metadata";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Learn how The Jet Lag Chronicles collects, uses, and protects your personal information. Read our comprehensive privacy policy and data protection practices.",
  url: "https://thejetlagchronicles.com/privacy-policy",
});

const PrivacyPolicy = () => {
  return <PrivacyPolicyComponent />;
};

export default PrivacyPolicy;
