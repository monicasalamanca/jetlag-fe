import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import React, { JSX } from "react";

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
}

export const CustomMarkdownRenderer: React.FC<CustomMarkdownRendererProps> = ({
  markdown,
}) => {
  const tokens = marked.lexer(markdown);

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
