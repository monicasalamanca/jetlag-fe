"use client";

import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { CardProps } from "@/components/cards/card.types";
import ArticleCard from "@/components/article-card/article-card";
import BlogSidebar from "@/components/blog-sidebar/blog-sidebar";
import SubscribeForm from "@/components/subscribe-form/subscribe-form";
import s from "./blog-filter-bar.module.scss";

const PAGE_SIZE = 8;

const TOPIC_PILLS = [
  { id: "visas", label: "VISAS", color: "#119CE8" },
  { id: "taxes", label: "TAXES", color: "#F5A623" },
  { id: "cost-of-living", label: "COST OF LIVING", color: "#22C55E" },
  { id: "lifestyle", label: "LIFESTYLE", color: "#FF5E3A" },
  { id: "banking", label: "BANKING", color: "#5DC8F5" },
  { id: "residency", label: "RESIDENCY", color: "#2B3A52" },
  { id: "best-of-lists", label: "BEST OF LISTS", color: "#F5A623" },
  { id: "bureaucracy", label: "BUREAUCRACY", color: "#8A96A6" },
  { id: "frameworks", label: "FRAMEWORKS", color: "#22C55E" },
];

const COUNTRY_PILLS = [
  { id: "thailand", label: "THAILAND", flag: "🇹🇭" },
  { id: "japan", label: "JAPAN", flag: "🇯🇵" },
  { id: "cambodia", label: "CAMBODIA", flag: "🇰🇭" },
  { id: "vietnam", label: "VIETNAM", flag: "🇻🇳" },
  { id: "sea-region", label: "SEA REGION", flag: "🌏" },
];

interface BlogFilterBarProps {
  articles: CardProps[];
}

function matchesCategory(article: CardProps, category: string): boolean {
  return (
    article.tags.some((t) => t.toLowerCase() === category) ||
    (article.category?.toLowerCase() ?? "") === category
  );
}

function matchesCountry(article: CardProps, country: string): boolean {
  return (
    (article.country?.toLowerCase().replace(/\s+/g, "-") ?? "") === country
  );
}

function matchesSearch(article: CardProps, query: string): boolean {
  const q = query.toLowerCase();
  return (
    article.title.toLowerCase().includes(q) ||
    article.description.toLowerCase().includes(q)
  );
}

