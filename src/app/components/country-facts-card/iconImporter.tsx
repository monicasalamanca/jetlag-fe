// IconImporter.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { iconMap } from "./iconMap";

type IconImporterProps = {
  iconName: string;
  className?: string;
  size?: "xs" | "sm" | "lg" | "1x" | "2x" | "3x" | "4x" | "5x";
  title?: string;
};

const fallbackIcon: IconDefinition = iconMap["faExclamationCircle"];

const IconImporter: React.FC<IconImporterProps> = ({
  iconName,
  className,
  size = "1x",
  title,
}) => {
  const icon = iconMap[iconName] || fallbackIcon;

  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      size={size}
      title={title}
    />
  );
};

export default IconImporter;
