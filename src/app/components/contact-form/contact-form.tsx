"use client";

import dynamic from "next/dynamic";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import Modal from "../modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEnvelope,
  faMessage,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { postContactUs } from "@/api/client";
import { trackFormSubmission, trackLinkClick } from "@/app/utils/analytics";

const Success = dynamic(() => import("./success/success"), {
  loading: () => <p>Loading...</p>,
});

const Error = dynamic(() => import("./error/error"), {
  loading: () => <p>Loading...</p>,
});

import s from "./contact-form.module.scss";

const ContactForm: FC<{
  buttonName: string;
  showIcon: boolean;
}> = ({ buttonName, showIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleTwitterClick = () => {
    trackLinkClick({
      url: "https://twitter.com/the_jetlaggers",
      text: "Twitter/X Follow Link",
      location: "Contact Form",
      link_type: "social",
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await postContactUs(form);

    trackFormSubmission({
      formName: "Contact Form",
      location: window.location.pathname,
      success: !!res,
    });

    if (res) {
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
        aria-label="contact us"
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
              Talk to Us (We Swear, We’re Nice!)
            </h2>
            <p className={s.contactFormDescription}>
              Whether you have feedback, a question, or a million-dollar idea
              (seriously, we’re listening), shoot us a message. We’ll get back
              to you faster than you can say
            </p>
            <form onSubmit={handleSubmit} className={s.formContainer}>
              {/* <div className={s.header}>
              <div className={s.headerItem}>
                <div className={`${s.imgWrapper} ${s.worldIconWrapper}`}>
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className={`${s.icon} ${s.worldIcon}`}
                  />
                </div>
                <h3>Travel Tips</h3>
              </div>
              <div className={s.headerItem}>
                <div className={`${s.imgWrapper} ${s.laptopIconWrapper}`}>
                  <FontAwesomeIcon
                    icon={faLaptop}
                    className={`${s.icon} ${s.laptopIcon}`}
                  />
                </div>
                <h3>Remote Work</h3>
              </div>
              <div className={s.headerItem}>
                <div className={`${s.imgWrapper} ${s.handShakeIconWrapper}`}>
                  <FontAwesomeIcon
                    icon={faHandshakeSimple}
                    className={`${s.icon} ${s.handShakeIcon}`}
                  />
                </div>
                <h3>Colaborate</h3>
              </div>
            </div> */}
              <div className={s.inputWrapper}>
                <input
                  type="text"
                  name="name"
                  maxLength={120}
                  minLength={10}
                  placeholder="Your Awesome Name"
                  onChange={handleChange}
                  className={s.formInput}
                  required
                />
                <FontAwesomeIcon icon={faUser} className={s.icon} />
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
              <div className={s.inputWrapper}>
                <textarea
                  name="message"
                  placeholder="What's on your mind?"
                  maxLength={500}
                  onChange={handleChange}
                  className={s.formTextArea}
                  required
                  rows={3}
                />
                <FontAwesomeIcon icon={faComment} className={s.icon} />
              </div>
              <button
                aria-label="submit"
                type="submit"
                className={s.submitButton}
              >
                Send Message
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
                    onClick={handleTwitterClick}
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

export default ContactForm;
