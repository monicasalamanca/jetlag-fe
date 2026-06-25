"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CardProps } from "@/components/cards/card.types";
import s from "./blog-sidebar.module.scss";

const COUNTRY_PILLS = [
  { id: "thailand", label: "Thailand", flag: "🇹🇭" },
  { id: "japan", label: "Japan", flag: "🇯🇵" },
  { id: "cambodia", label: "Cambodia", flag: "🇰🇭" },
  { id: "vietnam", label: "Vietnam", flag: "🇻🇳" },
  { id: "sea-region", label: "SEA Region", flag: "🌏" },
];

const GUIDES = [
  {
    country: "Thailand",
    flag: "🇹🇭",
    slug: "thailand",
    updated: "Jun 2026",
    price: "$29",
  },
  {
    country: "Vietnam",
    flag: "🇻🇳",
    slug: "vietnam",
    updated: "Apr 2026",
    price: "$29",
  },
  {
    country: "Cambodia",
    flag: "🇰🇭",
    slug: "cambodia",
    updated: "Mar 2026",
    price: "$29",
  },
];

// Placeholder affiliate links — replace with real tracking URLs (open item #6)
const PARTNERS = [
  { name: "Wise", desc: "Send money abroad", href: "#" },
  { name: "SafetyWing", desc: "Health insurance", href: "#" },
  { name: "Airalo", desc: "eSIM for travelers", href: "#" },
  { name: "Booking.com", desc: "Accommodation", href: "#" },
];

interface BlogSidebarProps {
  articles: CardProps[];
  activeCountry: string;
  countryCounts: Record<string, number>;
  onCountryChange: (country: string) => void;
  onSearchChange: (query: string) => void;
}

export default function BlogSidebar({
  articles,
  activeCountry,
  countryCounts,
  onCountryChange,
  onSearchChange,
}: BlogSidebarProps) {
  const topTags = useMemo(() => {
    const freq = articles
      .flatMap((a) => a.tags)
      .reduce<Record<string, number>>((acc, tag) => {
        acc[tag] = (acc[tag] ?? 0) + 1;
        return acc;
      }, {});
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([tag]) => tag);
  }, [articles]);

  return (
    <aside className={s.sidebar}>
      {/* ── Card 1: Relocation Guides ── */}
      <div className={s.sidebarCard}>
        <div className={s.cardHeader}>
          <span className={s.cardTitle}>Relocation Guides</span>
        </div>
        <div className={s.guidesList}>
          {GUIDES.map((g) => (
            <div key={g.slug} className={s.guideRow}>
              <div className={s.guideFlagBox}>{g.flag}</div>
              <div className={s.guideInfo}>
                <div className={s.guideName}>{g.country} Guide</div>
                <div className={s.guideSub}>Updated {g.updated}</div>
              </div>
              <span className={s.guidePrice}>{g.price}</span>
            </div>
          ))}
        </div>
        <Link href="/guides" className={s.guideCta}>
          Browse All Guides →
        </Link>
      </div>

      {/* ── Card 2: Filter by Country ── */}
      <div className={s.sidebarCard}>
        <div className={s.cardHeader}>
          <span className={s.cardTitle}>Browse by Country</span>
        </div>
        <div className={s.countryList}>
          {COUNTRY_PILLS.map((pill) => (
            <button
              key={pill.id}
              className={`${s.countryRow}${activeCountry === pill.id ? ` ${s.countryRowActive}` : ""}`}
              onClick={() =>
                onCountryChange(activeCountry === pill.id ? "all" : pill.id)
              }
              aria-pressed={activeCountry === pill.id}
            >
              <span className={s.countryFlag}>{pill.flag}</span>
              <span className={s.countryName}>{pill.label}</span>
              <span className={s.countryCount}>
                {countryCounts[pill.id] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Card 3: Trusted Partners ── */}
      <div className={s.sidebarCard}>
        <div className={s.cardHeader}>
          <span className={s.cardTitle}>Trusted Partners</span>
        </div>
        <div className={s.partnersGrid}>
          {PARTNERS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              className={s.partnerCell}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={s.partnerName}>{p.name}</span>
              <span className={s.partnerDesc}>{p.desc}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Card 4: Browse by Tag ── */}
      {topTags.length > 0 && (
        <div className={s.sidebarCard}>
          <div className={s.cardHeader}>
            <span className={s.cardTitle}>Browse by Tag</span>
          </div>
          <div className={s.tagCloud}>
            {topTags.map((tag) => (
              <button
                key={tag}
                className={s.tagChip}
                onClick={() => onSearchChange(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
