import { useState, useCallback, useEffect } from "react";
import {
  Poll,
  VoteResponse,
  PollOption,
  VoteRequest,
} from "../../../../api/poll";
import { castPollVote } from "../../../../api/poll/client";

export interface PollOptionWithPercentage extends PollOption {
  percentage: number;
}

interface UsePollProps {
  poll: Poll | null;
  onVote?: (optionId: number, voteResponse: VoteResponse) => void;
  simulateVotes?: boolean; // Enable vote simulation for polls with 0 votes
}

interface UsePollReturn {
  isLoading: boolean;
  error: Error | null;
  hasVoted: boolean;
  selectedOptionId: number | null;
  optionsData: PollOptionWithPercentage[];
  handleVote: (optionId: number) => Promise<void>;
  clearError: () => void;
  isSimulated: boolean; // Whether the votes are simulated
}

const calculatePercentages = (
  options: PollOption[],
): PollOptionWithPercentage[] => {
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return options.map((option) => ({
    ...option,
    percentage:
      totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0,
  }));
};

// Simulate vote distribution for polls with 0 votes
const simulateVoteDistribution = (options: PollOption[]): PollOption[] => {
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  // Only simulate if all votes are 0
  if (totalVotes > 0) return options;

  // Create simulated vote distribution (total of 5 votes)
  const simulatedVotes = [2, 2, 1, 0]; // Example distribution

  return options.map((option, index) => ({
    ...option,
    votes: simulatedVotes[index] || 0,
  }));
};

export const usePoll = ({
  poll,
  onVote,
  simulateVotes = true,
}: UsePollProps): UsePollReturn => {
  // Early validation
  if (!poll) {
    throw new Error("Poll data is required but was not provided");
  }

  if (!poll.id) {
    throw new Error("Poll must have a valid ID");
  }

  if (!poll.options || !Array.isArray(poll.options)) {
    throw new Error("Poll must have valid options array");
  }

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [localOptions, setLocalOptions] = useState<PollOption[]>(poll.options);
  const [isSimulated, setIsSimulated] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  // Check if poll needs vote simulation
  useEffect(() => {
    if (simulateVotes) {
      const totalVotes = poll.options.reduce(
        (sum, option) => sum + option.votes,
        0,
      );
      if (totalVotes === 0) {
        const simulatedOptions = simulateVoteDistribution(poll.options);
        setLocalOptions(simulatedOptions);
        setIsSimulated(true);
      }
    }
  }, [poll.options, simulateVotes]);

  // Check subscription status from localStorage
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

  // REMOVED: Event listener for subscription - using direct callback instead
  // This prevents duplicate state updates that can cause page freezing

  // Check if user has already voted (localStorage)
  useEffect(() => {
    try {
      const votedPolls = localStorage.getItem("votedPolls");
      if (votedPolls) {
        const parsedVotedPolls = JSON.parse(votedPolls);
        const pollVote = parsedVotedPolls[poll.id];
        if (pollVote) {
          setHasVoted(true);
          setSelectedOptionId(pollVote.optionId);
        }
      }
    } catch (error) {
      console.warn("Failed to check voting status from localStorage:", error);
    }
  }, [poll.id]);

  const handleVote = useCallback(
    async (optionId: number) => {
      if (!poll || isLoading || hasVoted) return;

      try {
        setIsLoading(true);
        setError(null);

        // COST OPTIMIZATION: Always simulate first - no API calls until subscription
        if (!hasSubscribed) {
          // Pure UI simulation - ZERO API calls
          setLocalOptions((prev) =>
            prev.map((option) =>
              option.id === optionId
                ? { ...option, votes: option.votes + 1 }
                : option,
            ),
          );

          // Update voting state
          setHasVoted(true);
          setSelectedOptionId(optionId);

          // Store simulated vote in localStorage
          try {
            const votedPolls = JSON.parse(
              localStorage.getItem("votedPolls") || "{}",
            );
            votedPolls[poll.id] = {
              optionId,
              timestamp: Date.now(),
              isSimulated: true,
            };
            localStorage.setItem("votedPolls", JSON.stringify(votedPolls));
          } catch (storageError) {
            console.warn("Failed to store simulated vote:", storageError);
          }

          // Create mock response for callback
          const mockResponse: VoteResponse = {
            success: true,
            message: "Vote recorded (simulation - no API call)",
          };

          // Call onVote callback if provided
          onVote?.(optionId, mockResponse);

          setIsLoading(false);
          return;
        }

        // Real vote handling - ONLY when user has subscribed (saves money!)
        // Optimistic update
        setLocalOptions((prev) =>
          prev.map((option) =>
            option.id === optionId
              ? { ...option, votes: option.votes + 1 }
              : option,
          ),
        );

        const voteRequest: VoteRequest = {
          optionId,
          metadata: {
            timestamp: Date.now(),
          },
        };

        const voteResponse = await castPollVote(poll.id, voteRequest);

        if (voteResponse.success) {
          // Update state with successful vote
          setHasVoted(true);
          setSelectedOptionId(optionId);

          // Store vote in localStorage
          try {
            const votedPolls = JSON.parse(
              localStorage.getItem("votedPolls") || "{}",
            );
            votedPolls[poll.id] = {
              optionId,
              timestamp: Date.now(),
              isSimulated: false,
            };
            localStorage.setItem("votedPolls", JSON.stringify(votedPolls));
          } catch (storageError) {
            console.warn("Failed to store vote in localStorage:", storageError);
          }

          // Call onVote callback if provided
          onVote?.(optionId, voteResponse);
        } else {
          throw new Error(voteResponse.message || "Failed to cast vote");
        }
      } catch (error) {
        console.error("Failed to cast vote:", error);

        // Revert optimistic update
        setLocalOptions(
          isSimulated ? simulateVoteDistribution(poll.options) : poll.options,
        );

        setError(
          error instanceof Error ? error : new Error("Failed to cast vote"),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [poll, isLoading, hasVoted, onVote, isSimulated, hasSubscribed],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const optionsData = calculatePercentages(localOptions);

  return {
    isLoading,
    error,
    hasVoted,
    selectedOptionId,
    optionsData,
    handleVote,
    clearError,
    isSimulated,
  };
};
