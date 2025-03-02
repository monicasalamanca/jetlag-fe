import { notFound } from "next/navigation";
import { fetchBlogPost } from "@/api/client";
import BlogContent from "@/components/blog-content/blog-content";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

type Params = Promise<{
  category: string;
  slug: string;
}>;

const BlogPostPage = async ({ params }: { params: Params }) => {
  const { category, slug } = await params;
  const post = await fetchBlogPost(category, slug);

  if (!post) return notFound();

  return (
    <>
      <Header />
      <BlogContent post={post[0]} />
      <Footer />
    </>
  );
};

export default BlogPostPage;
