import s from "./lifestyle-affiliate-section.module.scss";

interface AffiliatePartner {
  name: string;
  category: string;
  logoColor: string;
  logoText: string;
  logoFontSize?: string;
  description: string;
  perks: string[];
  ctaText: string;
  ctaNote: string;
}

const PARTNERS: AffiliatePartner[] = [
  {
    name: "Wise",
    category: "International Money Transfers",
    logoColor: "#2AB076",
    logoText: "W",
    description:
      "We've moved money across 14 countries with Wise. The mid-market rate means you're not getting quietly fleeced on every transfer — which adds up fast when you're paying international rent or invoicing clients in different currencies.",
    perks: [
      "Mid-market exchange rate, no markup",
      "Hold 50+ currencies in one account",
      "Local bank details in 10+ countries",
      "Transparent fees shown upfront",
    ],
    ctaText: "Open a Wise Account →",
    ctaNote: "Free to join · No min. balance",
  },
  {
    name: "SafetyWing",
    category: "Nomad Health Insurance",
    logoColor: "#1F4ED8",
    logoText: "SW",
    description:
      "Health coverage that actually follows you across borders. We've used it in Thailand and Malaysia — claims were straightforward and monthly billing means you can pause when you're back home. Solid for active nomads.",
    perks: [
      "Covers medical emergencies in 185+ countries",
      "Monthly billing — cancel anytime",
      "Hospital and GP visits covered",
      "Optional US coverage add-on",
    ],
    ctaText: "Get Nomad Insurance →",
    ctaNote: "From $1.99/day · No commitment",
  },
  {
    name: "Airalo",
    category: "eSIM Data Plans",
    logoColor: "#F97316",
    logoText: "A",
    description:
      "eSIMs are the only sane option when you're hopping countries. Airalo's marketplace has plans for 200+ destinations — we activate before landing and skip the SIM card hunt at every airport entirely.",
    perks: [
      "200+ countries and regions covered",
      "Instant setup — no physical SIM swap",
      "Top up without changing your number",
      "Competitive data-only plans from $4.50",
    ],
    ctaText: "Get Your eSIM →",
    ctaNote: "From $4.50 · Instant activation",
  },
  {
    name: "Booking.com",
    category: "Accommodation",
    logoColor: "#003580",
    logoText: "B.",
    logoFontSize: "14px",
    description:
      "We use Booking.com specifically for the monthly-stay filter. Most people miss it — but it's the fastest way to find furnished apartments when you're scouting a new city before committing to a long-term lease.",
    perks: [
      "Monthly-stay filter for extended trips",
      "Free cancellation on most listings",
      "Scout neighbourhoods before committing",
      "No booking fees or hidden charges",
    ],
    ctaText: "Search Monthly Stays →",
    ctaNote: "Free to use · No booking fees",
  },
];

function AffiliateCard({
  name,
  category,
  logoColor,
  logoText,
  logoFontSize,
  description,
  perks,
  ctaText,
  ctaNote,
}: AffiliatePartner) {
  return (
    <div className={s.card}>
      <div className={s.cardHeader}>
        <div className={s.logoArea}>
          <div className={s.logoBox} style={{ background: logoColor }}>
            <span style={logoFontSize ? { fontSize: logoFontSize } : undefined}>
              {logoText}
            </span>
          </div>
          <div>
            <p className={s.logoName}>{name}</p>
            <p className={s.logoCategory}>{category}</p>
          </div>
        </div>
        <span className={s.usedBadge}>✓ We use this</span>
      </div>

      <p className={s.desc}>{description}</p>

      <ul className={s.perks} aria-label={`${name} highlights`}>
        {perks.map((perk) => (
          <li key={perk} className={s.perk}>
            <span className={s.perkDot} aria-hidden="true" />
            {perk}
          </li>
        ))}
      </ul>

      <div className={s.cta}>
        <a
          href="#"
          className={s.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${ctaText} (opens in new tab)`}
        >
          {ctaText}
        </a>
        <span className={s.ctaNote}>{ctaNote}</span>
      </div>
    </div>
  );
}

export default function LifestyleAffiliateSection() {
  return (
    <section className={s.section} aria-label="Tools we actually use">
      <div className={s.introRow}>
        <div className={s.introLeft}>
          <p className={s.eyebrow}>Tools We Actually Use</p>
          <h2 className={s.title}>
            The <span className={s.titleAccent}>Honest</span> Toolkit
          </h2>
          <p className={s.subtitle}>
            Every tool below is something we use ourselves. No cold pitches, no
            pay-to-play placement — just the apps and services that have made
            nomadic life cheaper, safer, and less chaotic over four-plus years
            on the road.
          </p>
        </div>
        <span className={s.disclosureBadge} aria-label="Affiliate disclosure">
          ⚡ Affiliate disclosure
        </span>
      </div>

      <div className={s.grid}>
        {PARTNERS.map((partner) => (
          <AffiliateCard key={partner.name} {...partner} />
        ))}
      </div>
    </section>
  );
}
