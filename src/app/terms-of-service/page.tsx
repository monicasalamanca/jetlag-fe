import type { Metadata } from "next";
import TermsOfServiceComponent from "@/components/terms-of-service/terms-of-service";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../components/seo/PageSchemas";
import { SITE_CONFIG } from "../../../lib/seo/schema/config";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description:
    "Read the terms and conditions for using The Jet Lag Chronicles website. Understand your rights and responsibilities when accessing our travel content and services.",
  url: "https://thejetlagchronicles.com/terms-of-service",
});

const TermsOfService = () => {
  return (
    <>
      {/* Terms of Service SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_CONFIG.url}/terms-of-service`,
          title: "Terms of Service",
          description:
            "Read the terms and conditions for using The Jet Lag Chronicles website. Understand your rights and responsibilities when accessing our travel content and services.",
          lang: "en",
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_CONFIG.url, position: 1 },
          {
            name: "Terms of Service",
            item: `${SITE_CONFIG.url}/terms-of-service`,
            position: 2,
          },
        ]}
      />

      <TermsOfServiceComponent />
    </>
  );
};

export default TermsOfService;
