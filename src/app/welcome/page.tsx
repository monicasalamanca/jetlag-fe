import type { Metadata } from "next";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../components/seo/PageSchemas";
import { SITE_URL } from "../../../lib/seo/schema/utils";

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: "Welcome | The Jet Lag Chronicles",
    description:
      "Welcome to The Jet Lag Chronicles - authentic travel stories and practical guides for digital nomads and slow travelers.",
    url: `${SITE_URL}/welcome`,
    image: `${SITE_URL}/og/welcome.jpg`,
  });
}

const WelcomePage = () => {
  return (
    <>
      {/* Page-specific SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_URL}/welcome`,
          title: "Welcome | The Jet Lag Chronicles",
          description:
            "Welcome to The Jet Lag Chronicles - authentic travel stories and practical guides for digital nomads and slow travelers.",
          lang: "en",
          image: {
            url: `${SITE_URL}/og/welcome.jpg`,
            width: 1200,
            height: 630,
            alt: "Welcome to The Jet Lag Chronicles",
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_URL, position: 1 },
          {
            name: "Welcome",
            item: `${SITE_URL}/welcome`,
            position: 2,
          },
        ]}
      />

      <main>
        <h1>Welcome to The Jet Lag Chronicles</h1>
        <p>
          Thank you for joining our community of digital nomads and slow
          travelers.
        </p>
      </main>
    </>
  );
};

export default WelcomePage;
