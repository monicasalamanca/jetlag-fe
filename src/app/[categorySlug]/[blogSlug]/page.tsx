import type { Metadata } from "next";
import { fetchBlogPost, fetchLatestBlogPosts } from "@/api/client";
import { notFound } from "next/navigation";
import BlogContent from "@/components/blog-content/blog-content";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "@/components/seo/PageSchemas";
import { SITE_CONFIG } from "@/lib/seo/schema/config";
import { toWordCount } from "@/lib/seo/schema/utils";
import YouMightAlsoLike from "@/components/you-might-also-like/you-might-also-like";

export const revalidate = 21600;

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
      url: `${SITE_CONFIG.url}/${categorySlug}/${blogSlug}`,
    });
  }

  const post = postArray[0];

  // Format country name for better readability
  const countryName = categorySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const baseTitle =
    post.title ||
    blogSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const metaTitle = post.seoTitle || `${countryName}: ${baseTitle}`;
  const metaDescription =
    post.seoDescription ||
    post.description?.slice(0, 160) ||
    post.content?.slice(0, 160) ||
    `Read this authentic travel story from The Jet Lag Chronicles about ${categorySlug.replace(/-/g, " ")}.`;

  return createMetadata({
    title: metaTitle,
    description: metaDescription,
    url: `${SITE_CONFIG.url}/${categorySlug}/${blogSlug}`,
    image: post.imageUrl || `${SITE_CONFIG.url}/country-og.jpg`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt || post.publishedAt,
    authors: [SITE_CONFIG.defaultAuthor.name],
    tags: post.tags?.length ? post.tags : [categorySlug.replace(/-/g, " ")],
  });
}

const BlogPostPage = async ({ params }: Props) => {
  const { categorySlug, blogSlug } = await params;
  const [postArray, allBlogs] = await Promise.all([
    fetchBlogPost(categorySlug, blogSlug),
    fetchLatestBlogPosts(),
  ]);

  if (!postArray || postArray.length === 0) return notFound();

  const post = postArray[0];

  // Format country name for breadcrumbs
  const countryName = categorySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  // Clean title for schema
  const baseTitle =
    post.title ||
    blogSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // Transform post data for article schema
  const articleData = {
    url: `${SITE_CONFIG.url}/${categorySlug}/${blogSlug}`,
    slug: blogSlug,
    title: baseTitle,
    description:
      post.seoDescription ||
      post.description?.slice(0, 160) ||
      post.content?.slice(0, 160) ||
      `Read this authentic travel story from The Jet Lag Chronicles about ${categorySlug.replace(/-/g, " ")}.`,
    cover: {
      url: post.imageUrl || `${SITE_CONFIG.url}/country-og.jpg`,
      width: post.imageWidth || 1200,
      height: post.imageHeight || 630,
      alt: baseTitle,
    },
    tags: post.tags?.length ? post.tags : [categorySlug.replace(/-/g, " ")],
    categories: [countryName],
    readingTimeMins: Math.ceil(toWordCount(post.content) / 200), // ~200 words per minute
    wordCount: toWordCount(post.content),
    country: countryName,
    datePublished: post.publishedAt || new Date().toISOString(),
    dateModified:
      post.updatedAt || post.publishedAt || new Date().toISOString(),
    author: {
      name: SITE_CONFIG.defaultAuthor.name,
      url: `${SITE_CONFIG.url}/about-us`,
    },
  };

  return (
    <>
      {/* Blog Post SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_CONFIG.url}/${categorySlug}/${blogSlug}`,
          title: baseTitle,
          description: articleData.description,
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
            name: countryName,
            item: `${SITE_CONFIG.url}/${categorySlug}`,
            position: 2,
          },
          {
            name: baseTitle,
            item: `${SITE_CONFIG.url}/${categorySlug}/${blogSlug}`,
            position: 3,
          },
        ]}
        article={articleData}
      />

      <BlogContent post={post} readingTimeMins={articleData.readingTimeMins} />

      <YouMightAlsoLike
        currentBlogSlug={blogSlug}
        currentBlogTags={
          post.tags?.length ? post.tags : [categorySlug.replace(/-/g, " ")]
        }
        currentBlogCountry={countryName}
        allBlogs={allBlogs ?? []}
      />
    </>
  );
};

export default BlogPostPage;
