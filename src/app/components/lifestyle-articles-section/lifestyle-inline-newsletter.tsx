"use client";

import { useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { trackFormSubmission } from "@/app/utils/analytics";
import s from "./lifestyle-inline-newsletter.module.scss";

export default function LifestyleInlineNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const botField = formData.get("name") as string;

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
        formName: "Lifestyle Inline Newsletter",
        location: window.location.pathname,
        success: res.status === 200,
      });

      if (res.status === 200) {
        setIsSuccess(true);
        setEmail("");
      }
    } catch (error) {
      trackFormSubmission({
        formName: "Lifestyle Inline Newsletter",
        location: window.location.pathname,
        success: false,
        errorMessage: String(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.newsletter}>
      <div className={s.glowDecor} aria-hidden="true" />
      <div className={s.iconWrap} aria-hidden="true">
        <FontAwesomeIcon icon={faEnvelope} />
      </div>
      <div className={s.text}>
        <p className={s.eyebrow}>Stay in the Loop</p>
        <h3 className={s.title}>The Honest Take, Straight to Your Inbox</h3>
        <p className={s.desc}>
          Visa changes, cost of living moves, and the best relocation reads,
          when we have something worth saying.
        </p>
      </div>
      <div className={s.formWrap}>
        {isSuccess ? (
          <p className={s.successMsg}>✓ You&apos;re in! Check your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className={s.form}>
            {/* Honeypot — bots fill this, real users don't */}
            <input type="hidden" name="name" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={s.input}
              required
              disabled={isSubmitting}
              aria-label="Email address for newsletter"
            />
            <button type="submit" className={s.btn} disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : "Subscribe Free"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
