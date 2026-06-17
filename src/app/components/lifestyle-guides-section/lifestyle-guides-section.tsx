import Link from "next/link";
import Image from "next/image";
import { LifestyleGuide } from "@/api/types";
import s from "./lifestyle-guides-section.module.scss";

// Fallback gradient palette when no cover image is available.
const GUIDE_GRADIENTS: { from: string; to: string }[] = [
  { from: "#1a3d0c", to: "#c47c1a" },
  { from: "#0c3d1a", to: "#1a6e3d" },
  { from: "#3d1a0c", to: "#8b3513" },
];

// Static guide cards from the spec — shown when the API returns no guides yet.
const STATIC_GUIDES: LifestyleGuide[] = [
  {
    id: 1,
    title: "The Thailand Relocation Guide 2026",
    slug: "thailand",
    description:
      "The complete playbook for relocating to Thailand in 2026. Digital Nomad Visa process, the Bangkok vs Chiang Mai decision, neighborhood deep-dives, and a cost calculator to model your actual monthly budget.",
    type: "single",
    priceCents: 2900,
    currency: "USD",
    whatsInside: [
      { id: 1, title: "DTV Visa" },
      { id: 2, title: "Bangkok vs CM" },
      { id: 3, title: "Cost Calculator" },
      { id: 4, title: "Neighbourhood Map" },
    ],
  },
  {
    id: 2,
    title: "The Vietnam Relocation Guide 2026",
    slug: "vietnam",
    description:
      "A field guide for making Vietnam your base. E-visa process, Ho Chi Minh City vs Hanoi vs Da Nang breakdown, local banking for foreigners, and practical rental tips from people who've signed the leases.",
    type: "single",
    priceCents: 2900,
    currency: "USD",
    whatsInside: [
      { id: 1, title: "E-Visa Process" },
      { id: 2, title: "City Comparison" },
      { id: 3, title: "Banking Guide" },
      { id: 4, title: "Rental Tips" },
    ],
  },
  {
    id: 3,
    title: "The Cambodia Relocation Guide 2026",
    slug: "cambodia",
    description:
      "Everything you need to set up in Cambodia long-term. Long-stay visa options, Phnom Penh and Siem Reap neighborhood guides, expat cost tables, and the honest trade-offs most relocation content skips.",
    type: "single",
    priceCents: 2900,
    currency: "USD",
    whatsInside: [
      { id: 1, title: "Long-Stay Visa" },
      { id: 2, title: "Phnom Penh" },
      { id: 3, title: "Siem Reap" },
      { id: 4, title: "Cost Tables" },
    ],
  },
];

const COUNTRY_BADGES: { pattern: RegExp; badge: string }[] = [
  { pattern: /thailand/i, badge: "🇹🇭 Thailand" },
  { pattern: /vietnam/i, badge: "🇻🇳 Vietnam" },
  { pattern: /cambodia/i, badge: "🇰🇭 Cambodia" },
  { pattern: /philippines/i, badge: "🇵🇭 Philippines" },
  { pattern: /indonesia|bali/i, badge: "🇮🇩 Indonesia" },
  { pattern: /lisbon|portugal/i, badge: "🇵🇹 Portugal" },
  { pattern: /japan/i, badge: "🇯🇵 Japan" },
  { pattern: /malaysia|kuala lumpur/i, badge: "🇲🇾 Malaysia" },
  { pattern: /colombia|bogot/i, badge: "🇨🇴 Colombia" },
  { pattern: /spain|barcelona|madrid/i, badge: "🇪🇸 Spain" },
];

function deriveCountryBadge(title: string): string {
  for (const { pattern, badge } of COUNTRY_BADGES) {
    if (pattern.test(title)) return badge;
  }
  return "";
}

function formatPrice(
  type: string,
  priceCents: number | null,
  currency: string,
): string | null {
  if (type === "free") return "Free";
  if (priceCents === null) return null;
  const amount = priceCents / 100;
  if (currency === "USD" || !currency) return `$${amount}`;
  return `${currency} ${amount}`;
}

interface GuideCardProps {
  guide: LifestyleGuide;
  index: number;
}

function GuideCard({ guide, index }: GuideCardProps) {
  const countryBadge = deriveCountryBadge(guide.title);
  const includedTags = guide.whatsInside.slice(0, 4).map((w) => w.title);
  const price = formatPrice(guide.type, guide.priceCents, guide.currency);
  const gradient = GUIDE_GRADIENTS[index % GUIDE_GRADIENTS.length];

  return (
    <div className={s.card}>
      <div className={s.cardImg}>
        {guide.coverImageUrl ? (
          <Image
            src={guide.coverImageUrl}
            alt={guide.coverImageAlt || guide.title}
            fill
            sizes="(max-width: 900px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            className={s.cardImgInner}
            style={{
              background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
            }}
          />
        )}
        <div className={s.cardImgOverlay} />
        {price && <span className={s.priceBadge}>{price}</span>}
        {countryBadge && <span className={s.countryBadge}>{countryBadge}</span>}
      </div>

      <div className={s.cardBody}>
        <h3 className={s.cardTitle}>{guide.title}</h3>
        <p className={s.cardDesc}>{guide.description}</p>

        {includedTags.length > 0 && (
          <div className={s.includedTags} aria-label="What's included">
            {includedTags.map((tag) => (
              <span key={tag} className={s.includeTag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={s.cardFooter}>
          <Link href={`/guides/${guide.slug}`} className={s.btnPrimary}>
            Get the Guide
          </Link>
          <Link href={`/guides/${guide.slug}#preview`} className={s.btnPreview}>
            Preview
          </Link>
        </div>
      </div>
    </div>
  );
}

interface LifestyleGuidesSectionProps {
  guides: LifestyleGuide[];
}

export default function LifestyleGuidesSection({
  guides,
}: LifestyleGuidesSectionProps) {
  const displayGuides = guides.length > 0 ? guides : STATIC_GUIDES;

  return (
    <section className={s.section} aria-label="Relocation guides">
      <div className={s.glowDecor} aria-hidden="true" />

      <div className={s.header}>
        <div className={s.headerLeft}>
          <p className={s.eyebrow}>Paid Guides</p>
          <h2 className={s.title}>
            Move <span className={s.titleAccent}>Smarter</span>
          </h2>
          <p className={s.subtitle}>
            Step-by-step relocation playbooks built from first-hand experience,
            visa processes, cost breakdowns, neighborhood guides, and everything
            else we wish we&apos;d had before we moved.
          </p>
        </div>
        <Link href="/guides" className={s.allGuidesLink}>
          All Guides →
        </Link>
      </div>

      <div className={s.grid}>
        {displayGuides.map((guide, i) => (
          <GuideCard key={guide.slug} guide={guide} index={i} />
        ))}
      </div>
    </section>
  );
}
