"use client";

import { useState, useEffect } from "react";
import Quiz, { QuizData } from "../quiz/quiz";
import styles from "./quiz-container.module.scss";

// API Response types
type QuizStatus = "live" | "draft" | "archived";

interface QuizAttributes {
  title: string;
  slug: string;
  status: QuizStatus;
  difficulty: string;
  estimatedTime: string;
  payload: QuizData;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface QuizApiResponse {
  data: {
    id: number;
    attributes: QuizAttributes;
  };
  meta: Record<string, unknown>;
}

interface QuizContainerProps {
  apiEndpoint?: string; // Base API endpoint, defaults to "/api/quizzes"
  quizId?: string | number; // Quiz ID to fetch, e.g., "1" or 1
}

/**
 * QuizContainer Component
 *
 * Fetches quiz data from the API endpoint `/api/quizzes/{id}` directly by ID
 *
 * Expected API Response Structure:
 * {
 *   "data": {
 *     "id": number,
 *     "attributes": {
 *       "title": string,
 *       "slug": string,
 *       "status": "live" | "draft" | "archived",
 *       "difficulty": string,
 *       "estimatedTime": string,
 *       "payload": QuizData,
 *       "createdAt": string,
 *       "updatedAt": string,
 *       "publishedAt": string
 *     }
 *   },
 *   "meta": {}
 * }
 *
 * Usage:
 * <QuizContainer /> // Uses default quiz ID (1)
 * <QuizContainer quizId={2} />
 * <QuizContainer quizId="3" />
 * <QuizContainer apiEndpoint="http://localhost:1337/api/quizzes" quizId={1} />
 */

const QuizContainer: React.FC<QuizContainerProps> = ({
  apiEndpoint = "/api/quizzes",
  quizId = 1,
}) => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Construct the API URL for direct ID access
        const apiUrl = buildApiUrl(apiEndpoint, quizId);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch quiz data: ${response.status} ${response.statusText}`,
          );
        }

        const apiResponse: QuizApiResponse = await response.json();

        // Check if we got quiz data
        if (!apiResponse.data) {
          throw new Error(`No quiz found with ID "${quizId}"`);
        }

        const quiz = apiResponse.data;

        // Validate that the quiz is live
        if (quiz.attributes.status !== "live") {
          throw new Error(
            `Quiz "${quizId}" is not currently available (status: ${quiz.attributes.status})`,
          );
        }

        // Validate that payload exists
        if (!quiz.attributes.payload) {
          throw new Error("Quiz payload is missing or invalid");
        }

        // Set the quiz data and title from the API response
        setQuizData(quiz.attributes.payload);
        setQuizTitle(quiz.attributes.title);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load quiz";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [apiEndpoint, quizId]);

  const handleQuizComplete = () => {
    // You can add additional completion logic here
    // e.g., save to database, track analytics, etc.
  };

  // Helper function to construct API URL for ID-based access
  const buildApiUrl = (baseUrl: string, id: string | number): string => {
    return `${baseUrl}/${id}`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>Loading your adventure...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3 className={styles.errorTitle}>Quiz Loading Failed</h3>
        <p className={styles.errorMessage}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!quizData) {
    return null;
  }

  return (
    <section className={styles.container}>
      <Quiz
        quizData={quizData}
        title={quizTitle || "Quiz"}
        description="Test your knowledge and discover new insights!"
        onComplete={handleQuizComplete}
      />
    </section>
  );
};

export default QuizContainer;

// Export types for reuse in other components
export type { QuizApiResponse, QuizAttributes, QuizStatus, QuizContainerProps };
