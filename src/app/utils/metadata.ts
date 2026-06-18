import { Metadata } from "next";
import { normalizeUrl } from "./canonicalUrl";
import { SITE_CONFIG } from "@/lib/seo/schema/config";

interface CreateMetadataProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  authors?: string[];
}

export function createMetadata({
  title,
  description,
  url,
  image = `${SITE_CONFIG.url}/default-og.jpg`,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
  authors,
}: CreateMetadataProps): Metadata {
  const fullTitle = title.includes("The Jet Lag Chronicles")
    ? title
    : `${title} | The Jet Lag Chronicles`;

  // Ensure canonical URL is properly formatted and consistent with redirects
  const canonicalUrl = normalizeUrl(url);

  return {
    title: { absolute: fullTitle },
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: "The Jet Lag Chronicles",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
      publishedTime,
      modifiedTime,
      authors,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
