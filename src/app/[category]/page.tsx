import { fetchCountry } from "@/api/client";
import CountryLander from "@/components/country-lander/country-lander";
import NotFoundPage from "./[slug]/not-found";

type Params = Promise<{
  category: string;
}>;

const BlogPostPage = async ({ params }: { params: Params }) => {
  const { category } = await params;
  const country = await fetchCountry(category.toLowerCase());
  if (!country) return <NotFoundPage />;
  return <CountryLander country={country[0] ?? {}} />;
};

export default BlogPostPage;
