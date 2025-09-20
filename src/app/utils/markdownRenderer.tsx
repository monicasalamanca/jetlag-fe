import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import React, { JSX, useMemo, useCallback } from "react";
import CTAComponent from "@/components/cta-component/cta-component";
import { SafePoll } from "@/app/components/poll";

// Type definitions for marked tokens
interface MarkedToken {
  type: string;
  text?: string;
  depth?: number;
  tokens?: MarkedToken[];
  items?: MarkedToken[];
  href?: string;
}

interface InlineToken {
  type: string;
  text?: string;
  href?: string;
}

// Configure marked once globally for better performance
marked.use({
  gfm: true,
  breaks: true, // Convert single line breaks to <br> tags
});

// Constants for better maintainability
const PATTERNS = {
  CTA: /\[CTA\s+(.*?)\]/, // Matches [CTA type="..." title="..." link="..." button="..."]
  POLL: /\[POLL\]/, // Matches simple [POLL] marker
  FAQ: /\*\*(FAQ|FAQs)\*\*/, // Matches **FAQ** or **FAQs**
} as const;

const CTA_CONFIG = {
  SUBSCRIBE_MODAL: {
    apiEndpoint: "/api/subscribe-to-download",
    modal: {
      title: "Download Your Free Travel Guide",
      description: "Get exclusive travel tips and destinations guide.",
    },
  },
} as const;

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
  // Memoize processed markdown to avoid recalculation on every render
  const processedMarkdown = useMemo(() => {
    return (
      markdown
        // Normalize line breaks
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        // Convert single newlines to proper markdown line breaks (two spaces + newline)
        .replace(/(?<!\n)\n(?!\n)/g, "  \n")
        // Keep double newlines as paragraph breaks
        .replace(/  \n  \n/g, "\n\n")
    );
  }, [markdown]);

  // Memoize tokens to avoid re-parsing on every render
  const tokens = useMemo(
    () => marked.lexer(processedMarkdown),
    [processedMarkdown],
  );

  // Utility functions - moved outside component for better performance
  const parseAttributes = useCallback(
    (attributeString: string): Record<string, string> => {
      const attrs: Record<string, string> = {};
      const regex = /(\w+)="([^"]+)"/g;
      let match;

      while ((match = regex.exec(attributeString)) !== null) {
        attrs[match[1]] = match[2];
      }

      return attrs;
    },
    [],
  );

  const formatFAQText = useCallback((text: string): string => {
    return text
      .replace(/Q:/g, "\n\n**Q:**")
      .replace(/A:/g, "\n**A:**")
      .replace(/\*\*(FAQ|FAQs)\*\*\n\n/g, (match) =>
        match.replace("\n\n", "\n"),
      )
      .trim();
  }, []);

  const renderInline = useCallback((token: InlineToken, idx: number) => {
    switch (token.type) {
      case "text":
        return token.text;
      case "strong":
        return <strong key={idx}>{token.text}</strong>;
      case "em":
        return <em key={idx}>{token.text}</em>;
      case "link":
        return (
          <Link key={idx} href={token.href || "#"}>
            {token.text}
          </Link>
        );
      case "image":
        return (
          <Image
            key={idx}
            src={token.href || ""}
            alt={token.text || ""}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
        );
      case "br":
        return <br key={idx} />;
      default:
        return null;
    }
  }, []);

  // Handler functions for different content types
  const handleFAQContent = useCallback(
    (text: string, idx: number): JSX.Element | null => {
      if (!PATTERNS.FAQ.test(text)) return null;

      const formattedFAQText = formatFAQText(text);
      const faqTokens = marked.lexer(formattedFAQText);

      // Directly render FAQ tokens without circular dependency
      return (
        <div key={idx} className="faq-section">
          {faqTokens.map((faqToken, faqIdx) => {
            const token = faqToken as MarkedToken;
            if (token.type === "heading") {
              const Tag = `h${token.depth}` as keyof JSX.IntrinsicElements;
              return <Tag key={faqIdx}>{token.text}</Tag>;
            }
            if (token.type === "paragraph") {
              return (
                <p key={faqIdx}>
                  {token.tokens?.map(
                    (inlineToken: InlineToken, inlineIdx: number) =>
                      renderInline(inlineToken, inlineIdx),
                  ) ?? token.text}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    },
    [formatFAQText, renderInline],
  );

  const handleCTAContent = useCallback(
    (text: string, idx: number): JSX.Element | null => {
      const match = text.match(PATTERNS.CTA);
      if (!match) return null;

      const attrs = parseAttributes(match[1]);
      const isSubscribeModal = attrs.isSubscribeModal === "true";

      if (isSubscribeModal) {
        return (
          <CTAComponent
            key={idx}
            type={attrs.type}
            title={attrs.title}
            link={attrs.link}
            buttonText={attrs.button}
            isSubscribeModal={true}
            subscribeConfig={CTA_CONFIG.SUBSCRIBE_MODAL}
            onSubscriptionSuccess={() => {
              console.log("User subscribed! Trigger download...");
            }}
          />
        );
      }

      return (
        <CTAComponent
          key={idx}
          type={attrs.type}
          title={attrs.title}
          link={attrs.link}
          buttonText={attrs.button}
        />
      );
    },
    [parseAttributes],
  );

  const handlePollContent = useCallback(
    (text: string, idx: number): JSX.Element | null => {
      if (!PATTERNS.POLL.test(text) || !poll) return null;

      const pollData = {
        id: 1,
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
            poll.onVote?.(optionId);
          }}
        />
      );
    },
    [poll],
  );

  const renderToken = useCallback(
    (
      token: MarkedToken,
      idx: number,
      isInsideFAQ = false,
      handlers?: {
        handleFAQContent: (text: string, idx: number) => JSX.Element | null;
        handleCTAContent: (text: string, idx: number) => JSX.Element | null;
        handlePollContent: (text: string, idx: number) => JSX.Element | null;
      },
    ): JSX.Element | null => {
      switch (token.type) {
        case "heading": {
          const Tag = `h${token.depth}` as keyof JSX.IntrinsicElements;
          return <Tag key={idx}>{token.text}</Tag>;
        }

        case "paragraph": {
          const text = token.text;

          // Handle special content types (only if not inside FAQ to prevent recursion)
          if (!isInsideFAQ && text && handlers) {
            // Check for FAQ pattern first
            const faqElement = handlers.handleFAQContent(text, idx);
            if (faqElement) return faqElement;

            // Check for CTA pattern
            const ctaElement = handlers.handleCTAContent(text, idx);
            if (ctaElement) return ctaElement;

            // Check for Poll pattern
            const pollElement = handlers.handlePollContent(text, idx);
            if (pollElement) return pollElement;
          }

          // Render regular paragraph
          return (
            <p key={idx}>
              {token.tokens?.map(
                (inlineToken: InlineToken, inlineIdx: number) =>
                  renderInline(inlineToken, inlineIdx),
              ) ?? token.text}
            </p>
          );
        }

        case "list":
          return (
            <ul key={idx}>
              {token.items?.map((item: MarkedToken, itemIdx: number) => (
                <li key={itemIdx}>{item.text}</li>
              )) ?? null}
            </ul>
          );

        default:
          return null;
      }
    },
    [renderInline],
  );

  const handlers = useMemo(
    () => ({
      handleFAQContent,
      handleCTAContent,
      handlePollContent,
    }),
    [handleFAQContent, handleCTAContent, handlePollContent],
  );

  return (
    <>
      {tokens.map((token, idx) =>
        renderToken(token as MarkedToken, idx, false, handlers),
      )}
    </>
  );
};

// Set display name for better debugging
CustomMarkdownRenderer.displayName = "CustomMarkdownRenderer";
