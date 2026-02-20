import type { Metadata } from "next";
import LifestyleLander from "@/components/lifestyle-lander/lifestyle-lander";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "../../../components/seo/PageSchemas";
import { SITE_URL } from "../../../lib/seo/schema/utils";
import { fetchLatestBlogPosts } from "@/api/client";
import { BlogPost } from "@/api/types";
import { CardProps } from "@/app/components/cards/card.types";

// ISR: revalidate the lifestyle listing page every 2 days
export const revalidate = 172800;

export const metadata: Metadata = createMetadata({
  title: "Digital Nomad Lifestyle",
  description:
    "Discover the digital nomad lifestyle with The Jet Lag Chronicles. Learn about remote work, location independence, and creating a sustainable nomadic lifestyle.",
  url: "https://thejetlagchronicles.com/lifestyle",
  image: "https://thejetlagchronicles.com/lifestyle-og.jpg",
});

const mapBlogPostToCardProps = (blogPost: BlogPost): CardProps => {
  const tagsToUse =
    blogPost.tags.length > 0 ? blogPost.tags : ["travel", "blog"];

  const url = `/lifestyle/${blogPost.slug}`;

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
    country: "lifestyle",
    readTime: "5 mins",
    slug: blogPost.slug,
    url,
  };
};

export default async function LifestylePage() {
  const allPosts = await fetchLatestBlogPosts();
  const blogs: CardProps[] = allPosts
    .filter((post) => post.lifestyle === true)
    .map(mapBlogPostToCardProps);

  return (
    <>
      {/* Lifestyle Page SEO Schemas */}
      <PageSchemas
        page={{
          url: `${SITE_URL}/lifestyle`,
          title: "Digital Nomad Lifestyle",
          description:
            "Discover the digital nomad lifestyle with The Jet Lag Chronicles. Learn about remote work, location independence, and creating a sustainable nomadic lifestyle.",
          lang: "en",
          image: {
            url: "https://thejetlagchronicles.com/lifestyle-og.jpg",
            width: 1200,
            height: 630,
            alt: "Digital Nomad Lifestyle",
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_URL, position: 1 },
          { name: "Lifestyle", item: `${SITE_URL}/lifestyle`, position: 2 },
        ]}
      />

      <LifestyleLander blogs={blogs} />
    </>
  );
}
