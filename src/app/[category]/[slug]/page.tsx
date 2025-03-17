import { notFound } from "next/navigation";
import { fetchBlogPost } from "@/api/client";
import BlogContent from "@/components/blog-content/blog-content";

type Params = Promise<{
  category: string;
  slug: string;
}>;

const BlogPostPage = async ({ params }: { params: Params }) => {
  const { category, slug } = await params;
  const post = await fetchBlogPost(category, slug);

  if (!post || !post.length) return notFound();

  return <BlogContent post={post[0]} />;
};

export default BlogPostPage;
