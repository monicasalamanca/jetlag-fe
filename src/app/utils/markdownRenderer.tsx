import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import React, { JSX } from "react";
import CTAComponent from "@/components/cta-component/cta-component";
import Poll from "@/app/components/poll/poll";

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
        if (text && POLL_REGEX.test(text) && poll) {
          return (
            <Poll
              key={idx}
              title="Quick Poll"
              question={poll.question}
              options={poll.options}
              onVote={(optionId) => {
                console.log("User voted for:", optionId);
                // Here you can integrate with your analytics or backend
              }}
              cta={{
                title: "Scams dodged. Now let's talk rent.",
                description:
                  "Discover what it really costs to live in Phuket, Koh Samui, Phangan & more — rent, food, transport, and pro tips included.",
                highlightText: "",
                buttonText: "Download the Island Cost Guide",
                onCtaClick: (pollData) => {
                  console.log("CTA clicked: Download Thailand scam guide");
                  if (pollData) {
                    console.log("Poll data for API submission:", pollData);
                    // Here you can:
                    // 1. Open email capture modal/form
                    // 2. Store poll data for later API submission
                    // 3. Navigate to landing page with poll context
                  } else {
                    console.warn(
                      "No poll data available - user may not have voted",
                    );
                  }
                  // Handle download or navigation to guide
                },
              }}
            />
          );
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
