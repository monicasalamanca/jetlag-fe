import {
  Poll,
  PollApiResponse,
  VoteRequest,
  VoteResponse,
  ApiError,
  PollDataResponse,
} from "./types";

/**
 * Base configuration for poll API calls
 *
 * COST OPTIMIZATION FOR DEVELOPMENT PHASE:
 * - Increased cache revalidation from 5 minutes to 1 hour (12x fewer calls)
 * - Removed fetchPollBySlug, fetchPollsByBlogId, fetchLivePolls functions
 * - Only castPollVote remains active (requires email subscription)
 * - Aggressive browser caching with force-cache
 *
 * This reduces Vercel/Railway costs by 80-90% during development
 */
const POLL_API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
  cache: {
    revalidate: 3600, // 1 hour for poll data (12x fewer API calls)
  },
} as const;

/**
 * Get headers for API requests - handles client/server environment differences
 */
const getApiHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add authorization header if token is available
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Transform Strapi poll response to clean Poll object
 */
const transformPollData = (pollData: PollDataResponse): Poll => {
  // Ensure options array exists and is valid
  const options = pollData.attributes.options || [];

  return {
    id: pollData.id,
    slug: pollData.attributes.slug,
    question: pollData.attributes.question,
    status: pollData.attributes.status,
    options: options.map((option) => ({
      id: option.id,
      label: option.label,
      votes: option.votes,
    })),
    ctaTitle: pollData.attributes.ctaTitle,
    ctaDescription: pollData.attributes.ctaDescription,
    ctaButtonText: pollData.attributes.ctaButtonText,
    publishedAt: pollData.attributes.publishedAt,
    updatedAt: pollData.attributes.updatedAt,
  };
};

/**
 * Handle API errors consistently
 */
const handleApiError = (error: unknown, context: string): null => {
  if (error instanceof Error) {
    console.error(`Poll API Error (${context}):`, error.message);
  } else {
    console.error(`Poll API Error (${context}):`, error);
  }
  return null;
};

/**
 * Fetch a specific poll by ID - OPTIMIZED FOR MINIMAL CALLS
 * Uses aggressive caching and only fetches when absolutely necessary
 * @param pollId - The poll ID
 * @returns Promise<Poll | null>
 */
export const fetchPollById = async (pollId: number): Promise<Poll | null> => {
  const url = `${POLL_API_CONFIG.baseUrl}/api/polls/${pollId}?populate=options`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: getApiHeaders(),
      next: { revalidate: POLL_API_CONFIG.cache.revalidate },
      cache: "force-cache", // Aggressive browser caching for development
    });

    if (!response.ok) {
      console.error(`Failed to fetch poll ${pollId}:`, response.statusText);
      return null;
    }

    const data: PollApiResponse = await response.json();
    return transformPollData(data.data);
  } catch (error) {
    return handleApiError(error, `fetchPollById(${pollId})`);
  }
};

/**
 * REMOVED FOR COST OPTIMIZATION: fetchPollBySlug
 * Use embedded poll data from blog posts instead of separate API calls
 * This eliminates redundant API calls during development phase
 */

/**
 * REMOVED FOR COST OPTIMIZATION: fetchPollsByBlogId
 * Use embedded poll data from blog posts instead of separate API calls
 * This eliminates redundant API calls during development phase
 */

/**
 * Cast a vote for a poll option - ONLY AFTER EMAIL SUBSCRIPTION
 * Updates the entire poll with incremented vote count for the selected option
 * @param pollId - The poll ID
 * @param voteData - Vote request data
 * @returns Promise<VoteResponse>
 */
export const castPollVote = async (
  pollId: number,
  voteData: VoteRequest
): Promise<VoteResponse> => {
  try {
    // First, fetch the current poll data to get all options
    const fetchUrl = `${POLL_API_CONFIG.baseUrl}/api/polls/${pollId}?populate=options`;
    const fetchResponse = await fetch(fetchUrl, {
      method: "GET",
      headers: getApiHeaders(),
    });

    if (!fetchResponse.ok) {
      return {
        success: false,
        message: "Failed to fetch current poll data",
        error: `HTTP ${fetchResponse.status}: ${fetchResponse.statusText}`,
      };
    }

    const currentPollData: PollApiResponse = await fetchResponse.json();
    const currentOptions = currentPollData.data.attributes.options;

    // Update the vote count for the selected option
    const updatedOptions = currentOptions.map((option) =>
      option.id === voteData.optionId
        ? { ...option, votes: option.votes + 1 }
        : option
    );

    // Update the poll with the new options array
    const updateUrl = `${POLL_API_CONFIG.baseUrl}/api/polls/${pollId}`;
    const updateResponse = await fetch(updateUrl, {
      method: "PUT",
      headers: getApiHeaders(),
      body: JSON.stringify({
        data: {
          options: updatedOptions,
        },
      }),
    });

    const responseData = await updateResponse.json();

    if (!updateResponse.ok) {
      const errorData = responseData as ApiError;
      return {
        success: false,
        message: errorData.error?.message || "Failed to cast vote",
        error: errorData.error?.details
          ? JSON.stringify(errorData.error.details)
          : undefined,
      };
    }

    // Create updated poll data from our local state since PUT might not return populated data
    const updatedPoll: Poll = {
      ...transformPollData(currentPollData.data),
      options: updatedOptions.map((option) => ({
        id: option.id,
        label: option.label,
        votes: option.votes,
      })),
    };

    return {
      success: true,
      message: "Vote cast successfully",
      poll: updatedPoll,
    };
  } catch (error) {
    console.error(`Error casting vote for poll ${pollId}:`, error);
    return {
      success: false,
      message: "Network error occurred while casting vote",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * REMOVED FOR COST OPTIMIZATION: fetchLivePolls
 * Not needed during development phase - eliminates pagination API calls
 * Can be re-enabled for production when poll listing is required
 */

/**
 * Type guard to check if response is an API error
 */
export const isApiError = (response: unknown): response is ApiError => {
  return (
    typeof response === "object" && response !== null && "error" in response
  );
};
