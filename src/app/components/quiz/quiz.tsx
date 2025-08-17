"use client";

import {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
  useTransition,
} from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faMap,
  faMotorcycle,
  faCheck,
  faTimes,
  faCheckCircle,
  faTrophy,
  faMedal,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { trackEvent } from "@/app/utils/analytics";
import s from "./quiz.module.scss";

// Performance optimization: Preload critical icons
if (typeof window !== "undefined") {
  // Preload critical icons for better performance
  const criticalIcons = [
    faBrain,
    faCheck,
    faTimes,
    faChevronLeft,
    faChevronRight,
  ];
  criticalIcons.forEach(() => {}); // Simple reference to ensure bundling
}

// Debounce utility for performance optimization
const debounce = <T extends (...args: never[]) => void>(
  func: T,
  wait: number,
): T => {
  let timeout: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }) as T;
};

// Memoized QuizOption Component for better performance
const QuizOptionComponent = memo<{
  option: QuizOption;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
  showFeedback: boolean;
  currentQuestionIndex: number;
  questionType: "single" | "multiple" | "boolean";
  onSelect: (optionId: string) => void;
}>(
  ({
    option,
    index,
    isSelected,
    isCorrect,
    isIncorrect,
    showFeedback,
    currentQuestionIndex,
    questionType,
    onSelect,
  }) => {
    const handleClick = useCallback(() => {
      onSelect(option.id);
    }, [option.id, onSelect]);

    return (
      <button
        className={`${s.option} ${isSelected ? s.selected : ""} ${
          showFeedback
            ? isCorrect
              ? s.correct
              : isIncorrect
                ? s.incorrect
                : ""
            : ""
        }`}
        onClick={handleClick}
        disabled={showFeedback}
        role={questionType === "single" ? "radio" : "checkbox"}
        aria-checked={isSelected}
        aria-describedby={
          showFeedback ? `feedback-${currentQuestionIndex}` : undefined
        }
        aria-label={`Option ${index + 1}: ${option.text}${isSelected ? " (selected)" : ""}${
          showFeedback
            ? isCorrect
              ? " (correct answer)"
              : isIncorrect
                ? " (incorrect)"
                : ""
            : ""
        }`}
      >
        <div className={s.radioButton} aria-hidden="true">
          {showFeedback && isCorrect && (
            <FontAwesomeIcon icon={faCheck} className={s.feedbackIcon} />
          )}
          {showFeedback && isIncorrect && (
            <FontAwesomeIcon icon={faTimes} className={s.feedbackIcon} />
          )}
        </div>
        <span className={s.optionText}>{option.text}</span>
      </button>
    );
  },
);

QuizOptionComponent.displayName = "QuizOptionComponent";

// Memoized NavigationDots Component for better performance
const NavigationDots = memo<{
  questionsLength: number;
  currentIndex: number;
  showFeedback: boolean;
}>(({ questionsLength, currentIndex, showFeedback }) => {
  const dots = useMemo(() => {
    return Array.from({ length: questionsLength }, (_, index) => (
      <span
        key={index}
        className={`${s.navigationDot} ${
          index === currentIndex ? s.active : ""
        } ${
          index < currentIndex || (index === currentIndex && showFeedback)
            ? s.completed
            : ""
        }`}
        aria-label={`Question ${index + 1}${
          index === currentIndex
            ? " (current)"
            : index < currentIndex || (index === currentIndex && showFeedback)
              ? " (completed)"
              : " (upcoming)"
        }`}
        role="img"
      />
    ));
  }, [questionsLength, currentIndex, showFeedback]);

  return (
    <div
      className={s.navigationDots}
      role="group"
      aria-label="Quiz progress indicators"
    >
      {dots}
    </div>
  );
});

NavigationDots.displayName = "NavigationDots";

// Types based on your API response structure
export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  type: "single" | "multiple" | "boolean";
  prompt: string;
  shuffleOptions?: boolean;
  options: QuizOption[];
  answer: string[];
  explanation: string;
}

export interface QuizThreshold {
  min: number;
  max: number;
  title: string;
  message: string;
  ctaText: string;
  ctaUrl: string;
}

export interface QuizResults {
  cta: {
    thresholds: QuizThreshold[];
  };
}

export interface QuizMeta {
  category: string;
  difficulty: string;
  estReadTime: string;
  abVariant: string;
}

export interface QuizData {
  version: string;
  id: string;
  shuffleQuestions: boolean;
  timeLimitSec: number;
  scoring: {
    mode: string;
    perCorrect: number;
    perWrong: number;
    partialCredit: boolean;
  };
  meta: QuizMeta;
  questions: QuizQuestion[];
  results: QuizResults;
}