export default function BlogFilterBar({ articles }: BlogFilterBarProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeCountry, setActiveCountry] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [visible, setVisible] = useState<number>(PAGE_SIZE);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [activeCategory, activeCountry, searchQuery, sortOrder]);

  const filteredArticles = useMemo(() => {
    const result = articles.filter((a) => {
      if (activeCategory !== "all" && !matchesCategory(a, activeCategory))
        return false;
      if (activeCountry !== "all" && !matchesCountry(a, activeCountry))
        return false;
      if (searchQuery && !matchesSearch(a, searchQuery)) return false;
      return true;
    });
    return [...result].sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sortOrder === "newest" ? db - da : da - db;
    });
  }, [articles, activeCategory, activeCountry, searchQuery, sortOrder]);

  const categoryCounts = useMemo(() => {
    const base = articles.filter((a) => {
      if (activeCountry !== "all" && !matchesCountry(a, activeCountry))
        return false;
      if (searchQuery && !matchesSearch(a, searchQuery)) return false;
      return true;
    });
    const counts: Record<string, number> = {};
    for (const pill of TOPIC_PILLS) {
      counts[pill.id] = base.filter((a) => matchesCategory(a, pill.id)).length;
    }
    return counts;
  }, [articles, activeCountry, searchQuery]);

  const countryCounts = useMemo(() => {
    const base = articles.filter((a) => {
      if (activeCategory !== "all" && !matchesCategory(a, activeCategory))
        return false;
      if (searchQuery && !matchesSearch(a, searchQuery)) return false;
      return true;
    });
    const counts: Record<string, number> = {};
    for (const pill of COUNTRY_PILLS) {
      counts[pill.id] = base.filter((a) => matchesCountry(a, pill.id)).length;
    }
    return counts;
  }, [articles, activeCategory, searchQuery]);

  function buildResultLabel(): string {
    const count = filteredArticles.length;
    const parts: string[] = [];
    if (activeCategory !== "all") {
      const pill = TOPIC_PILLS.find((p) => p.id === activeCategory);
      if (pill) parts.push(pill.label);
    }
    if (activeCountry !== "all") {
      const pill = COUNTRY_PILLS.find((p) => p.id === activeCountry);
      if (pill) parts.push(pill.label);
    }
    if (searchQuery) parts.push(`"${searchQuery.toUpperCase()}"`);
    const base = `${count} ARTICLE${count !== 1 ? "S" : ""}`;
    return parts.length > 0
      ? `${base} · FILTERED BY: ${parts.join(" · ")}`
      : base;
  }

  const visibleArticles = filteredArticles.slice(0, visible);
  const firstSix = visibleArticles.slice(0, 6);
  const remaining = visibleArticles.slice(6);
  const hasMore = visible < filteredArticles.length;
  const shownCount = Math.min(visible, filteredArticles.length);
  const remainingCount = filteredArticles.length - visible;

  return (
    <section aria-label="Browse and filter articles">
      {/* ── Sticky filter bar ── */}
      <div
        className={`${s.filterBar}${scrolled ? ` ${s.filterBarScrolled}` : ""}`}
      >
        {/* Row 1: search + count + sort */}
        <div className={s.row1}>
          <div className={s.searchWrap}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={s.searchIcon}
              aria-hidden="true"
            />
            <input
              type="search"
              className={s.searchInput}
              placeholder="Search dispatches..."
              aria-label="Search all articles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <kbd className={s.kbdBadge}>⌘K</kbd>
          </div>
          <span className={s.resultCount}>{buildResultLabel()}</span>
          <div className={s.sortControl}>
            <select
              aria-label="Sort articles"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "newest" | "oldest")
              }
            >
              <option value="newest">NEWEST FIRST</option>
              <option value="oldest">OLDEST FIRST</option>
            </select>
          </div>
        </div>

        {/* Row 2: pill groups */}
        <div className={s.row2} role="toolbar" aria-label="Article filters">
          <div className={s.pillGroup}>
            <span className={s.groupLabel}>TOPIC</span>
            <div className={s.pills}>
              <button
                className={`${s.fpill}${activeCategory === "all" ? ` ${s.fpillActive}` : ""}`}
                onClick={() => setActiveCategory("all")}
                aria-pressed={activeCategory === "all"}
              >
                ALL
              </button>
              {TOPIC_PILLS.map((pill) => (
                <button
                  key={pill.id}
                  className={`${s.fpill}${activeCategory === pill.id ? ` ${s.fpillActive}` : ""}`}
                  onClick={() => setActiveCategory(pill.id)}
                  aria-pressed={activeCategory === pill.id}
                >
                  <span
                    className={s.fpillDot}
                    style={{ backgroundColor: pill.color }}
                    aria-hidden="true"
                  />
                  {pill.label}
                  <span className={s.fpillCount}>
                    [{categoryCounts[pill.id] ?? 0}]
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className={s.divider} aria-hidden="true" />

          <div className={s.pillGroup}>
            <span className={s.groupLabel}>COUNTRY</span>
            <div className={s.pills}>
              {COUNTRY_PILLS.map((pill) => (
                <button
                  key={pill.id}
                  className={`${s.fpill}${activeCountry === pill.id ? ` ${s.fpillActive}` : ""}`}
                  onClick={() =>
                    setActiveCountry(
                      activeCountry === pill.id ? "all" : pill.id,
                    )
                  }
                  aria-pressed={activeCountry === pill.id}
                >
                  <span aria-hidden="true">{pill.flag}</span>
                  {pill.label}
                  <span className={s.fpillCount}>
                    [{countryCounts[pill.id] ?? 0}]
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column content area ── */}
      <div className={s.contentArea}>
        {/* 4A — Article column */}
        <div className={s.articleColumn}>
          <p className={s.eyebrow}>
            ALL ARTICLES — SHOWING {shownCount} OF {filteredArticles.length}
          </p>

          {filteredArticles.length === 0 ? (
            <p className={s.emptyState}>NO DISPATCHES MATCH YOUR FILTERS.</p>
          ) : (
            <div
              className={s.cardGrid}
              aria-live="polite"
              aria-label="Filtered articles"
            >
              {firstSix.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}

              {/* Inline newsletter — shown when there are more than 6 articles */}
              {filteredArticles.length > 6 && (
                <div className={s.inlineNewsletter}>
                  <div className={s.nlLeft}>
                    <p className={s.nlEyebrow}>FREE DISPATCH</p>
                    <h3 className={s.nlTitle}>THE DEBRIEF</h3>
                    <p className={s.nlDesc}>
                      The real side of life abroad, straight to your inbox when
                      it matters.
                    </p>
                  </div>
                  <SubscribeForm
                    buttonName="SUBSCRIBE FREE"
                    showName={true}
                    showIcon={false}
                    variant="download-guide"
                    trackEventName="blog_inline_newsletter"
                  />
                </div>
              )}

              {remaining.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}

              {/* Ghost card — last slot indicator when more articles remain */}
              {hasMore && (
                <div className={s.ghostCard} aria-hidden="true">
                  <span className={s.ghostCount}>+{remainingCount}</span>
                  <span className={s.ghostLabel}>MORE DISPATCHES</span>
                </div>
              )}
            </div>
          )}

          {hasMore && (
            <div className={s.loadMore}>
              <button
                className={s.loadMoreBtn}
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                aria-label={`Load more articles, currently showing ${shownCount} of ${filteredArticles.length}`}
              >
                LOAD MORE DISPATCHES
              </button>
              <p className={s.loadMoreMeta}>
                SHOWING {shownCount} OF {filteredArticles.length} ARTICLES
              </p>
            </div>
          )}
        </div>

        {/* 4B — Sidebar */}
        <BlogSidebar
          articles={articles}
          activeCountry={activeCountry}
          countryCounts={countryCounts}
          onCountryChange={setActiveCountry}
          onSearchChange={setSearchQuery}
        />
      </div>
    </section>
  );
}
