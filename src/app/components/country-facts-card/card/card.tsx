// QuickFactCard.tsx
import React from "react";
import IconImporter from "../iconImporter";

import s from "./card.module.scss";

const renderDescription = (text: string): React.ReactNode[] => {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

type QuickFact = {
  label: string;
  description: string;
  icon: string; // should match a key in iconMap
  cardStyle: string;
  colour: string;
};

const QuickFactCard: React.FC<QuickFact> = ({
  label,
  description,
  icon,
  cardStyle,
  colour,
}) => {
  const hasLinks = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/.test(description);

  const getStyle = (style: string) => {
    if (hasLinks) return `${s.whiteBg}`;
    switch (style) {
      case "whiteBg":
        return `${s.whiteBg}`;
      case "colourBg":
        return `${s.colourBg}`;
      default:
        return `${s.whiteBg}`;
    }
  };
  const getColour = (colour: string) => {
    switch (colour) {
      case "blue":
        return s.blue;
      case "orange":
        return s.orange;
      case "red":
        return s.red;
      case "green":
        return s.green;
      case "purple":
        return s.purple;
      case "pink":
        return s.pink;
      default:
        return s.blue;
    }
  };

  return (
    <div
      className={`${s.container} ${getStyle(cardStyle)} ${getColour(colour)}`}
    >
      <IconImporter iconName={icon} />
      <h2>{label}</h2>
      <p>{renderDescription(description)}</p>
    </div>
  );
};

export default QuickFactCard;
