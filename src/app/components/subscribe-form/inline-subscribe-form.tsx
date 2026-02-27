"use client";

import {
  ChangeEvent,
  FC,
  FormEvent,
  useState,
  ReactNode,
  useCallback,
  useMemo,
  memo,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { trackFormSubmission } from "@/app/utils/analytics";

import s from "./inline-subscribe-form.module.scss";

/**
 * Default configurations for the inline subscribe form
 */
const DEFAULT_CONFIGS = {
  LOCAL_STORAGE_KEY: "hasSubscribedToDownload",
  FORM_VALIDATION: {
    EMAIL_MAX_LENGTH: 120,
    EMAIL_MIN_LENGTH: 10,
  },
  ANALYTICS: {
    DEFAULT_TRACK_NAME: "Thank You Page",
  },
} as const;

/**
 * Configuration for the inline subscription form
 */
interface InlineSubscribeFormConfig {
  apiEndpoint: string;
  title: string;
  description: string;
  buttonText: string;
}

/**
 * Form submission response interface
 */
interface SubmissionResponse {
  status: number;
  message?: string;
}

/**
 * Enhanced form data interface
 */
interface FormData {
  email: string;
  readonly timestamp?: number;
}

/**
 * Subscription success callback with enhanced type safety
 */
type SubscriptionSuccessCallback = () => void | Promise<void>;

/**
 * Props for the InlineSubscribeForm component
 */
interface InlineSubscribeFormProps {
  trackEventName?: string;
  config?: InlineSubscribeFormConfig;
  onSubscriptionSuccess?: SubscriptionSuccessCallback;
}

/**
 * InlineSubscribeForm component - renders the subscription form directly on the page (no modal)
 *
 * @example
 * <InlineSubscribeForm trackEventName="Thank You Page" />
 */
const InlineSubscribeForm: FC<InlineSubscribeFormProps> = memo(
  ({ trackEventName, config, onSubscriptionSuccess }): ReactNode => {
    const [form, setForm] = useState<FormData>({ email: "" });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Memoized default configuration
    const defaultConfig: InlineSubscribeFormConfig = useMemo(
      () => ({
        apiEndpoint: "/api/subscribe",
        title: "Subscribe for the Cool Stuff Only",
        description:
          "Think of it as a travel mixtape. Curated tips, digital freebies, zero nonsense. Drop your email and we'll handle the rest.",
        buttonText: "Subscribe Now",
      }),
      [],
    );

    // Use provided config or fall back to default
    const activeConfig = useMemo(
      () => ({ ...defaultConfig, ...config }),
      [config, defaultConfig],
    );

    /**
     * Form change handler
     */
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
          ...prevForm,
          [name]: value,
          timestamp: Date.now(),
        }));
        // Clear error state when user starts typing
        if (isError) {
          setIsError(false);
          setErrorMessage("");
        }
      },
      [isError],
    );

    /**
     * Form submission handler
     */
    const handleSubmit = useCallback(
      async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        setIsError(false);
        setErrorMessage("");

        try {
          const formData = new FormData(event.currentTarget);
          const botFieldValue = formData.get("name") as string;

          const response = await fetch(activeConfig.apiEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              event: "submit",
              email: form.email,
              botField: botFieldValue,
              timestamp: form.timestamp || Date.now(),
            }),
          });

          const responseData: SubmissionResponse = {
            status: response.status,
            message: response.statusText,
          };

          // Track form submission
          trackFormSubmission({
            formName: `Subscribe Form - ${trackEventName || DEFAULT_CONFIGS.ANALYTICS.DEFAULT_TRACK_NAME}`,
            location: window.location.pathname,
            success: responseData.status === 200,
          });

          if (responseData.status === 200) {
            setIsSuccess(true);
            setIsError(false);

            // Store subscription status
            try {
              localStorage.setItem(DEFAULT_CONFIGS.LOCAL_STORAGE_KEY, "true");
            } catch (error) {
              console.warn("Failed to store subscription status:", error);
            }

            // Call the subscription success callback
            if (onSubscriptionSuccess) {
              await onSubscriptionSuccess();
            }

            // Dispatch global subscription event
            window.dispatchEvent(
              new CustomEvent("userSubscribed", {
                detail: { timestamp: Date.now() },
              }),
            );

            // Reset form
            setForm({ email: "" });
          } else {
            setIsError(true);
            setErrorMessage(
              responseData.message || "Something went wrong. Please try again.",
            );
          }
        } catch (error) {
          console.error("Form submission failed:", error);
          setIsError(true);
          setErrorMessage(
            "Unable to connect. Please check your internet and try again.",
          );
        } finally {
          setIsSubmitting(false);
        }
      },
      [
        activeConfig.apiEndpoint,
        form.email,
        form.timestamp,
        trackEventName,
        onSubscriptionSuccess,
        isSubmitting,
      ],
    );

    /**
     * Retry handler for failed submissions
     */
    const handleRetry = useCallback((): void => {
      setIsError(false);
      setErrorMessage("");
      setIsSuccess(false);
    }, []);

    // If successfully subscribed, hide the form and show success message
    if (isSuccess) {
      return (
        <div className={s.container}>
          <div className={s.successWrapper}>
            <div className={s.successIcon}>✓</div>
            <h3 className={s.successTitle}>You&apos;re All Set!</h3>
            <p className={s.successMessage}>
              Thanks for subscribing! Check your inbox for a welcome email with
              exclusive travel tips and resources.
            </p>
            <div className={s.socialMediaPrompt}>
              <p className={s.socialText}>Stay connected on social media</p>
              <div className={s.socialMediaWrapper}>
                <Link
                  aria-label="Go to the jet lag chronicles twitter account"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://x.com/thejetLaggers_X"
                  className={s.socialLink}
                >
                  <FontAwesomeIcon icon={faXTwitter} className={s.socialIcon} />
                </Link>
                <Link
                  aria-label="Go to the jet lag chronicles facebook account"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/thejetlaggersfb"
                  className={s.socialLink}
                >
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className={s.socialIcon}
                  />
                </Link>
                <Link
                  aria-label="Go to the jet lag chronicles instagram account"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/thejetlaggers_ig"
                  className={s.socialLink}
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className={s.socialIcon}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={s.container}>
        <div className={s.formWrapper}>
          <h2 className={s.title}>{activeConfig.title}</h2>
          {activeConfig.description && (
            <p className={s.description}>{activeConfig.description}</p>
          )}

          <form onSubmit={handleSubmit} className={s.formContainer}>
            {/* Honeypot field for bot detection */}
            <div className={s.honeypot}>
              <input
                id="bot-field"
                type="text"
                name="name"
                maxLength={DEFAULT_CONFIGS.FORM_VALIDATION.EMAIL_MAX_LENGTH}
                minLength={DEFAULT_CONFIGS.FORM_VALIDATION.EMAIL_MIN_LENGTH}
                placeholder="Your Awesome Name"
                onChange={handleChange}
                className={s.formInput}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className={s.inputAndButtonWrapper}>
              <div className={s.inputWrapper}>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  maxLength={DEFAULT_CONFIGS.FORM_VALIDATION.EMAIL_MAX_LENGTH}
                  minLength={DEFAULT_CONFIGS.FORM_VALIDATION.EMAIL_MIN_LENGTH}
                  placeholder="Your Email Address"
                  onChange={handleChange}
                  className={s.formInput}
                  required
                  disabled={isSubmitting}
                />
                <FontAwesomeIcon icon={faEnvelope} className={s.inputIcon} />
              </div>

              {isError && (
                <div className={s.errorWrapper}>
                  <p className={s.errorMessage}>
                    {errorMessage || "Something went wrong. Please try again."}
                  </p>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className={s.retryButton}
                  >
                    Try Again
                  </button>
                </div>
              )}

              <button
                aria-label="subscribe to newsletter"
                type="submit"
                className={s.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : activeConfig.buttonText}
                {!isSubmitting && (
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={s.buttonIcon}
                  />
                )}
              </button>
            </div>

            <footer className={s.footer}>
              <p className={s.footerText}>
                By subscribing, you agree to receive emails from The Jet Lag
                Chronicles.
              </p>
            </footer>
          </form>
        </div>
      </div>
    );
  },
);

// Add display name for better debugging
InlineSubscribeForm.displayName = "InlineSubscribeForm";

export default InlineSubscribeForm;
