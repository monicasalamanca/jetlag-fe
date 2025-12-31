"use client";

import dynamic from "next/dynamic";
import {
  ChangeEvent,
  FC,
  FormEvent,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
  memo,
} from "react";
import Modal from "../modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { trackFormSubmission } from "@/app/utils/analytics";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const Success = dynamic(() => import("./success/success"), {
  loading: () => <p>Loading...</p>,
});

const Error = dynamic(() => import("./error/error"), {
  loading: () => <p>Loading...</p>,
});

import s from "./subscribe-form.module.scss";

/**
 * Default configurations for scalability and maintainability
 */
const DEFAULT_CONFIGS = {
  MODAL_CLOSE_DELAY: 5000, // Increased to 5 seconds to show success message
  LOCAL_STORAGE_KEY: "hasSubscribedToDownload", // Used for subscription status
  FORM_VALIDATION: {
    EMAIL_MAX_LENGTH: 120,
    EMAIL_MIN_LENGTH: 10,
  },
  ANALYTICS: {
    DEFAULT_TRACK_NAME: "unknown",
  },
} as const;

/**
 * Configuration for the subscription modal and API
 */
interface SubscribeFormConfig {
  apiEndpoint: string;
  modal: {
    title: string;
    description: string;
  };
}

/**
 * Button variant types for the SubscribeForm component
 */
type ButtonVariant = "default" | "link-style" | "download-guide";

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
 * Enhanced SubscribeForm props with strict typing and comprehensive documentation
 *
 * @interface SubscribeFormProps
 * @description Comprehensive props interface for the SubscribeForm component with backward compatibility
 *
 * @example
 * ```tsx
 * // Modern API usage
 * <SubscribeForm
 *   variant="link-style"
 *   buttonName="Join Our Newsletter"
 *   showIcon={true}
 *   config={{
 *     apiEndpoint: "/api/custom-subscribe",
 *     modal: {
 *       title: "Custom Title",
 *       description: "Custom description"
 *     }
 *   }}
 *   onSubscriptionSuccess={() => console.log("Success!")}
 * />
 *
 * // Legacy API (still supported)
 * <SubscribeForm
 *   useCtaTypeAStyling={true}
 *   buttonName="Subscribe"
 *   showIcon={true}
 * />
 * ```
 */
interface SubscribeFormProps {
  buttonName: string;
  showName: boolean;
  showIcon: boolean;
  trackEventName?: string;
  /**
   * Button variant configuration
   * @default "default"
   */
  variant?: ButtonVariant;
  config?: SubscribeFormConfig;
  onSubscriptionSuccess?: SubscriptionSuccessCallback;
  customIcon?: IconDefinition;

  // Legacy props (deprecated but maintained for backward compatibility)
  /** @deprecated Use variant="link-style" instead */
  useCtaTypeAStyling?: boolean;
}

/**
 * SubscribeForm component with improved variant-based API, enhanced type safety, and scalability optimizations
 *
 * @example
 * // New recommended API
 * <SubscribeForm variant="link-style" buttonName="Subscribe" showIcon={true} />
 *
 * // Legacy API (deprecated but supported)
 * <SubscribeForm useCtaTypeAStyling={true} buttonName="Subscribe" showIcon={true} />
 */
