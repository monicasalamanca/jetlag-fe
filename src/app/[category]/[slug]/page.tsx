"use client";

import { notFound, useParams } from "next/navigation";
import { fetchBlogPost } from "@/api/client";
import BlogContent from "@/components/blog-content/blog-content";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

type Params = {
  category: string;
  slug: string;
};

// eslint-disable-next-line @next/next/no-async-client-component
const BlogPostPage = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams();
  const { category, slug } = params as Params;
  const post = await fetchBlogPost(category, slug);

  if (!post) return notFound();

  return (
    <>
      <Header />
      <BlogContent post={post} />
      <Footer />
    </>
  );
};

export default BlogPostPage;
