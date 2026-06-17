"use client";

import { useState, FormEvent } from "react";
import { trackFormSubmission } from "@/app/utils/analytics";
import s from "./lifestyle-newsletter-section.module.scss";

const PERKS = [
  "Visa news, cost shifts, and relocation intel before it spreads",
  "First-hand takes from people actually living abroad",
  "No drip campaigns, no sponsored content, no nonsense",
];

export default function LifestyleNewsletterSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const botField = formData.get("botField") as string;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          botField,
          event: "submit",
          timestamp: Date.now(),
        }),
      });

      trackFormSubmission({
        formName: "Lifestyle Newsletter Section",
        location: window.location.pathname,
        success: res.status === 200,
      });

      if (res.status === 200) {
        setIsSuccess(true);
        setName("");
        setEmail("");
      }
    } catch (error) {
      trackFormSubmission({
        formName: "Lifestyle Newsletter Section",
        location: window.location.pathname,
        success: false,
        errorMessage: String(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={s.wrapper} aria-label="Newsletter signup">
      <div className={s.inner}>
        {/* Left panel — dark island */}
        <div className={s.left}>
          <div className={s.glowDecor} aria-hidden="true" />
          <span className={s.ghostText} aria-hidden="true">
            INTEL
          </span>

          <div className={s.leftContent}>
            <div className={s.eyebrow}>
              <span className={s.eyebrowRule} aria-hidden="true" />
              Stay in the Loop
            </div>

            <h2 className={s.title}>
              Honest
              <br />
              <span className={s.titleAccent}>Intel</span>
              <br />
              Zero
              <br />
              Noise
            </h2>

            <p className={s.desc}>
              Relocation reads, visa updates, and cost of living moves, curated
              when we have something worth saying.{" "}
              <strong className={s.descStrong}>No BS. No filler.</strong>
            </p>
          </div>
        </div>

        {/* Right panel — form */}
        <div className={s.right}>
          {isSuccess ? (
            <div className={s.successState}>
              <div className={s.successIcon}>✓</div>
              <h3 className={s.successTitle}>You&apos;re in!</h3>
              <p className={s.successMsg}>
                Check your inbox. Your first dispatch is on its way.
              </p>
            </div>
          ) : (
            <>
              <p className={s.readerLabel}>
                Join readers making smarter relocation decisions
              </p>

              <form onSubmit={handleSubmit} className={s.form}>
                {/* Honeypot — bots fill this, real users don't */}
                <input
                  type="text"
                  name="botField"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className={s.formGroup}>
                  <label htmlFor="nl-name" className={s.label}>
                    Name
                  </label>
                  <input
                    id="nl-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your first name"
                    className={s.input}
                    disabled={isSubmitting}
                    autoComplete="given-name"
                  />
                </div>

                <div className={s.formGroup}>
                  <label htmlFor="nl-email" className={s.label}>
                    Email
                  </label>
                  <input
                    id="nl-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={s.input}
                    required
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                </div>

                <button
                  type="submit"
                  className={s.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe →"}
                </button>
              </form>

              <ul className={s.perks} aria-label="What you get">
                {PERKS.map((perk) => (
                  <li key={perk} className={s.perk}>
                    <span className={s.checkBadge} aria-hidden="true">
                      ✓
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              <p className={s.finePrint}>
                No spam. Unsubscribe any time. Actually, we&apos;ll miss you.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
