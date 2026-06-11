"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { trackFormSubmission } from "@/app/utils/analytics";
import s from "./newsletter-cta.module.scss";

const EMAIL_MAX_LENGTH = 120;
const EMAIL_MIN_LENGTH = 10;

const NewsletterCta = () => {
  const [email, setEmail] = useState("");
  const [botField, setBotField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (isError) {
      setIsError(false);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setIsError(false);
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "submit",
          email,
          botField,
          timestamp: Date.now(),
        }),
      });

      trackFormSubmission({
        formName: "Subscribe Form - About Us CTA",
        location: "/about-us",
        success: response.status === 200,
      });

      if (response.status === 200) {
        setIsSuccess(true);
        setEmail("");
        window.dispatchEvent(
          new CustomEvent("userSubscribed", {
            detail: { timestamp: Date.now() },
          }),
        );
      } else {
        setIsError(true);
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch {
      setIsError(true);
      setErrorMessage(
        "Unable to connect. Please check your internet and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter-cta" className={s.section}>
      <div className={s.glowDecoration} aria-hidden="true" />

      <div className={s.inner}>
        <div className={s.content}>
          <p className={s.eyebrow}>Stay In The Loop</p>
          <h2 className={s.heading}>
            THE WEEKLY <span className={s.accent}>DEBRIEF</span>
          </h2>
          <p className={s.body}>
            Every Sunday we send one email with the real intel — visa rule
            changes, cost-of-living updates, tax strategy breakdowns, and the
            practical stuff nobody else covers. No filler. No sponsored content.
            Just the information that actually helps you build a better life
            abroad.
          </p>
          <div className={s.ctaRow}>
            <a
              href="mailto:hello@thejetlagchronicles.com"
              className={s.ghostBtn}
            >
              Email Us Directly →
            </a>
            <Link href="/contact" className={s.ghostBtn}>
              Work With Us →
            </Link>
          </div>
        </div>

        <div className={s.card}>
          <h3 className={s.cardTitle}>Join 10,000+ Readers</h3>
          <p className={s.cardDescription}>
            Weekly intelligence for people building a life abroad. Sunday
            delivery. Unsubscribe anytime.
          </p>

          {isSuccess ? (
            <div className={s.successMsg}>
              <span className={s.successIcon}>✓</span>
              You&apos;re in. Check your inbox for a welcome email.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={s.form}>
              {/* Honeypot — hidden from real users */}
              <div className={s.honeypot} aria-hidden="true">
                <input
                  type="text"
                  name="name"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="your@email.com"
                maxLength={EMAIL_MAX_LENGTH}
                minLength={EMAIL_MIN_LENGTH}
                required
                disabled={isSubmitting}
                className={s.emailInput}
              />

              {isError && <p className={s.errorMsg}>{errorMessage}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className={s.submitBtn}
                aria-label="Subscribe to The Weekly Debrief newsletter"
              >
                {isSubmitting
                  ? "Subscribing…"
                  : "Subscribe Free — It's Worth It"}
              </button>
            </form>
          )}

          <p className={s.promiseLine}>
            No spam. No sponsored content. Just the good stuff.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCta;