export interface QuizProps {
  quizData: QuizData;
  title?: string;
  description?: string;
  onComplete?: (score: number, totalQuestions: number) => void;
  className?: string;
}

interface UserAnswer {
  questionId: string;
  selectedOptions: string[];
  isCorrect: boolean;
  score: number;
}

const Quiz: FC<QuizProps> = ({
  quizData,
  title = "Test Your Travel Smarts",
  description = "Think you know the ropes? Let's see how street-smart you really are.",
  onComplete,
  className,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>(
    [],
  );
  const [finalScore, setFinalScore] = useState(0);
  const [currentResult, setCurrentResult] = useState<QuizThreshold | null>(
    null,
  );

  // Use transitions for non-urgent updates
  const [isPending, startTransition] = useTransition();

  // Memoize debounced analytics tracking for performance
  const debouncedTrackEvent = useMemo(() => debounce(trackEvent, 300), []);

  // Memoize current question to prevent unnecessary re-renders
  const currentQuestion = useMemo(() => {
    return shuffledQuestions[currentQuestionIndex];
  }, [shuffledQuestions, currentQuestionIndex]);

  // Memoize progress calculation
  const progress = useMemo(() => {
    return (
      ((currentQuestionIndex + (showFeedback ? 1 : 0)) /
        shuffledQuestions.length) *
      100
    );
  }, [currentQuestionIndex, showFeedback, shuffledQuestions.length]);

  // Initialize quiz and start immediately
  useEffect(() => {
    let questions = [...quizData.questions];

    // Shuffle questions if enabled
    if (quizData.shuffleQuestions) {
      questions = questions.sort(() => Math.random() - 0.5);
    }

    // Shuffle options within each question if enabled
    questions = questions.map((question) => {
      if (question.shuffleOptions) {
        return {
          ...question,
          options: [...question.options].sort(() => Math.random() - 0.5),
        };
      }
      return question;
    });

    setShuffledQuestions(questions);

    // Track quiz start immediately
    if (questions.length > 0) {
      debouncedTrackEvent({
        action: "start_quiz",
        category: "quiz",
        label: `${quizData.meta.category} - ${quizData.id}`,
        custom_parameters: {
          quiz_id: quizData.id,
          quiz_category: quizData.meta.category,
          quiz_difficulty: quizData.meta.difficulty,
        },
      });
    }
  }, [quizData, quizData.meta.category, debouncedTrackEvent]);

  const handleOptionSelect = useCallback(
    (optionId: string) => {
      if (showFeedback) return;

      if (
        currentQuestion.type === "single" ||
        currentQuestion.type === "boolean"
      ) {
        setSelectedOptions([optionId]);
      } else {
        setSelectedOptions((prev) =>
          prev.includes(optionId)
            ? prev.filter((id) => id !== optionId)
            : [...prev, optionId],
        );
      }
    },
    [currentQuestion?.type, showFeedback],
  );

  const calculateScore = useCallback(
    (questionAnswers: string[], correctAnswers: string[]): number => {
      if (quizData.scoring.mode === "standard") {
        const isCorrect =
          questionAnswers.length === correctAnswers.length &&
          questionAnswers.every((answer) => correctAnswers.includes(answer));
        return isCorrect
          ? quizData.scoring.perCorrect
          : quizData.scoring.perWrong;
      }
      return 0;
    },
    [quizData.scoring],
  );

  const handleSubmitAnswer = useCallback(() => {
    if (selectedOptions.length === 0 || !currentQuestion) return;

    const score = calculateScore(selectedOptions, currentQuestion.answer);
    const isCorrect = score > 0;

    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptions: [...selectedOptions],
      isCorrect,
      score,
    };

    setUserAnswers((prev) => [...prev, userAnswer]);
    setShowFeedback(true);

    // Focus the feedback panel for screen readers
    setTimeout(() => {
      const feedbackElement = document.getElementById(
        `feedback-${currentQuestionIndex}`,
      );
      if (feedbackElement) {
        feedbackElement.focus();
      }
    }, 100);

    debouncedTrackEvent({
      action: "answer_question",
      category: "quiz",
      label: `Q${currentQuestionIndex + 1}: ${isCorrect ? "Correct" : "Incorrect"}`,
      custom_parameters: {
        quiz_id: quizData.id,
        question_id: currentQuestion.id,
        question_number: currentQuestionIndex + 1,
        is_correct: isCorrect,
        selected_options: selectedOptions.join(","),
      },
    });
  }, [
    selectedOptions,
    currentQuestion,
    calculateScore,
    currentQuestionIndex,
    quizData.id,
    debouncedTrackEvent,
  ]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      // Use transitions for non-urgent state updates
      startTransition(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOptions([]);
        setShowFeedback(false);
      });

      // Focus the next question for screen readers
      setTimeout(() => {
        const questionElement = document.getElementById(
          `question-${currentQuestionIndex + 2}-title`,
        );
        if (questionElement) {
          questionElement.focus();
        }
      }, 100);
    } else {
      // Quiz completed
      const totalScore = userAnswers.reduce(
        (sum, answer) => sum + answer.score,
        0,
      );
      const finalScoreWithCurrent =
        totalScore + (userAnswers[userAnswers.length - 1]?.score || 0);

      setFinalScore(finalScoreWithCurrent);

      // Find appropriate result threshold
      const result = quizData.results.cta.thresholds.find(
        (threshold) =>
          finalScoreWithCurrent >= threshold.min &&
          finalScoreWithCurrent <= threshold.max,
      );

      setCurrentResult(result || quizData.results.cta.thresholds[0]);
      setQuizCompleted(true);

      debouncedTrackEvent({
        action: "complete_quiz",
        category: "quiz",
        label: `${quizData.meta.category} - Score: ${finalScoreWithCurrent}/${shuffledQuestions.length}`,
        custom_parameters: {
          quiz_id: quizData.id,
          final_score: finalScoreWithCurrent,
          total_questions: shuffledQuestions.length,
          result_tier: result?.title || "Unknown",
        },
      });

      onComplete?.(finalScoreWithCurrent, shuffledQuestions.length);
    }
  }, [
    currentQuestionIndex,
    shuffledQuestions.length,
    userAnswers,
    quizData,
    onComplete,
    debouncedTrackEvent,
  ]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedOptions([]);
      setShowFeedback(false);
      // Remove the last answer
      setUserAnswers((prev) => prev.slice(0, -1));
    }
  }, [currentQuestionIndex]);

  // Loading state for questions not ready
  if (!currentQuestion || shuffledQuestions.length === 0) {
    return (
      <div className={`${s.quiz} ${className || ""}`}>
        <div className={s.questionCard}>
          <div className={s.questionHeader}>
            <h2 className={s.questionText}>Loading quiz questions...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (quizCompleted && currentResult) {
    return (
      <div
        className={`${s.quiz} ${className || ""}`}
        role="main"
        aria-label="Quiz Results"
      >
        <section className={s.resultsScreen} role="banner">
          <header className={s.resultHeader}>
            {/* Background decorative trophy */}
            <div className={s.backgroundIcons} aria-hidden="true">
              <FontAwesomeIcon icon={faTrophy} className={s.backgroundTrophy} />
            </div>
            <div className={s.resultHero}>
              <FontAwesomeIcon
                icon={faMedal}
                className={s.medalIcon}
                aria-hidden="true"
              />
              <h1 className={s.resultTitle}>{currentResult.title}</h1>
              <p className={s.resultSubtitle}>
                You scored {finalScore} out of {shuffledQuestions.length} -{" "}
                {currentResult.message}
              </p>
              <div
                className={s.scorePercentage}
                role="img"
                aria-label={`Your score: ${Math.round((finalScore / shuffledQuestions.length) * 100)} percent`}
              >
                {Math.round((finalScore / shuffledQuestions.length) * 100)}%
              </div>
            </div>
          </header>

          <div className={s.resultContent}>
            <p className={s.resultDescription}>{currentResult.message}</p>

            <div className={s.resultActions}>
              <Link
                href="/"
                className={s.ctaButton}
                aria-label="Go to homepage for more travel adventures"
                onClick={() =>
                  debouncedTrackEvent({
                    action: "click_home_redirect",
                    category: "quiz",
                    label: "Back to Home",
                    custom_parameters: {
                      quiz_id: quizData.id,
                      final_score: finalScore,
                    },
                  })
                }
              >
                <FontAwesomeIcon icon={faMap} aria-hidden="true" /> Read More
                Stories
              </Link>

              <Link
                href="/thailand"
                className={s.shareButton}
                aria-label="Explore Thailand travel guides and tips"
                onClick={() =>
                  debouncedTrackEvent({
                    action: "click_thailand_redirect",
                    category: "quiz",
                    label: "Thailand Page",
                    custom_parameters: {
                      quiz_id: quizData.id,
                      final_score: finalScore,
                    },
                  })
                }
              >
                <FontAwesomeIcon icon={faMotorcycle} aria-hidden="true" /> Ready
                for Thailand?
              </Link>
            </div>

            {/* <button
              className={s.anotherQuizButton}
              onClick={handleRestartQuiz}
              aria-label="Restart the quiz"
            >
              Take Another Quiz →
            </button> */}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      className={`${s.quiz} ${className || ""}`}
      role="main"
      aria-label="Interactive Quiz"
    >
      {/* Quiz Header with Brain Icon and Background Icons */}
      <header className={s.startScreen} role="banner">
        <div className={s.hero}>
          {/* Background decorative icons */}
          <div className={s.backgroundIcons} aria-hidden="true">
            <FontAwesomeIcon icon={faMap} className={s.backgroundIcon} />
            <FontAwesomeIcon
              icon={faMotorcycle}
              className={s.backgroundIconSmall}
            />
          </div>
          {/* Main brain icon */}
          <div className={s.mainIcon} aria-hidden="true">
            <FontAwesomeIcon icon={faBrain} />
          </div>
          <h1 className={s.title}>{title}</h1>
          <p className={s.description}>{description}</p>
        </div>
      </header>

      {/* Progress Bar */}
      <div
        className={s.progressBar}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Quiz progress: ${Math.round(progress)}% complete, question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`}
      >
        <div className={s.progressHeader}>
          <span className={s.progressText} aria-live="polite">
            Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
          </span>
          <span className={s.progressPercentage} aria-live="polite">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className={s.progressTrack}>
          <div className={s.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question Card */}
      <section
        className={`${s.questionCard} ${isPending ? s.loading : ""}`}
        role="group"
        aria-labelledby={`question-${currentQuestionIndex + 1}-title`}
        aria-busy={isPending}
      >
        <div className={s.questionHeader}>
          <div className={s.questionTitleArea}>
            <div
              className={s.questionNumber}
              aria-label={`Question ${currentQuestionIndex + 1}`}
            >
              {currentQuestionIndex + 1}
            </div>
            <h2
              className={s.questionText}
              id={`question-${currentQuestionIndex + 1}-title`}
            >
              {currentQuestion.prompt}
            </h2>
            <div className="sr-only" id="keyboard-help">
              Use number keys 1-9 to select options, Enter to submit your
              answer.
            </div>
          </div>
        </div>

        {/* Options */}
        <fieldset className={s.optionsContainer}>
          <legend className="sr-only">
            Choose your answer for question {currentQuestionIndex + 1}
          </legend>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOptions.includes(option.id);
            const isCorrect =
              showFeedback && currentQuestion.answer.includes(option.id);
            const isIncorrect =
              showFeedback &&
              isSelected &&
              !currentQuestion.answer.includes(option.id);

            return (
              <QuizOptionComponent
                key={option.id}
                option={option}
                index={index}
                isSelected={isSelected}
                isCorrect={isCorrect}
                isIncorrect={isIncorrect}
                showFeedback={showFeedback}
                currentQuestionIndex={currentQuestionIndex}
                questionType={currentQuestion.type}
                onSelect={handleOptionSelect}
              />
            );
          })}
        </fieldset>

        {/* Feedback Panel */}
        {showFeedback && (
          <div
            className={s.feedbackPanel}
            role="alert"
            aria-live="polite"
            id={`feedback-${currentQuestionIndex}`}
            tabIndex={-1}
          >
            <div className={s.feedbackContent}>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`${s.feedbackStatusIcon} ${
                  userAnswers[userAnswers.length - 1]?.isCorrect
                    ? s.correct
                    : s.incorrect
                }`}
                aria-hidden="true"
              />
              <div className={s.feedbackText}>
                <h4 className={s.feedbackTitle}>
                  {userAnswers[userAnswers.length - 1]?.isCorrect
                    ? "Boom! You nailed it! 🎉"
                    : "Not quite right! 🤔"}
                </h4>
                <p className={s.feedbackExplanation}>
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav
          className={s.navigation}
          role="navigation"
          aria-label="Quiz navigation"
        >
          <button
            className={s.navButton}
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0 || showFeedback}
            aria-label={`Go to previous question${currentQuestionIndex === 0 ? " (not available - first question)" : ""}`}
          >
            <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" /> Previous
          </button>

          {/* Navigation Dots */}
          <NavigationDots
            questionsLength={shuffledQuestions.length}
            currentIndex={currentQuestionIndex}
            showFeedback={showFeedback}
          />

          {!showFeedback ? (
            <button
              className={s.submitButton}
              onClick={handleSubmitAnswer}
              disabled={selectedOptions.length === 0}
              aria-describedby={
                selectedOptions.length === 0 ? "submit-help" : undefined
              }
            >
              Submit Answer
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
            </button>
          ) : (
            <button
              className={s.nextButton}
              onClick={handleNextQuestion}
              aria-label={
                currentQuestionIndex < shuffledQuestions.length - 1
                  ? "Continue to next question"
                  : "View final results"
              }
            >
              {currentQuestionIndex < shuffledQuestions.length - 1
                ? "Next Question"
                : "See Results"}
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
            </button>
          )}
        </nav>
      </section>
    </div>
  );
};

// Memoize the main Quiz component for better performance
const MemoizedQuiz = memo(Quiz);
MemoizedQuiz.displayName = "Quiz";

export default MemoizedQuiz;
