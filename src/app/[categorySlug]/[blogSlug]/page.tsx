import { fetchBlogPost } from "@/api/client";
import { notFound } from "next/navigation";
import BlogContent from "@/components/blog-content/blog-content";

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ categorySlug: string; blogSlug: string }>;
}) => {
  const { categorySlug, blogSlug } = await params;
  const postArray = await fetchBlogPost(categorySlug, blogSlug);

  if (!postArray || postArray.length === 0) return notFound();

  const post = postArray[0];

  return <BlogContent post={post} />;
};

export default BlogPostPage;
