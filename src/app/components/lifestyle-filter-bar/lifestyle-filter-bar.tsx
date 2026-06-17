"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import s from "./lifestyle-filter-bar.module.scss";

const PRIMARY_COUNT = 6;

interface LifestyleFilterBarProps {
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
  articleCount: number;
}

export default function LifestyleFilterBar({
  tags,
  activeTag,
  onTagChange,
  articleCount,
}: LifestyleFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const primaryTags = tags.slice(0, PRIMARY_COUNT);
  const secondaryTags = tags.slice(PRIMARY_COUNT);

  const handleTagClick = (tag: string | null) => {
    onTagChange(tag);
    const isSecondary = tag !== null && secondaryTags.includes(tag);
    if (isSecondary) setIsExpanded(true);
  };

  return (
    <div className={s.filterBar} aria-label="Filter articles">
      <div className={s.topSection}>
        <div className={s.row1}>
          <span className={s.filterLabel} aria-hidden="true">
            Filter By
          </span>
          <div className={s.pills} role="group" aria-label="Category filters">
            <button
              className={`${s.pill}${activeTag === null ? ` ${s.pillActive}` : ""}`}
              onClick={() => handleTagClick(null)}
              aria-pressed={activeTag === null}
            >
              All Topics
            </button>

            {primaryTags.map((tag) => (
              <button
                key={tag}
                className={`${s.pill}${activeTag === tag ? ` ${s.pillActive}` : ""}`}
                onClick={() => handleTagClick(tag)}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}

            {secondaryTags.length > 0 && (
              <button
                className={`${s.pill} ${s.pillMore}`}
                onClick={() => setIsExpanded((v) => !v)}
                aria-expanded={isExpanded}
                aria-controls="filter-secondary"
              >
                {isExpanded ? "Fewer Topics" : "More Topics"}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`${s.chevron}${isExpanded ? ` ${s.chevronExpanded}` : ""}`}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        </div>

        {secondaryTags.length > 0 && (
          <div
            id="filter-secondary"
            className={`${s.secondaryRowWrapper}${isExpanded ? ` ${s.secondaryRowWrapperExpanded}` : ""}`}
            aria-hidden={!isExpanded}
          >
            <div
              className={s.secondaryRow}
              role="group"
              aria-label="More category filters"
            >
              {secondaryTags.map((tag) => (
                <button
                  key={tag}
                  className={`${s.pill}${activeTag === tag ? ` ${s.pillActive}` : ""}`}
                  onClick={() => handleTagClick(tag)}
                  aria-pressed={activeTag === tag}
                  tabIndex={isExpanded ? 0 : -1}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={s.row2}>
        <span className={s.resultCount}>
          {articleCount} Article{articleCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
