import type { Metadata } from "next";
import { fetchBlogPostFromLifestyle } from "@/api/client";
import BlogContent from "@/components/blog-content/blog-content";
import { notFound } from "next/navigation";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../../components/seo/PageSchemas";
import { SITE_CONFIG } from "../../../../lib/seo/schema/config";
import { toWordCount } from "../../../../lib/seo/schema/utils";

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
    image: post.imageUrl || `https://thejetlagchronicles.com/lifestyle-og.jpg`,
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

  const title =
    post.title ||
    blogSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const description =
    post.description ||
    post.content?.slice(0, 160) ||
    `Discover insights about the digital nomad lifestyle from The Jet Lag Chronicles.`;

  // Transform post data for article schema
  const articleData = {
    url: `${SITE_CONFIG.url}/lifestyle/${blogSlug}`,
    slug: blogSlug,
    title: title,
    description: description,
    cover: {
      url: post.imageUrl || `${SITE_CONFIG.url}/lifestyle-og.jpg`,
      width: 1200,
      height: 630,
      alt: title,
    },
    tags: ["lifestyle", "digital nomad"],
    categories: ["Lifestyle"],
    readingTimeMins: Math.ceil(toWordCount(post.content) / 200),
    wordCount: toWordCount(post.content),
    datePublished: post.publishedAt || new Date().toISOString(),
    dateModified: post.publishedAt || new Date().toISOString(),
    author: {
      name: SITE_CONFIG.defaultAuthor.name,
      url: `${SITE_CONFIG.url}/about-us`,
    },
  };

  return (
    <>
      {/* Lifestyle Blog Post SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_CONFIG.url}/lifestyle/${blogSlug}`,
          title: title,
          description: description,
          lang: "en",
          image: {
            url: articleData.cover.url,
            width: articleData.cover.width,
            height: articleData.cover.height,
            alt: articleData.cover.alt,
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_CONFIG.url, position: 1 },
          {
            name: "Lifestyle",
            item: `${SITE_CONFIG.url}/lifestyle`,
            position: 2,
          },
          {
            name: title,
            item: `${SITE_CONFIG.url}/lifestyle/${blogSlug}`,
            position: 3,
          },
        ]}
        article={articleData}
      />

      <BlogContent post={post} />
    </>
  );
};

export default BlogPostPage;
