import { fetchBlogPost } from "@/api/client";
import BlogContent from "@/components/blog-content/blog-content";
import NotFoundPage from "../../not-found";

type Params = Promise<{
  category: string;
  slug: string;
}>;

const BlogPostPage = async ({ params }: { params: Params }) => {
  const { category, slug } = await params;
  const postArray = await fetchBlogPost(category, slug);

  if (!postArray || postArray.length === 0) return <NotFoundPage />;

  const post = postArray[0];

  return <BlogContent post={post} />;
};

export default BlogPostPage;
