import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCountry, fetchBlogsByCountryServer } from "@/api/client";
import type { Country } from "@/api/types";
import CountryLander from "@/components/country-lander/country-lander";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "@/components/seo/PageSchemas";
import { SITE_URL } from "@/lib/seo/schema/utils";

type Props = {
  params: Promise<{
    categorySlug: string;
  }>;
};

function resolveCountryMeta(countryData: Country, countryName: string) {
  return {
    title: countryData.seoTitle || `${countryName} Digital Nomad & Expat Guide`,
    description:
      countryData.seoDescription ||
      `Visas, taxes, cost of living, and remote work insights for digital nomads and expats living in ${countryName}.`,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const country = await fetchCountry(categorySlug);

  if (!country || !country[0]) {
    const formattedName = categorySlug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return createMetadata({
      title: `${formattedName} Not Found`,
      description:
        "The destination you're looking for could not be found. Explore our other travel destinations and guides.",
      url: `${SITE_URL}/${categorySlug}`,
    });
  }

  const countryData = country[0];
  const countryName =
    countryData.name ||
    categorySlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const { title: metaTitle, description: metaDescription } = resolveCountryMeta(
    countryData,
    countryName,
  );

  return createMetadata({
    title: metaTitle,
    description: metaDescription,
    url: `${SITE_URL}/${categorySlug}`,
    image: countryData.heroImage?.url || `${SITE_URL}/country-og.jpg`,
  });
}

const BlogPostPage = async ({ params }: Props) => {
  const { categorySlug } = await params;
  const [country, blogData] = await Promise.all([
    fetchCountry(categorySlug),
    fetchBlogsByCountryServer(categorySlug),
  ]);

  if (!country) return notFound();

  const countryData = country[0];
  const countryName =
    countryData.name ||
    categorySlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const { title: metaTitle, description: metaDescription } = resolveCountryMeta(
    countryData,
    countryName,
  );

  return (
    <>
      {/* Page-specific SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_URL}/${categorySlug}`,
          title: metaTitle,
          description: metaDescription,
          lang: "en",
          image: {
            url: countryData.heroImage?.url || `${SITE_URL}/country-og.jpg`,
            width: countryData.heroImage?.width || 1200,
            height: countryData.heroImage?.height || 630,
            alt:
              countryData.heroImage?.alternativeText ||
              `${countryName} Travel Guide`,
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_URL, position: 1 },
          {
            name: countryName,
            item: `${SITE_URL}/${categorySlug}`,
            position: 2,
          },
        ]}
      />

      <CountryLander country={countryData} blogData={blogData ?? []} />
    </>
  );
};

export default BlogPostPage;
