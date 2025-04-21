import { fetchBlogPost } from "@/api/client";
import BlogContent from "@/components/blog-content/blog-content";
import NotFoundPage from "../../not-found";

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ categorySlug: string; blogSlug: string }>;
}) => {
  const { categorySlug, blogSlug } = await params;
  const postArray = await fetchBlogPost(categorySlug, blogSlug);

  if (!postArray || postArray.length === 0) return <NotFoundPage />;

  const post = postArray[0];

  return <BlogContent post={post} />;
};

export default BlogPostPage;
