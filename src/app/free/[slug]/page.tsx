import type { Metadata } from "next";
import { createMetadata } from "@/app/utils/metadata";
import PageSchemas from "@/components/seo/PageSchemas";
import { SITE_CONFIG } from "@/lib/seo/schema/config";
import SpecificGuidesLander from "@/app/components/specific-guide-lander/specific-guide-lander";
import { DetailedGuide } from "@/api/types";

type Props = {
  params: Promise<{ slug: string }>;
};

const MOCK_GUIDE: DetailedGuide = {
  id: 1,
  title: "Thailand Island Cost of Living 2026",
  slug: "thailand-island-cost-of-living",
  description:
    "What it really costs to live on Thailand's islands. Rent, food, transport, visas, and the hidden expenses that drain newcomers fast.",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  publishedAt: "2026-01-01T00:00:00.000Z",
  type: "single",
  pageCount: 24,
  priceCents: null,
  originalPriceCents: null,
  currency: "USD",
  isFeatured: true,
  isLifestyle: false,
  coverImage: {
    url: "https://res.cloudinary.com/jetlagchronicles/image/upload/home-hero_apo3zo.jpg",
    width: 800,
    height: 600,
    alternativeText: "Thailand island guide cover",
  },
  format: [{ id: 1, type: "PDF", lemonSqueezyUrl: "#" }],
  whoFor: [
    { id: 1, whoFor: "Digital nomads planning their first move to Thailand" },
    {
      id: 2,
      whoFor: "Remote workers comparing island costs before committing",
    },
    { id: 3, whoFor: "Expats tired of vague cost estimates online" },
  ],
  whoNotFor: [
    { id: 1, whoNotFor: "Tourists on a short holiday" },
    { id: 2, whoNotFor: "People not considering a longer stay" },
  ],
  whatsInside: [
    {
      id: 1,
      title: "Monthly rent breakdown",
      description: "Real rental prices by island and neighbourhood for 2026.",
      icon: "house",
    },
    {
      id: 2,
      title: "Food & dining costs",
      description:
        "Street food vs restaurants, groceries, and hidden splurges.",
      icon: "utensils",
    },
    {
      id: 3,
      title: "Visa options",
      description: "LTR, TR, METV — which visa fits your lifestyle and budget.",
      icon: "passport",
    },
    {
      id: 4,
      title: "Transport & getting around",
      description:
        "Scooter rentals, ferries, flights, and monthly transport costs.",
      icon: "car",
    },
  ],
  samplePages: [],
  includedInBundles: [],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return createMetadata({
    title: `${MOCK_GUIDE.title} | The Jet Lag Chronicles`,
    description: MOCK_GUIDE.description,
    url: `${SITE_CONFIG.url}/free/${slug}`,
    image: MOCK_GUIDE.coverImage.url,
  });
}

const FreeGuidePage = async ({ params }: Props) => {
  const { slug } = await params;

  return (
    <>
      <PageSchemas
        page={{
          url: `${SITE_CONFIG.url}/free/${slug}`,
          title: MOCK_GUIDE.title,
          description: MOCK_GUIDE.description,
          lang: "en",
          image: {
            url: MOCK_GUIDE.coverImage.url,
            width: MOCK_GUIDE.coverImage.width,
            height: MOCK_GUIDE.coverImage.height,
            alt: MOCK_GUIDE.coverImage.alternativeText ?? MOCK_GUIDE.title,
          },
        }}
        breadcrumbs={[
          { name: "Home", item: SITE_CONFIG.url, position: 1 },
          {
            name: "Free Guide",
            item: `${SITE_CONFIG.url}/free/${slug}`,
            position: 2,
          },
        ]}
      />

      <SpecificGuidesLander guide={MOCK_GUIDE} />
    </>
  );
};

export default FreeGuidePage;
