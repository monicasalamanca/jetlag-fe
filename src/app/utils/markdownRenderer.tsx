import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import React, { JSX } from "react";
import CTAComponent from "@/components/cta-component/cta-component";
import { SafePoll } from "@/app/components/poll";

// A custom renderer that collects full inline tokens
marked.use({
  walkTokens: (token) => {
    if (token.type === "paragraph" && typeof token.text === "string") {
      token.tokens = marked.lexer(token.text, { gfm: true });
    }
  },
});

interface CustomMarkdownRendererProps {
  markdown: string;
  poll?: {
    ctaButtonText: string;
    ctaDescription: string;
    ctaTitle: string;
    title: string;
    question: string;
    options: Array<{ id: number; label: string; votes: number }>;
    onVote?: (optionId: number) => void;
    cta?: {
      title: string;
      description: string;
      highlightText?: string;
      buttonText: string;
      buttonIcon?: string;
      onCtaClick?: (pollData?: {
        optionId: number;
        timestamp: number;
        pollQuestion: string;
        optionText: string;
      }) => void;
    };
  };
}

export const CustomMarkdownRenderer: React.FC<CustomMarkdownRendererProps> = ({
  markdown,
  poll,
}) => {
  const tokens = marked.lexer(markdown);

  // 📌 CTA pattern matcher
  const CTA_REGEX = /\[CTA\s+(.*?)\]/; // Matches [CTA type="..." title="..." link="..." button="..." icon="..."]

  // 📌 Poll pattern matcher - simple marker
  const POLL_REGEX = /\[POLL\]/; // Matches simple [POLL] marker

  // 🔧 Extract key="value" pairs from the string
  const parseAttributes = (attrString: string): Record<string, string> => {
    const attrs: Record<string, string> = {};
    const matches = attrString.match(/(\w+)="([^"]+)"/g) || [];

    matches.forEach((pair) => {
      const [key, value] = pair.split("=");
      attrs[key] = value.replace(/"/g, "");
    });

    return attrs;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderInline = (token: any, idx: number) => {
    switch (token.type) {
      case "text":
        return token.text;
      case "strong":
        return <strong key={idx}>{token.text}</strong>;
      case "em":
        return <em key={idx}>{token.text}</em>;
      case "link":
        return (
          <Link key={idx} href={token.href}>
            {token.text}
          </Link>
        );
      case "image":
        return (
          <Image
            key={idx}
            src={token.href}
            alt={token.text}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
        );
      default:
        return null;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderToken = (token: any, idx: number) => {
    switch (token.type) {
      case "heading":
        const Tag = `h${token.depth}` as keyof JSX.IntrinsicElements;
        return <Tag key={idx}>{token.text}</Tag>;
      case "paragraph":
        const text = token.text;
        // Check for CTA pattern
        if (text && CTA_REGEX.test(text)) {
          const match = text.match(CTA_REGEX);
          if (match) {
            const attrs = parseAttributes(match[1]);
            return (
              <CTAComponent
                key={idx}
                type={attrs.type}
                title={attrs.title}
                link={attrs.link}
                buttonText={attrs.button}
              />
            );
          }
        }

        // Check for Poll pattern
        if (text && POLL_REGEX.test(text)) {
          if (poll) {
            // Convert the markdown poll format to our Poll component format
            const pollData = {
              id: 1, // Default ID for markdown polls
              slug: "markdown-poll",
              question: poll.question,
              status: "live" as const,
              ctaTitle: poll.ctaTitle,
              ctaDescription: poll.ctaDescription,
              ctaButtonText: poll.ctaButtonText,
              options: poll.options.map((option) => ({
                id: option.id,
                label: option.label,
                votes: option.votes,
              })),
            };

            return (
              <SafePoll
                key={idx}
                poll={pollData}
                title={poll.title}
                simulateVotes={true}
                onVote={(optionId: number) => {
                  // Here you can integrate with your analytics or backend
                  poll.onVote?.(optionId);
                }}
              />
            );
          } else {
            // If no poll data is provided, don't render anything (filter out [POLL] text)
            return null;
          }
        }

        return <p key={idx}>{token.tokens?.map(renderInline) ?? token.text}</p>;
      case "list":
        return (
          <ul key={idx}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {token.items.map((item: any, itemIdx: number) => (
              <li key={itemIdx}>{item.text}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return <>{tokens.map(renderToken)}</>;
};
