import type { Metadata } from "next";
import { fetchBlogPostFromLifestyle } from "@/api/client";
import BlogContent from "@/components/blog-content/blog-content";
import { notFound } from "next/navigation";
import { createMetadata } from "@/app/utils/metadata";

type Props = {
  params: Promise<{ blogSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogSlug } = await params;
  const postArray = await fetchBlogPostFromLifestyle(blogSlug);

  if (!postArray || postArray.length === 0) {
    const formattedTitle = blogSlug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return createMetadata({
      title: `${formattedTitle} - Lifestyle Post Not Found`,
      description:
        "The lifestyle post you're looking for could not be found. Explore our other digital nomad lifestyle content and guides.",
      url: `https://thejetlagchronicles.com/lifestyle/${blogSlug}`,
    });
  }

  const post = postArray[0];
  const title =
    post.title ||
    blogSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const description =
    post.description ||
    post.content?.slice(0, 160) ||
    `Discover insights about the digital nomad lifestyle from The Jet Lag Chronicles.`;

  return createMetadata({
    title,
    description,
    url: `https://thejetlagchronicles.com/lifestyle/${blogSlug}`,
    image: `https://thejetlagchronicles.com/lifestyle-og.jpg`,
    type: "article",
    publishedTime: post.publishedAt,
    authors: ["The Jet Lag Chronicles"],
    tags: ["lifestyle", "digital nomad"],
  });
}

const BlogPostPage = async ({ params }: Props) => {
  const { blogSlug } = await params;
  const postArray = await fetchBlogPostFromLifestyle(blogSlug);

  if (!postArray || postArray.length === 0) return notFound();

  const post = postArray[0];

  return <BlogContent post={post} />;
};

export default BlogPostPage;
