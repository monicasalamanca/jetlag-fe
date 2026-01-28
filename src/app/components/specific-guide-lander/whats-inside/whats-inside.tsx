"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconMap } from "@/app/components/country-facts-card/iconMap";
import { DetailedGuide } from "@/api/types";

import s from "./whats-inside.module.scss";

interface GuidePresentationProps {
  guide: DetailedGuide;
}

const WhatsInside = ({ guide }: GuidePresentationProps) => {
  // Hide section if whatsInside is empty or missing
  if (!guide.whatsInside || guide.whatsInside.length === 0) {
    return null;
  }

  return (
    <section className={s.whatsInside}>
      <div className={s.wrapper}>
        <h2>What&apos;s Inside</h2>
        <div className={s.contentsGrid}>
          {guide.whatsInside.map((item) => (
            <div key={item.id} className={s.card}>
              <div className={s.imageWrapper}>
                <FontAwesomeIcon
                  icon={iconMap[item.icon]}
                  className={`${s.icon} ${s.blue}`}
                />
              </div>
              <div className={s.contentWrapper}>
                <h3>{item.title}</h3>
                <p className={s.desc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsInside;
