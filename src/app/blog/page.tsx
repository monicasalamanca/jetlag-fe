import type { Metadata } from "next";
import ChronicleContent from "@/components/chronicle-content/chronicle-content";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../components/seo/PageSchemas";
import { SITE_URL } from "../../../lib/seo/schema/utils";
import { fetchLatestBlogPosts } from "@/api/client";
import { BlogPost } from "@/api/types";
import { CardProps } from "@/components/cards/card.types";

// ISR: revalidate the blog listing page every 2 days
export const revalidate = 172800;

export const metadata: Metadata = createMetadata({
  title: "Travel Chronicles and Guides",
  description:
    "Discover authentic travel stories, destination guides, and practical tips from experienced travelers. Explore our collection of travel chronicles and find inspiration for your next adventure.",
  url: "https://thejetlagchronicles.com/blog",
  image: "https://thejetlagchronicles.com/blog-og.jpg",
});

const mapBlogPostToCardProps = (blogPost: BlogPost): CardProps => {
  const tagsToUse =
    blogPost.tags.length > 0 ? blogPost.tags : ["travel", "blog"];

  let url = "";
  let countryToUse = "";

  if (blogPost.lifestyle) {
    url = `/lifestyle/${blogPost.slug}`;
    countryToUse = "lifestyle";
  } else if (blogPost.country) {
    countryToUse = blogPost.country;
    url = `/${countryToUse.toLowerCase().replace(/\s+/g, "-")}/${blogPost.slug}`;
  } else {
    url = `/${blogPost.slug}`;
  }

  return {
    title: blogPost.title,
    description: blogPost.description,
    thumbnail: blogPost.imageUrl || "/placeholder-image.jpg",
    tags: tagsToUse,
    date: new Date(blogPost.publishedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    country: countryToUse,
    readTime: "5 mins",
    slug: blogPost.slug,
    url,
  };
};

export default async function Blog() {
  const blogData = await fetchLatestBlogPosts();
  const blogs: CardProps[] = blogData.map(mapBlogPostToCardProps);

  return (
    <>
      {/* Page-specific SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_URL}/blog`,
          title: "Travel Chronicles and Guides",
          description:
            "Discover authentic travel stories, destination guides, and practical tips from experienced travelers. Explore our collection of travel chronicles and find inspiration for your next adventure.",
          lang: "en",
          image: {
            url: "https://thejetlagchronicles.com/blog-og.jpg",
            width: 1200,
            height: 630,
            alt: "The Jet Lag Chronicles Blog",
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_URL, position: 1 },
          { name: "Blog", item: `${SITE_URL}/blog`, position: 2 },
        ]}
      />

      <ChronicleContent blogs={blogs} />
    </>
  );
}
