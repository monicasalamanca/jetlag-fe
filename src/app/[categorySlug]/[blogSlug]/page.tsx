import type { Metadata } from "next";
import { fetchBlogPost } from "@/api/client";
import { notFound } from "next/navigation";
import BlogContent from "@/components/blog-content/blog-content";
import { createMetadata } from "@/app/utils/metadata";

type Props = {
  params: Promise<{ categorySlug: string; blogSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, blogSlug } = await params;
  const postArray = await fetchBlogPost(categorySlug, blogSlug);

  if (!postArray || postArray.length === 0) {
    const formattedTitle = blogSlug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return createMetadata({
      title: `${formattedTitle} - Post Not Found`,
      description:
        "The blog post you're looking for could not be found. Explore our other travel stories and destination guides.",
      url: `https://thejetlagchronicles.com/${categorySlug}/${blogSlug}`,
    });
  }

  const post = postArray[0];

  // Format country name for better readability
  const countryName = categorySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  // Clean, concise title with country prefix for better GA tracking
  const baseTitle =
    post.title ||
    blogSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const cleanTitle = `${countryName}: ${baseTitle}`;

  // Add debugging
  console.log("🔍 DEBUG - Post data:", {
    postImageUrl: post.imageUrl,
    postTitle: post.title,
    hasImages: !!post.imageUrl,
  });

  const description =
    post.description ||
    post.content?.slice(0, 160) ||
    `Read this authentic travel story from The Jet Lag Chronicles about ${categorySlug.replace(/-/g, " ")}.`;

  return createMetadata({
    title: cleanTitle,
    description,
    url: `https://thejetlagchronicles.com/${categorySlug}/${blogSlug}`,
    image: post.imageUrl || `https://thejetlagchronicles.com/country-og.jpg`,
    type: "article",
    publishedTime: post.publishedAt,
    authors: ["The Jet Lag Chronicles"],
    tags: [categorySlug.replace(/-/g, " ")],
  });
}

const BlogPostPage = async ({ params }: Props) => {
  const { categorySlug, blogSlug } = await params;
  const postArray = await fetchBlogPost(categorySlug, blogSlug);

  if (!postArray || postArray.length === 0) return notFound();

  const post = postArray[0];

  return (
    <>
      <BlogContent post={post} />
    </>
  );
};

export default BlogPostPage;
