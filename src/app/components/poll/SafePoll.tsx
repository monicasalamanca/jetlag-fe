/**
 * Safe Poll Wrapper Component
 * Handles loading states, errors, and data validation for poll rendering
 */

"use client";

import { FC } from "react";
import { Poll, VoteResponse } from "../../../api/poll";
import PollComponent from "./poll";
import s from "./poll.module.scss";

interface SafePollProps {
  poll?: Poll | null;
  isLoading?: boolean;
  error?: string | null;
  title?: string;
  onVote?: (optionId: number, voteResponse: VoteResponse) => void;
  showCTA?: boolean;
  className?: string;
  simulateVotes?: boolean;
}

/**
 * Loading skeleton component for polls
 */
const PollSkeleton: FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`${s.pollSkeleton} ${className}`}
    role="status"
    aria-label="Loading poll"
  >
    <div className={s.skeletonHeader}>
      <div className={s.skeletonTitle} />
      <div className={s.skeletonSubtitle} />
    </div>
    <div className={s.skeletonOptions}>
      <div className={s.skeletonOption} />
      <div className={s.skeletonOption} />
      <div className={s.skeletonOption} />
      <div className={s.skeletonOption} />
    </div>
    <span className="sr-only">Loading poll data...</span>
  </div>
);

/**
 * Error component for poll failures
 */
const PollError: FC<{
  error: string;
  className?: string;
  onRetry?: () => void;
}> = ({ error, className = "", onRetry }) => (
  <div className={`${s.poll} ${s.errorState} ${className}`} role="alert">
    <h3>Unable to Load Poll</h3>
    <p>{error}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className={s.retryButton}
        aria-label="Retry loading poll"
      >
        Try Again
      </button>
    )}
  </div>
);

/**
 * Safe Poll Wrapper - Handles all poll states gracefully
 */
const SafePoll: FC<SafePollProps> = ({
  poll,
  isLoading = false,
  error = null,
  title,
  onVote,
  showCTA = true,
  className = "",
  simulateVotes = true,
}) => {
  // Show loading state
  if (isLoading) {
    return <PollSkeleton className={className} />;
  }

  // Show error state
  if (error) {
    return <PollError error={error} className={className} />;
  }

  // Show empty state if no poll data
  if (!poll) {
    return null; // Render nothing if no poll is provided
  }

  // Validate poll structure
  if (
    !poll.id ||
    !poll.question ||
    !Array.isArray(poll.options) ||
    poll.options.length === 0
  ) {
    return (
      <PollError error="Invalid poll data structure" className={className} />
    );
  }

  // Render the actual poll component
  return (
    <PollComponent
      poll={poll}
      title={title}
      onVote={onVote}
      showCTA={showCTA}
      className={className}
      simulateVotes={simulateVotes}
    />
  );
};

export default SafePoll;
