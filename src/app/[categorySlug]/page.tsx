import { notFound } from "next/navigation";
import { fetchCountry } from "@/api/client";
import CountryLander from "@/components/country-lander/country-lander";

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{
    categorySlug: string;
  }>;
}) => {
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
