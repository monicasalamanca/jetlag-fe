"use client";

import { useParams } from "next/navigation";

import BlogContent from "@/components/blog-content/blog-content";

export default function BlogPostPage() {
  const { category, slug } = useParams<{
    category: string;
    slug: string;
  }>();

  return (
    <main>
      <BlogContent category={category} slug={slug} />
    </main>
  );
}
