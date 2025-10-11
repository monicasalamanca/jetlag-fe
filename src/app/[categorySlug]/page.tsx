import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCountry } from "@/api/client";
import CountryLander from "@/components/country-lander/country-lander";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../components/seo/PageSchemas";
import { SITE_URL } from "../../../lib/seo/schema/utils";

type Props = {
  params: Promise<{
    categorySlug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const country = await fetchCountry(categorySlug);

  if (!country || !country[0]) {
    const formattedName = categorySlug
      .replace("-", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return createMetadata({
      title: `${formattedName} Not Found`,
      description:
        "The destination you're looking for could not be found. Explore our other travel destinations and guides.",
      url: `https://thejetlagchronicles.com/${categorySlug}`,
    });
  }

  const countryData = country[0];
  const countryName =
    countryData.name ||
    categorySlug.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return createMetadata({
    title: `${countryName} Travel Guide`,
    description: `Discover ${countryName} through our authentic travel experiences. Find practical tips, hidden gems, cost of living insights, and essential information for your ${countryName} adventure.`,
    url: `https://thejetlagchronicles.com/${categorySlug}`,
    image: `https://thejetlagchronicles.com/country-og.jpg`,
  });
}

const BlogPostPage = async ({ params }: Props) => {
  const { categorySlug } = await params;
  const country = await fetchCountry(categorySlug);
  // In here we either return the data based on country or other category
  // So first we will have a list of other categories
  // and we will check if the category exists in the list
  // If it does exist we will return the page for that specific category
  if (!country) return notFound();

  const countryData = country[0];
  const countryName =
    countryData.name ||
    categorySlug.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <>
      {/* Page-specific SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_URL}/${categorySlug}`,
          title: `${countryName} Travel Guide`,
          description: `Discover ${countryName} through our authentic travel experiences. Find practical tips, hidden gems, cost of living insights, and essential information for your ${countryName} adventure.`,
          lang: "en",
          image: {
            url: `${SITE_URL}/country-og.jpg`,
            width: 1200,
            height: 630,
            alt: `${countryName} Travel Guide`,
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

      <CountryLander country={countryData} />
    </>
  );
};

export default BlogPostPage;
