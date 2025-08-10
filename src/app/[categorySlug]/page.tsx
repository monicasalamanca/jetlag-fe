import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCountry } from "@/api/client";
import CountryLander from "@/components/country-lander/country-lander";
import { createMetadata } from "@/app/utils/metadata";

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
  return <CountryLander country={country[0]} />;
};

export default BlogPostPage;
