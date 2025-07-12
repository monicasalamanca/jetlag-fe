import { fetchBlogPostFromLifestyle } from "@/api/client";
import BlogContent from "@/components/blog-content/blog-content";
import { notFound } from "next/navigation";

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) => {
  const { blogSlug } = await params;
  const postArray = await fetchBlogPostFromLifestyle(blogSlug);

  if (!postArray || postArray.length === 0) return notFound();

  const post = postArray[0];

  return <BlogContent post={post} />;
};

export default BlogPostPage;
