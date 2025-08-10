"use client";

import { FC, useState, useCallback, useEffect } from "react";
import SubscribeForm from "../subscribe-form/subscribe-form";
import { Poll, PollOption, VoteResponse } from "@/api/poll";
import { usePoll, PollOptionWithPercentage } from "./hooks/usePoll";
import { trackEvent } from "@/app/utils/analytics";
import s from "./poll.module.scss";

interface PollProps {
  poll: Poll;
  title?: string; // Optional override for poll title
  onVote?: (optionId: number, voteResponse: VoteResponse) => void;
  showCTA?: boolean;
  className?: string;
  simulateVotes?: boolean; // Enable vote simulation for polls with 0 votes
}

const PollComponent: FC<PollProps> = ({
  poll,
  title,
  onVote,
  showCTA = true,
  className = "",
  simulateVotes = true,
}) => {
  // All hooks must be called before any conditional returns
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  const {
    isLoading,
    error,
    hasVoted,
    selectedOptionId,
    optionsData,
    handleVote,
    clearError,
    isSimulated,
  } = usePoll({ poll, onVote, simulateVotes });

  // Handle vote submission with transition effects
  const handleVoteSubmission = useCallback(
    async (optionId: number) => {
      if (isLoading || hasVoted) return;

      // Track poll vote
      const selectedOption = poll.options.find(
        (option: PollOption) => option.id === selectedOptionId,
      );
      trackEvent({
        action: "vote",
        category: "poll",
        label: `Poll ${poll.id}: ${selectedOption?.label || "Unknown option"}`,
        custom_parameters: {
          poll_id: poll.id,
          poll_question: poll.question,
          option_id: optionId,
          option_label: selectedOption?.label,
          is_simulated: isSimulated,
        },
      });

      setIsTransitioning(true);
      await handleVote(optionId);

      // Complete transition after delay
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    },
    [isLoading, hasVoted, handleVote, poll, isSimulated, selectedOptionId],
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, optionId: number) => {
      if (hasVoted || isTransitioning) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleVoteSubmission(optionId);
      }
    },
    [hasVoted, isTransitioning, handleVoteSubmission],
  );

  // Handle subscription success - convert simulated vote to real vote
  const handleSubscriptionSuccess = useCallback(async () => {
    setHasSubscribed(true);

    // Note: The actual vote conversion is handled by the subscribe form
    // We just need to update our local state to reflect the subscription
    console.log(
      "Subscription successful - vote conversion handled by subscribe form",
    );
  }, []);

  // Check subscription status from localStorage on component mount
  useEffect(() => {
    try {
      const subscriptionStatus = localStorage.getItem(
        "hasSubscribedToDownload",
      );
      if (subscriptionStatus === "true") {
        setHasSubscribed(true);
      }
    } catch (error) {
      console.warn("Failed to check subscription status:", error);
    }
  }, []);

  // Early return validation AFTER all hooks are called
  if (!poll) {
    console.warn("Poll component received undefined poll data");
    return null;
  }

  // Validate poll structure
  if (!poll.id || !poll.question || !Array.isArray(poll.options)) {
    console.error("Invalid poll structure:", poll);
    return (
      <div className={`${s.poll} ${s.errorState} ${className}`} role="alert">
        <p>Unable to load poll. Please try again later.</p>
      </div>
    );
  }

  const displayTitle = title || poll.question;

  // Results view after voting
  if (hasVoted) {
    return (
      <section
        className={`${s.poll} ${s.resultsView} ${className}`}
        role="region"
        aria-label="Poll results"
        aria-live="polite"
      >
        <header className={s.pollHeader}>
          <h2 className={`${s.title} ${s.fadeInUp}`} id="poll-results-title">
            Thanks for voting!
          </h2>
          <p
            className={`${s.subtitle} ${s.fadeInUp}`}
            aria-describedby="poll-results-title"
          >
            {isSimulated
              ? "Here's what other jetlaggers might choose:"
              : "Here's what other jetlaggers have chosen:"}
          </p>
          {isSimulated && (
            <p className={`${s.simulationNotice} ${s.fadeInUp}`}>
              <small>
                * Results are simulated. Subscribe to see real voting data!
              </small>
            </p>
          )}
        </header>

        <div
          className={`${s.resultsContainer} ${s.fadeInUp}`}
          role="list"
          aria-label="Poll results breakdown"
        >
          {optionsData.map(
            (option: PollOptionWithPercentage, index: number) => (
              <div
                key={option.id}
                className={`${s.resultItem} ${s.slideInLeft} ${
                  selectedOptionId === option.id ? s.userSelected : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                role="listitem"
                aria-label={`${option.label}: ${option.percentage}% of votes`}
              >
                <div className={s.resultHeader}>
                  <span className={s.optionText} id={`result-${option.id}`}>
                    {option.label}
                  </span>
                  <span className={s.percentageText} aria-live="polite">
                    {option.percentage}%
                  </span>
                </div>
                <div
                  className={s.progressBar}
                  role="progressbar"
                  aria-valuenow={option.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-labelledby={`result-${option.id}`}
                  aria-describedby={`result-${option.id}-description`}
                >
                  <div
                    className={`${s.progressFill} ${s[`gradient${(index % 4) + 1}`]} ${s.fillAnimation}`}
                    style={{
                      width: `${option.percentage}%`,
                      animationDelay: `${400 + index * 150}ms`,
                    }}
                  />
                </div>
                <span
                  id={`result-${option.id}-description`}
                  className="sr-only"
                >
                  Progress bar showing {option.percentage}% support for this
                  option
                </span>
              </div>
            ),
          )}
        </div>

        {/* CTA Footer */}
        {showCTA && (
          <footer className={`${s.ctaFooter} ${s.fadeInUp}`}>
            <div className={s.ctaContent}>
              {hasSubscribed ? (
                <>
                  <h3 className={s.ctaTitle}>✅ Vote counted!</h3>
                  <p className={s.ctaDescription}>
                    You’re officially a Jet Lagger now.
                  </p>
                  <p className={s.ctaDescription}>
                    📬 Check your inbox and confirm your email to unlock the
                    free guide.
                    <br />
                    Spam folder playing hide and seek? Go hunt it down. 😉
                  </p>
                </>
              ) : (
                <>
                  <h3 className={s.ctaTitle}>{poll.ctaTitle}</h3>
                  <p className={s.ctaDescription}>{poll.ctaDescription}</p>
                  <SubscribeForm
                    buttonName={poll.ctaButtonText}
                    showIcon={false}
                    trackEventName="poll"
                    pollStyling={true}
                    onSubscriptionSuccess={handleSubscriptionSuccess}
                    config={{
                      apiEndpoint: "/api/subscribe-to-download",
                      modal: {
                        title: "Before You Pack Your Bags…",
                        description:
                          "Want the real cost of island life in Thailand? We&apos;re talking rent, food, bikes, beachfront vs. budget — all in one free, honest, no-fluff guide. Drop your email and we&apos;ll zip it over faster than a GrabBike in Bangkok.",
                      },
                    }}
                  />
                </>
              )}
            </div>
          </footer>
        )}
      </section>
    );
  }

  // Voting interface
  return (
    <section
      className={`${s.poll} ${isTransitioning ? s.transitioning : ""} ${className}`}
      role="region"
      aria-label="Interactive poll"
      aria-busy={isLoading}
    >
      <header className={s.pollHeader}>
        <h2 className={s.title} id="poll-title">
          {displayTitle}
        </h2>
        <p className={s.question} id="poll-question">
          {poll.question}
        </p>
      </header>

      {/* Error message */}
      {error && (
        <div className={s.errorMessage} role="alert">
          <p>{error.message}</p>
          <button
            type="button"
            onClick={clearError}
            className={s.retryButton}
            aria-label="Dismiss error and try again"
          >
            Try Again
          </button>
        </div>
      )}

      <fieldset
        className={s.optionsContainer}
        aria-labelledby="poll-title"
        aria-describedby="poll-question poll-instructions"
        disabled={isTransitioning || isLoading}
      >
        <legend className="sr-only">Poll options: {poll.question}</legend>
        <div id="poll-instructions" className="sr-only">
          Use arrow keys to navigate between options. Press Enter or Space to
          select an option.
        </div>

        {optionsData.map((option: PollOptionWithPercentage) => (
          <div key={option.id} className={s.optionItem}>
            <input
              type="radio"
              name={`poll-option-${poll.id}`}
              id={`option-${option.id}`}
              value={option.id}
              checked={selectedOptionId === option.id}
              onChange={() => handleVoteSubmission(option.id)}
              onKeyDown={(e) => handleKeyDown(e, option.id)}
              className={s.radioInput}
              aria-describedby={`option-${option.id}-label`}
              disabled={isTransitioning || isLoading}
              tabIndex={isTransitioning || isLoading ? -1 : 0}
            />
            <label
              htmlFor={`option-${option.id}`}
              className={`${s.customRadio} ${
                selectedOptionId === option.id ? s.selected : ""
              } ${isTransitioning ? s.transitioning : ""} ${
                isLoading ? s.loading : ""
              }`}
              id={`option-${option.id}-label`}
            >
              <span className={s.optionText}>{option.label}</span>
              <div className={s.radioButton} aria-hidden="true">
                {selectedOptionId === option.id && (
                  <div className={s.radioButtonInner} />
                )}
                {isLoading && selectedOptionId === option.id && (
                  <div className={s.loadingSpinner} aria-hidden="true" />
                )}
              </div>
            </label>

            {/* Status announcement for screen readers */}
            {selectedOptionId === option.id && isLoading && (
              <div className="sr-only" aria-live="assertive" role="status">
                {option.label} selected. Submitting your vote...
              </div>
            )}
          </div>
        ))}
      </fieldset>

      {/* Loading state announcement */}
      {isLoading && (
        <div className="sr-only" aria-live="assertive" role="status">
          Processing your vote...
        </div>
      )}
    </section>
  );
};

export default PollComponent;
