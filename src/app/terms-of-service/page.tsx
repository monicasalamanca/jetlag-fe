import type { Metadata } from "next";
import TermsOfServiceComponent from "@/components/terms-of-service/terms-of-service";
import { createMetadata } from "@/app/utils/metadata";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description:
    "Read the terms and conditions for using The Jet Lag Chronicles website. Understand your rights and responsibilities when accessing our travel content and services.",
  url: "https://thejetlagchronicles.com/terms-of-service",
});

const TermsOfService = () => {
  return <TermsOfServiceComponent />;
};

export default TermsOfService;
