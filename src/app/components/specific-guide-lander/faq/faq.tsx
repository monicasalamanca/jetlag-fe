// generate a simple FAQ component
import React, { useState } from "react";

import s from "./faq.module.scss";

const FAQ = () => {
  // FAQ data
  const faqItems = [
    {
      question: "Is this guide suitable for first-time visitors to Thailand?",
      answer:
        "This guide is designed for those planning to live or stay long-term on Thailand's islands. It covers practical details for expats, digital nomads, and long-term travelers, but may be too in-depth for short-term tourists.",
    },
    {
      question: "Do I need any special software to view the guide?",
      answer:
        "No special software is required. The guide is delivered as a PDF, which can be opened on any device with a standard PDF reader.",
    },
    {
      question: "Is the information up to date for 2026?",
      answer:
        "Yes, all content has been updated for 2026, including cost breakdowns, visa requirements, and local realities.",
    },
    {
      question: "Can I access the guide instantly after purchase?",
      answer:
        "Yes, you will receive instant access to download the guide after completing your purchase.",
    },
    {
      question: "Is there a refund policy if the guide isn't what I expected?",
      answer:
        "We offer a satisfaction guarantee. If the guide does not meet your expectations, contact us within 14 days for a full refund.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Keyboard accessibility: handle Enter/Space
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpenIndex(openIndex === idx ? null : idx);
    }
  };

  return (
    <section className={s.faq}>
      <div className={s.wrapper}>
        <h2>Frequently Asked Questions</h2>

        {/* FAQ Accordion Section */}
        <div className={s.faqAccordionContainer}>
          {faqItems.map((item, idx) => (
            <div key={idx} className={s.faqItem}>
              <button
                className={s.faqQuestion}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-question-${idx}`}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                tabIndex={0}
              >
                <span>{item.question}</span>
                <span
                  className={
                    openIndex === idx
                      ? `${s.chevron} ${s.chevronOpen}`
                      : s.chevron
                  }
                  aria-hidden="true"
                >
                  {/* Chevron SVG */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 8L10 12L14 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-answer-${idx}`}
                role="region"
                aria-labelledby={`faq-question-${idx}`}
                className={
                  openIndex === idx
                    ? `${s.faqAnswer} ${s.faqAnswerOpen}`
                    : s.faqAnswer
                }
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
