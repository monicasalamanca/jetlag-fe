"use client";

import { FC, useState } from "react";
import s from "./poll.module.scss";

interface PollOption {
  id: number;
  label: string;
  votes: number;
}

interface CTAProps {
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
}

interface PollProps {
  title: string;
  question: string;
  options: PollOption[];
  onVote?: (optionId: number) => void;
  cta?: CTAProps;
}

const Poll: FC<PollProps> = ({ title, question, options, onVote, cta }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [updatedOptions, setUpdatedOptions] = useState(options);

  // Calculate total votes and percentages
  const originalTotalVotes = options.reduce(
    (sum, option) => sum + option.votes,
    0,
  );

  // If original votes were all zero, we need to add fake votes to all options
  // and then add the user's vote on top of that
  const optionsWithFakeVotes =
    originalTotalVotes === 0
      ? updatedOptions.map((option) => {
          // If this was the voted option, add fake votes + 1 user vote
          // If not, just add fake votes
          const baseVotes = 5; // fake votes
          const userVote = hasVoted && selectedOption === option.id ? 1 : 0;
          return { ...option, votes: baseVotes + userVote };
        })
      : updatedOptions;

  const adjustedTotalVotes = optionsWithFakeVotes.reduce(
    (sum, option) => sum + option.votes,
    0,
  );

  const optionsWithPercentages = optionsWithFakeVotes.map((option) => ({
    ...option,
    percentage:
      adjustedTotalVotes > 0
        ? Math.round((option.votes / adjustedTotalVotes) * 100)
        : 0,
  }));

  const handleOptionSelect = (optionId: number) => {
    if (hasVoted || isTransitioning) return;

    setSelectedOption(optionId);
    setIsTransitioning(true);

    // Store the selected option in localStorage for later API submission
    const pollData = {
      optionId,
      timestamp: Date.now(),
      pollQuestion: question,
      optionText: updatedOptions.find((opt) => opt.id === optionId)?.label,
    };

    try {
      localStorage.setItem(
        `poll_selection_${question.replace(/\s+/g, "_").toLowerCase()}`,
        JSON.stringify(pollData),
      );
    } catch (error) {
      console.warn("Failed to save poll selection to localStorage:", error);
    }

    // Update the vote count for the selected option
    setUpdatedOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === optionId
          ? { ...option, votes: option.votes + 1 }
          : option,
      ),
    );

    // Start the transition after a brief moment to show selection
    setTimeout(() => {
      setHasVoted(true);
      onVote?.(optionId);
      setIsTransitioning(false);
    }, 600); // 600ms delay for smooth transition
  };

  const handleKeyDown = (event: React.KeyboardEvent, optionId: number) => {
    if (hasVoted || isTransitioning) return;

    const currentIndex = updatedOptions.findIndex(
      (option) => option.id === optionId,
    );

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        handleOptionSelect(optionId);
        break;
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % updatedOptions.length;
        const nextInput = document.getElementById(
          `option-${updatedOptions[nextIndex].id}`,
        ) as HTMLInputElement;
        nextInput?.focus();
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        const prevIndex =
          currentIndex === 0 ? updatedOptions.length - 1 : currentIndex - 1;
        const prevInput = document.getElementById(
          `option-${updatedOptions[prevIndex].id}`,
        ) as HTMLInputElement;
        prevInput?.focus();
        break;
    }
  };

  if (hasVoted) {
    return (
      <section
        className={`${s.poll} ${s.resultsView}`}
        role="region"
        aria-label="Poll results"
        aria-live="polite"
      >
        <header className={s.pollHeader}>
          <h3 className={`${s.title} ${s.fadeInUp}`} id="poll-results-title">
            Thanks for voting!
          </h3>
          <p
            className={`${s.subtitle} ${s.fadeInUp}`}
            aria-describedby="poll-results-title"
          >
            Here&apos;s what other jetlaggers have chose:
          </p>
        </header>

        <div
          className={`${s.resultsContainer} ${s.fadeInUp}`}
          role="list"
          aria-label="Poll results breakdown"
        >
          {optionsWithPercentages.map((option, index) => (
            <div
              key={option.id}
              className={`${s.resultItem} ${s.slideInLeft}`}
              style={{ animationDelay: `${index * 100}ms` }}
              role="listitem"
              aria-label={`${option.label}: ${option.percentage}% of votes`}
            >
              <div className={s.resultHeader}>
                <span className={s.optionText} id={`result-${option.id}`}>
                  {option.label}
                </span>
                <span className="sr-only">
                  {option.percentage}% of votes, {option.votes} total votes
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
                  className={`${s.progressFill} ${s[`gradient${index + 1}`]} ${s.fillAnimation}`}
                  style={{
                    width: `${option.percentage}%`,
                    animationDelay: `${400 + index * 150}ms`,
                  }}
                />
              </div>
              <span id={`result-${option.id}-description`} className="sr-only">
                Progress bar showing {option.percentage}% support for this
                option
              </span>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        {cta && (
          <footer className={`${s.ctaFooter} ${s.fadeInUp}`}>
            <div className={s.ctaContent}>
              <h4 className={s.ctaTitle}>{cta.title}</h4>
              <p className={s.ctaDescription}>
                {cta.description}{" "}
                {cta.highlightText && (
                  <span className={s.highlight}>{cta.highlightText}</span>
                )}
              </p>
              <button
                className={s.ctaButton}
                onClick={() => {
                  // Retrieve stored poll selection for API submission
                  const pollKey = `poll_selection_${question.replace(/\s+/g, "_").toLowerCase()}`;
                  const storedPollData = localStorage.getItem(pollKey);

                  if (storedPollData) {
                    try {
                      const pollData = JSON.parse(storedPollData);
                      console.log(
                        "Poll data available for API submission:",
                        pollData,
                      );
                      // Pass poll data to CTA click handler
                      cta.onCtaClick?.(pollData);
                    } catch (error) {
                      console.warn("Failed to parse stored poll data:", error);
                      cta.onCtaClick?.();
                    }
                  } else {
                    console.warn("No poll selection found in localStorage");
                    cta.onCtaClick?.();
                  }
                }}
                aria-label={`${cta.buttonText} button`}
              >
                {cta.buttonIcon && `${cta.buttonIcon} `}
                {cta.buttonText}
              </button>
            </div>
          </footer>
        )}
      </section>
    );
  }

  return (
    <section
      className={`${s.poll} ${isTransitioning ? s.transitioning : ""}`}
      role="region"
      aria-label="Interactive poll"
      aria-busy={isTransitioning}
    >
      <header className={s.pollHeader}>
        <h3 className={s.title} id="poll-title">
          {title}
        </h3>
        <p className={s.question} id="poll-question">
          {question}
        </p>
      </header>

      <fieldset
        className={s.optionsContainer}
        aria-labelledby="poll-title"
        aria-describedby="poll-question poll-instructions"
        disabled={isTransitioning}
      >
        <legend className="sr-only">Poll options: {question}</legend>
        <div id="poll-instructions" className="sr-only">
          Use arrow keys to navigate between options. Press Enter or Space to
          select an option.
        </div>

        {updatedOptions.map((option) => (
          <div key={option.id} className={s.optionItem}>
            <input
              type="radio"
              name="poll-option"
              id={`option-${option.id}`}
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => handleOptionSelect(option.id)}
              onKeyDown={(e) => handleKeyDown(e, option.id)}
              className={s.radioInput}
              aria-describedby={`option-${option.id}-label`}
              disabled={isTransitioning}
              tabIndex={isTransitioning ? -1 : 0}
            />
            <label
              htmlFor={`option-${option.id}`}
              className={`${s.customRadio} ${selectedOption === option.id ? s.selected : ""} ${isTransitioning ? s.transitioning : ""}`}
              id={`option-${option.id}-label`}
            >
              <span className={s.optionText}>{option.label}</span>
              <div className={s.radioButton} aria-hidden="true">
                {selectedOption === option.id && (
                  <div className={s.radioButtonInner} />
                )}
              </div>
            </label>

            {/* Status announcement for screen readers */}
            {selectedOption === option.id && (
              <div className="sr-only" aria-live="assertive" role="status">
                {option.label} selected. Vote will be cast automatically.
              </div>
            )}
          </div>
        ))}
      </fieldset>

      {/* Loading state announcement */}
      {isTransitioning && (
        <div className="sr-only" aria-live="assertive" role="status">
          Processing your vote...
        </div>
      )}
    </section>
  );
};

export default Poll;