const SubscribeForm: FC<SubscribeFormProps> = memo(
  ({
    buttonName,
    showName,
    showIcon,
    trackEventName,
    variant,
    config,
    onSubscriptionSuccess,
    customIcon,
    // Legacy props

    useCtaTypeAStyling = false,
  }): ReactNode => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [form, setForm] = useState<FormData>({ email: "" });
    const [isFormOpen, setIsFormOpen] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    // Cleanup effect to ensure body scroll is reset when component unmounts
    useEffect(() => {
      return () => {
        // Reset body scroll when component unmounts (e.g., when user subscribes)
        document.body.style.overflow = "auto";
      };
    }, []);

    // Memoized default configuration for better performance
    const defaultConfig: SubscribeFormConfig = useMemo(
      () => ({
        apiEndpoint: "/api/subscribe",
        modal: {
          title: "Subscribe for the Cool Stuff Only",
          description: "",
          // description:
          //   "Think of it as a travel mixtape. urated tips, digital freebies, zero nonsense. Drop your email and we’ll handle the rest.",
        },
      }),
      [],
    );

    // Use provided config or fall back to default
    const activeConfig = useMemo(
      () => config || defaultConfig,
      [config, defaultConfig],
    );

    /**
     * Enhanced form change handler with strict typing and optimized with useCallback
     */
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
          ...prevForm,
          [name]: value,
          timestamp: Date.now(),
        }));
      },
      [],
    );

    /**
     * Enhanced form submission handler with better error handling, type safety, and performance optimization
     */
    const handleSubmit = useCallback(
      async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

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

          // Enhanced analytics tracking with error context
          trackFormSubmission({
            formName: `Subscribe Form - ${trackEventName || DEFAULT_CONFIGS.ANALYTICS.DEFAULT_TRACK_NAME}`,
            location: window.location.pathname,
            success: responseData.status === 200,
          });

          if (responseData.status === 200) {
            setIsFormOpen(false);
            setIsSuccess(true);
            setIsError(false);

            // Store subscription status
            try {
              localStorage.setItem(DEFAULT_CONFIGS.LOCAL_STORAGE_KEY, "true");
              // Server handles duplicate email prevention
            } catch (error) {
              console.warn("Failed to store subscription status:", error);
            }

            // Call the subscription success callback
            if (onSubscriptionSuccess) {
              await onSubscriptionSuccess();
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
            }, DEFAULT_CONFIGS.MODAL_CLOSE_DELAY);
          } else {
            setIsFormOpen(false);
            setIsSuccess(false);
            setIsError(true);
          }
        } catch (error) {
          console.error("Form submission failed:", error);
          setIsFormOpen(false);
          setIsSuccess(false);
          setIsError(true);
        }
      },
      [
        activeConfig.apiEndpoint,
        form.email,
        form.timestamp,
        trackEventName,
        onSubscriptionSuccess,
      ],
    );

    // Determine the effective variant (new API takes precedence over legacy) - memoized for performance
    const effectiveVariant: ButtonVariant = useMemo(() => {
      if (variant) {
        return variant;
      }

      // Handle legacy props with deprecation warnings

      if (useCtaTypeAStyling) {
        console.warn(
          'SubscribeForm: useCtaTypeAStyling prop is deprecated. Use variant="link-style" instead.',
        );
        return "link-style";
      }

      return "default";
    }, [variant, useCtaTypeAStyling]);

    // Memoized button class for performance optimization
    const buttonClass = useMemo((): string => {
      switch (effectiveVariant) {
        case "download-guide":
          return s.downloadGuideButton;
        case "link-style":
          return s.linkStyleButton;
        case "default":
        default:
          return s.contactUsButton;
      }
    }, [effectiveVariant]);

    // Memoized modal behavior configuration
    const shouldDisableBodyScroll = useMemo((): boolean => {
      return effectiveVariant !== "download-guide";
    }, [effectiveVariant]);

    /**
     * Enhanced modal close handler with useCallback optimization
     */
    const closeModal = useCallback((): void => {
      setIsOpen(false);
      setIsFormOpen(true);
      setIsSuccess(false);
      setIsError(false);
      // Ensure body scroll is reset when modal is manually closed
      document.body.style.overflow = "auto";
    }, []);

    /**
     * Enhanced retry handler for failed submissions with useCallback optimization
     */
    const tryAgain = useCallback((): void => {
      setIsOpen(true);
      setIsFormOpen(true);
      setIsSuccess(false);
      setIsError(false);
    }, []);

    /**
     * Optimized modal open handler
     */
    const openModal = useCallback((): void => {
      setIsOpen(true);
    }, []);

    return (
      <>
        <button
          aria-label="subscribe to our newsletter"
          onClick={openModal}
          className={buttonClass}
        >
          {showName && buttonName}
          {showIcon && (
            <FontAwesomeIcon
              icon={customIcon || faEnvelope}
              className={s.icon}
            />
          )}
        </button>

        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          disableBodyScroll={shouldDisableBodyScroll}
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
                    maxLength={DEFAULT_CONFIGS.FORM_VALIDATION.EMAIL_MAX_LENGTH}
                    minLength={DEFAULT_CONFIGS.FORM_VALIDATION.EMAIL_MIN_LENGTH}
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
                    maxLength={DEFAULT_CONFIGS.FORM_VALIDATION.EMAIL_MAX_LENGTH}
                    minLength={DEFAULT_CONFIGS.FORM_VALIDATION.EMAIL_MIN_LENGTH}
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
                      href="https://x.com/thejetLaggers_X"
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
  },
);

// Add display name for better debugging
SubscribeForm.displayName = "SubscribeForm";

export default SubscribeForm;
