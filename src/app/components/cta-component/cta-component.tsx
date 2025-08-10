"use client";

import { trackButtonClick } from "@/app/utils/analytics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import s from "./cta-component.module.scss";

const CTAComponent = ({
  type,
  title,
  link,
  buttonText,
}: {
  type: string;
  title: string;
  link: string;
  buttonText: string;
}) => {
  const handleClick = () => {
    trackButtonClick({
      buttonText: buttonText || "CTA Button",
      location: window.location.pathname,
      buttonType: "cta",
    });
  };

  return (
    <>
      {type === "A" && (
        <div className={s.containerTypeA}>
          <h3>{title}</h3>
          <a href={link} onClick={handleClick}>
            {buttonText}
            <FontAwesomeIcon icon={faArrowRightLong} />
          </a>
        </div>
      )}
      {type === "B" && (
        <p className={s.containerTypeB}>
          <span>{title}</span>
          <a href={link} onClick={handleClick} className={s.link}>
            {buttonText}
            <FontAwesomeIcon icon={faArrowRightLong} />
          </a>
        </p>
      )}
    </>
  );
};

export default CTAComponent;
