import type { Metadata } from "next";
import PrivacyPolicyComponent from "@/components/privacy-policy/privacy-policy";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../components/seo/PageSchemas";
import { SITE_CONFIG } from "../../../lib/seo/schema/config";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Learn how The Jet Lag Chronicles collects, uses, and protects your personal information. Read our comprehensive privacy policy and data protection practices.",
  url: "https://thejetlagchronicles.com/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <>
      {/* Privacy Policy SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_CONFIG.url}/privacy-policy`,
          title: "Privacy Policy",
          description:
            "Learn how The Jet Lag Chronicles collects, uses, and protects your personal information. Read our comprehensive privacy policy and data protection practices.",
          lang: "en",
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_CONFIG.url, position: 1 },
          {
            name: "Privacy Policy",
            item: `${SITE_CONFIG.url}/privacy-policy`,
            position: 2,
          },
        ]}
      />

      <PrivacyPolicyComponent />
    </>
  );
};

export default PrivacyPolicy;
