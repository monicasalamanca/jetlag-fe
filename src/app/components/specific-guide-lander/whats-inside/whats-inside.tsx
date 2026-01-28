'use client"';

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faMapLocation,
  faPassport,
  faShieldHalved,
  faTrain,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

import s from "./whats-inside.module.scss";

const WhatsInside = () => {
  return (
    <section className={s.whatsInside}>
      <div className={s.wrapper}>
        <h2>What&apos;s Inside</h2>
        <div className={s.contentsGrid}>
          <div className={s.card}>
            <div className={s.imageWrapper}>
              <FontAwesomeIcon
                icon={faDollarSign}
                className={`${s.icon} ${s.blue}`}
              />
            </div>
            <div className={s.contentWrapper}>
              <h3>Cost of Living Breakdowns</h3>
              <p className={s.desc}>
                Real numbers for rent, food, transport, utilities and
                entertainment. Monthly budgets for different lifestyles.
              </p>
            </div>
          </div>
          <div className={s.card}>
            <div className={s.imageWrapper}>
              <FontAwesomeIcon
                icon={faMapLocation}
                className={`${s.icon} ${s.blue}`}
              />
            </div>
            <div className={s.contentWrapper}>
              <h3>Best Neighborhoods</h3>
              <p className={s.desc}>
                Honest pros and cons of every major area. Where to live based on
                your prioritoes and budget.
              </p>
            </div>
          </div>
          <div className={s.card}>
            <div className={s.imageWrapper}>
              <FontAwesomeIcon
                icon={faShieldHalved}
                className={`${s.icon} ${s.blue}`}
              />
            </div>
            <div className={s.contentWrapper}>
              <h3>Common Scams and Mistakes</h3>
              <p className={s.desc}>
                What to watch out for, how to avoid getting ripped off, and
                lessons learned the hard way.
              </p>
            </div>
          </div>
          <div className={s.card}>
            <div className={s.imageWrapper}>
              <FontAwesomeIcon
                icon={faTrain}
                className={`${s.icon} ${s.blue}`}
              />
            </div>
            <div className={s.contentWrapper}>
              <h3>Transportation Realities</h3>
              <p className={s.desc}>
                How to actually get around. BTS, MRT, taxis, Grab, motorbikes.
                What works and what doesn&apos;t.
              </p>
            </div>
          </div>
          <div className={s.card}>
            <div className={s.imageWrapper}>
              <FontAwesomeIcon
                icon={faPassport}
                className={`${s.icon} ${s.blue}`}
              />
            </div>
            <div className={s.contentWrapper}>
              <h3>Visa and Stay Logistics</h3>
              <p className={s.desc}>
                Visa options, extensions, and how to stay legal without
                headaches.
              </p>
            </div>
          </div>
          <div className={s.card}>
            <div className={s.imageWrapper}>
              <FontAwesomeIcon
                icon={faWifi}
                className={`${s.icon} ${s.blue}`}
              />
            </div>
            <div className={s.contentWrapper}>
              <h3>Lifestyle and Realities</h3>
              <p className={s.desc}>
                Internet speeds, noise levels, cultural quirks, bureaucracy,and
                what daily life really feels like.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsInside;
