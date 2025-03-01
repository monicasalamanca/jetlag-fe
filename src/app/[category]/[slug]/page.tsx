import { notFound } from "next/navigation";
import { fetchBlogPost } from "@/api/client";
import BlogContent from "@/components/blog-content/blog-content";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

type Params = {
  category: string;
  slug: string;
};

type Props = {
  params: Params;
};

export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = await fetchBlogPost(category, slug);

  if (!post) return notFound();

  return (
    <>
      <Header />
      <BlogContent post={post} />
      <Footer />
    </>
  );
}
