// QuickFactCard.tsx
import React from "react";
import IconImporter from "../iconImporter";

import s from "./card.module.scss";

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
  const getStyle = (style: string) => {
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
      <p>{description}</p>
    </div>
  );
};

export default QuickFactCard;
