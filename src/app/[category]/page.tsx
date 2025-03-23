import { notFound } from "next/navigation";
import { fetchCountry } from "@/api/client";
import CountryLander from "@/components/country-lander/country-lander";

type Params = Promise<{
  category: string;
}>;

const BlogPostPage = async ({ params }: { params: Params }) => {
  const { category } = await params;
  const country = await fetchCountry(category);
  if (!country) return notFound();
  return <CountryLander country={country[0]} />;
};

export default BlogPostPage;
