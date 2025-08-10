"use client";

import dynamic from "next/dynamic";
import { ChangeEvent, FC, FormEvent, useState, useEffect } from "react";
import Modal from "../modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMessage,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { trackFormSubmission } from "@/app/utils/analytics";

const Success = dynamic(() => import("./success/success"), {
  loading: () => <p>Loading...</p>,
});

const Error = dynamic(() => import("./error/error"), {
  loading: () => <p>Loading...</p>,
});

import s from "./subscribe-form.module.scss";

interface SubscribeFormConfig {
  apiEndpoint: string;
  modal: {
    title: string;
    description: string;
  };
}

const SubscribeForm: FC<{
  buttonName: string;
  showIcon: boolean;
  trackEventName?: string;
  pollStyling?: boolean;
  config?: SubscribeFormConfig;
  onSubscriptionSuccess?: () => void;
  subscribedComponent?: React.ReactNode; // Optional component to show when already subscribed
}> = ({
  buttonName,
  showIcon,
  trackEventName,
  pollStyling = false,
  config,
  onSubscriptionSuccess,
  subscribedComponent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ email: "" });
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasAlreadySubscribed, setHasAlreadySubscribed] = useState(false);

  // Check if user has already subscribed
  useEffect(() => {
    try {
      const subscriptionStatus = localStorage.getItem(
        "hasSubscribedToDownload",
      );
      if (subscriptionStatus === "true") {
        setHasAlreadySubscribed(true);
      }
    } catch (error) {
      console.warn("Failed to check subscription status:", error);
    }
  }, []);

  // Default configuration for regular newsletter subscription
  const defaultConfig: SubscribeFormConfig = {
    apiEndpoint: "/api/subscribe",
    modal: {
      title: "Subscribe for the Cool Stuff Only",
      description:
        "Think of it like a travel mixtape: curated tips, digital freebies, and zero nonsense. Just pop in your email and we'll take it from there.",
    },
  };

  // Use provided config or fall back to default
  const activeConfig = config || defaultConfig;

  /**
   * Convert simulated votes to real API calls after successful subscription
   * This function checks localStorage for any simulated poll votes and converts them to real votes
   */
  const castSimulatedVoteAsReal = async () => {
    try {
      const votedPolls = localStorage.getItem("votedPolls");
      if (!votedPolls) return;

      const parsedVotedPolls = JSON.parse(votedPolls);

      // Process each voted poll
      for (const [pollId, vote] of Object.entries(parsedVotedPolls)) {
        const voteRecord = vote as {
          optionId: number;
          timestamp: number;
          isSimulated: boolean;
        };

        // Only convert simulated votes to real votes
        if (voteRecord.isSimulated) {
          try {
            // Import the poll API function
            const { castPollVote } = await import("@/api/poll");

            // Cast the real vote
            await castPollVote(parseInt(pollId), {
              optionId: voteRecord.optionId,
              metadata: {
                timestamp: Date.now(),
              },
            });

            // Update the vote record to mark it as real
            parsedVotedPolls[pollId] = {
              ...voteRecord,
              isSimulated: false,
              convertedTimestamp: Date.now(),
            };

            console.log(
              `Converted simulated vote to real vote for poll ${pollId}, option ${voteRecord.optionId}`,
            );
          } catch (error) {
            console.error(
              `Failed to convert simulated vote for poll ${pollId}:`,
              error,
            );
          }
        }
      }

      // Save the updated vote records
      localStorage.setItem("votedPolls", JSON.stringify(parsedVotedPolls));
    } catch (error) {
      console.error("Failed to cast simulated votes as real:", error);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(activeConfig.apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "submit",
        email: form.email,
        botField: (event.target as HTMLFormElement)["bot-field"].value,
      }),
    });

    trackFormSubmission({
      formName: `Subscribe Form - ${trackEventName}`,
      location: window.location.pathname,
      success: res.status === 200,
    });

    if (res.status === 200) {
      setIsFormOpen(false);
      setIsSuccess(true);
      setIsError(false);

      // Store subscription status for poll system
      try {
        localStorage.setItem("hasSubscribedToDownload", "true");
        setHasAlreadySubscribed(true); // Update state to immediately hide form

        // Cast real vote if user had previously voted in simulation mode
        await castSimulatedVoteAsReal();
      } catch (error) {
        console.warn("Failed to store subscription status:", error);
      }

      // Call the subscription success callback
      if (onSubscriptionSuccess) {
        onSubscriptionSuccess();
      }

      // Dispatch global subscription event for any listening components
      window.dispatchEvent(
        new CustomEvent("userSubscribed", {
          detail: { timestamp: Date.now() },
        }),
      );

      setTimeout(() => {
        setIsOpen(false);
        setIsFormOpen(true);
        setIsSuccess(false);
        setIsError(false);
      }, 100); // Close modal immediately to prevent body overflow conflicts
    } else {
      setIsFormOpen(false);
      setIsSuccess(false);
      setIsError(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsFormOpen(true);
    setIsSuccess(false);
    setIsError(false);
  };

  const tryAgain = () => {
    setIsOpen(true);
    setIsFormOpen(true);
    setIsSuccess(false);
    setIsError(false);
  };

  // Don't render the form if user has already subscribed
  if (hasAlreadySubscribed) {
    return subscribedComponent || null;
  }

  return (
    <>
      <button
        aria-label="subscribe to our newsletter"
        onClick={() => setIsOpen(true)}
        className={pollStyling ? s.downloadGuideButton : s.contactUsButton}
      >
        {buttonName}
        {showIcon && <FontAwesomeIcon icon={faMessage} className={s.icon} />}
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        disableBodyScroll={!pollStyling}
      >
        {isFormOpen && (
          <>
            <h2 className={s.contactFormTitle}>{activeConfig.modal.title}</h2>
            <p className={s.contactFormDescription}>
              {activeConfig.modal.description}
            </p>
            <form onSubmit={handleSubmit} className={s.formContainer}>
              <div className={s.inputWrapper}>
                <input
                  id="bot-field"
                  type="hidden"
                  name="name"
                  maxLength={120}
                  minLength={10}
                  placeholder="Your Awesome Name"
                  onChange={handleChange}
                  className={s.formInput}
                  required
                />
              </div>
              <div className={s.inputWrapper}>
                <input
                  type="email"
                  name="email"
                  maxLength={120}
                  minLength={10}
                  placeholder="Your Email Address"
                  onChange={handleChange}
                  className={s.formInput}
                  required
                />
                <FontAwesomeIcon icon={faEnvelope} className={s.icon} />
              </div>
              <button
                aria-label="submit"
                type="submit"
                className={s.submitButton}
              >
                {buttonName}
                {showIcon && (
                  <FontAwesomeIcon icon={faPaperPlane} className={s.icon} />
                )}
              </button>
              <footer className={s.footer}>
                <p>Or reach us on social media</p>
                <div className={s.socialMediaWrapper}>
                  <Link
                    aria-label="Go to the jet lag chronicles twitter account"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/the_jetlaggers"
                    className={s.link}
                  >
                    <FontAwesomeIcon icon={faXTwitter} className={s.icon} />
                  </Link>
                </div>
              </footer>
            </form>
          </>
        )}
        {isSuccess && <Success closeModal={closeModal} />}
        {isError && <Error tryAgain={tryAgain} />}
      </Modal>
    </>
  );
};

export default SubscribeForm;
