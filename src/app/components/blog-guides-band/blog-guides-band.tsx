import Link from "next/link";
import Image from "next/image";
import { LifestyleGuide } from "@/api/types";
import s from "./blog-guides-band.module.scss";

const COUNTRY_META: Record<string, { flag: string; label: string }> = {
  thailand: { flag: "🇹🇭", label: "Thailand" },
  vietnam: { flag: "🇻🇳", label: "Vietnam" },
  cambodia: { flag: "🇰🇭", label: "Cambodia" },
  japan: { flag: "🇯🇵", label: "Japan" },
  malaysia: { flag: "🇲🇾", label: "Malaysia" },
  indonesia: { flag: "🇮🇩", label: "Indonesia" },
  philippines: { flag: "🇵🇭", label: "Philippines" },
  colombia: { flag: "🇨🇴", label: "Colombia" },
  portugal: { flag: "🇵🇹", label: "Portugal" },
  spain: { flag: "🇪🇸", label: "Spain" },
};

const FALLBACK_GRADIENTS = [
  { from: "#0c3d1a", to: "#1a6e3d" },
  { from: "#0d2a52", to: "#1a5296" },
  { from: "#3d1a0c", to: "#8b3513" },
];

function formatPrice(
  type: string,
  priceCents: number | null,
  currency: string,
): string | null {
  if (type === "free") return "FREE";
  if (priceCents === null) return null;
  return currency === "USD" || !currency
    ? `$${priceCents}`
    : `${currency} ${priceCents}`;
}

function getPriceSuffix(type: string): string | null {
  if (type === "free") return null;
  if (type === "bundle") return "BUNDLE";
  return "ONE-TIME";
}

function formatUpdated(updatedAt?: string): string {
  if (!updatedAt) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(updatedAt));
}

function getCountryMeta(slug: string): { flag: string; label: string } {
  return COUNTRY_META[slug.toLowerCase()] ?? { flag: "🌍", label: slug };
}

// Static fallback for when the API returns nothing
const STATIC_GUIDES: LifestyleGuide[] = [
  {
    id: 1,
    title: "Thailand Relocation Guide 2026",
    slug: "thailand",
    description:
      "The complete playbook for relocating to Thailand in 2026. DTV Visa process, Bangkok vs Chiang Mai, neighbourhood deep-dives, and a cost calculator to model your actual monthly budget.",
    type: "bundle",
    priceCents: 29,
    originalPriceCents: 29,
    currency: "USD",
    whatsInside: [],
  },
  {
    id: 2,
    title: "Vietnam Relocation Guide 2026",
    slug: "vietnam",
    description:
      "A field guide for making Vietnam your base. E-visa process, Ho Chi Minh vs Hanoi vs Da Nang, local banking for foreigners, and practical rental tips from people who've signed the leases.",
    type: "bundle",
    priceCents: 29,
    originalPriceCents: 29,
    currency: "USD",
    whatsInside: [],
  },
  {
    id: 3,
    title: "Cambodia Relocation Guide 2026",
    slug: "cambodia",
    description:
      "Everything you need to set up in Cambodia long-term. Long-stay visa options, Phnom Penh and Siem Reap guides, expat cost tables, and the honest trade-offs most relocation content skips.",
    type: "bundle",
    priceCents: 29,
    originalPriceCents: 29,
    currency: "USD",
    whatsInside: [],
  },
];

interface BlogGuidesBandProps {
  guides: LifestyleGuide[];
}

export default function BlogGuidesBand({ guides }: BlogGuidesBandProps) {
  const displayGuides = guides.length > 0 ? guides : STATIC_GUIDES;

  return (
    <section className={s.section} aria-label="Relocation guides">
      <div className={s.header}>
        <div className={s.headerLeft}>
          <h2 className={s.headline}>
            GO <span className={s.blue}>DEEPER.</span>
            <br />
            BUY THE GUIDE.
          </h2>
          <p className={s.subhead}>
            Paid relocation intelligence — one-time purchase. No subscription.
            No fluff.
          </p>
        </div>
        <Link href="/guides" className={s.allGuidesLink}>
          ALL GUIDES AT /GUIDES →
        </Link>
      </div>

      <div className={s.grid}>
        {displayGuides.map((guide, i) => {
          const { flag, label } = getCountryMeta(guide.slug);
          const gradient = FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length];
          const price = formatPrice(
            guide.type,
            guide.originalPriceCents,
            guide.currency,
          );
          const priceSuffix = getPriceSuffix(guide.type);
          const updated = formatUpdated(guide.updatedAt);

          return (
            <div key={guide.slug} className={s.card}>
              <div className={s.cardImg}>
                {guide.coverImageUrl ? (
                  <Image
                    src={guide.coverImageUrl}
                    alt={guide.coverImageAlt || guide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={s.cardImgEl}
                  />
                ) : (
                  <div
                    className={s.cardGradient}
                    style={{
                      background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                    }}
                  />
                )}
                <div className={s.cardImgOverlay} />
              </div>

              <div className={s.cardBody}>
                <p className={s.cardMeta}>
                  {flag} {label.toUpperCase()}
                  {updated && ` — UPDATED ${updated.toUpperCase()}`}
                </p>
                <h3 className={s.cardTitle}>{guide.title}</h3>
                <p className={s.cardDesc}>{guide.description}</p>
                <div className={s.cardDivider} aria-hidden="true" />
                <div className={s.cardFooter}>
                  {price !== null && (
                    <div className={s.priceBlock}>
                      <span className={s.price}>{price}</span>
                      {priceSuffix && (
                        <span className={s.priceSuffix}>{priceSuffix}</span>
                      )}
                    </div>
                  )}
                  <Link href={`/guides/${guide.slug}`} className={s.buyBtn}>
                    BUY GUIDE →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
