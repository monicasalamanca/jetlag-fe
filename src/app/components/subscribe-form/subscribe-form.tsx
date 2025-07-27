"use client";

import dynamic from "next/dynamic";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import Modal from "../modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMessage,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { trackEvent } from "@/app/utils/analytics";

const Success = dynamic(() => import("./success/success"), {
  loading: () => <p>Loading...</p>,
});

const Error = dynamic(() => import("./error/error"), {
  loading: () => <p>Loading...</p>,
});

import s from "./subscribe-form.module.scss";

const SubscribeForm: FC<{
  buttonName: string;
  showIcon: boolean;
  trackEventName?: string;
}> = ({ buttonName, showIcon, trackEventName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ email: "" });
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "submit",
        email: form.email,
        botField: (event.target as HTMLFormElement)["bot-field"].value,
      }),
    });

    trackEvent({
      action: "click",
      category: "subscribe from",
      label: `${trackEventName}`,
    });

    if (res.status === 200) {
      setIsFormOpen(false);
      setIsSuccess(true);
      setIsError(false);
      setTimeout(() => {
        setIsOpen(false);
        setIsFormOpen(true);
        setIsSuccess(false);
        setIsError(false);
      }, 5000);
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

  return (
    <>
      <button
        aria-label="subscribe to our newsletter"
        onClick={() => setIsOpen(true)}
        className={s.contactUsButton}
      >
        {buttonName}
        {showIcon && <FontAwesomeIcon icon={faMessage} className={s.icon} />}
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {isFormOpen && (
          <>
            <h2 className={s.contactFormTitle}>
              Subscribe for the Cool Stuff Only
            </h2>
            <p className={s.contactFormDescription}>
              Think of it like a travel mixtape: curated tips, digital freebies,
              and zero nonsense. Just pop in your email and we’ll take it from
              there.
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
                Unlock Freebies
                <FontAwesomeIcon icon={faPaperPlane} className={s.icon} />
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
