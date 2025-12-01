"use client";

import { trackButtonClick } from "@/app/utils/analytics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import SubscribeForm from "../subscribe-form/subscribe-form";

import s from "./cta-component.module.scss";

interface SubscribeFormConfig {
  apiEndpoint: string;
  modal: {
    title: string;
    description: string;
  };
}

const CTAComponent = ({
  type,
  title,
  link,
  buttonText,
  isSubscribeModal = false,
  subscribeConfig,
  onSubscriptionSuccess,
}: {
  type: string;
  title: string;
  link?: string;
  buttonText: string;
  isSubscribeModal?: boolean;
  subscribeConfig?: SubscribeFormConfig;
  onSubscriptionSuccess?: () => void;
}) => {
  const handleClick = () => {
    trackButtonClick({
      buttonText: buttonText || "CTA Button",
      location: window.location.pathname,
      buttonType: "cta",
    });
  };

  // If this is a subscribe modal type, render the subscribe form integration
  if (isSubscribeModal) {
    return (
      <>
        {type === "A" && (
          <div className={s.containerTypeA}>
            <h3>{title}</h3>
            <SubscribeForm
              buttonName={buttonText}
              showName={true}
              showIcon={true}
              trackEventName="cta-download-guide"
              variant="link-style"
              config={subscribeConfig}
              onSubscriptionSuccess={onSubscriptionSuccess}
              customIcon={faArrowRightLong}
            />
          </div>
        )}
        {type === "B" && (
          <p className={s.containerTypeB}>
            <span>{title}</span>
            <SubscribeForm
              buttonName={buttonText}
              showName={true}
              showIcon={true}
              trackEventName="cta-download-guide"
              variant="link-style"
              config={subscribeConfig}
              onSubscriptionSuccess={onSubscriptionSuccess}
              customIcon={faArrowRightLong}
            />
          </p>
        )}
      </>
    );
  }

  // Regular CTA behavior (original functionality)
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
