"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import Modal from "../modal/modal";

import s from "./contact-form.module.scss";
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

const ContactForm: FC<{ buttonName: string; showIcon: boolean }> = ({
  buttonName,
  showIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", form);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={s.contactUsButton}>
        {buttonName}
        {showIcon && <FontAwesomeIcon icon={faMessage} className={s.icon} />}
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className={s.contactFormTitle}>
          Talk to Us (We Swear, We’re Nice!)
        </h2>
        <p className={s.contactFormDescription}>
          Whether you have feedback, a question, or a million-dollar idea
          (seriously, we’re listening), shoot us a message. We’ll get back to
          you faster than you can say
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
          <button type="submit" className={s.submitButton}>
            Send Message
            <FontAwesomeIcon icon={faPaperPlane} className={s.icon} />
          </button>
          <footer className={s.footer}>
            <p>Or reach us on social media</p>
            <div className={s.socialMediaWrapper}>
              <Link
                href="https://twitter.com/the_jetlaggers"
                className={s.link}
              >
                <FontAwesomeIcon icon={faXTwitter} className={s.icon} />
              </Link>
            </div>
          </footer>
        </form>
      </Modal>
    </>
  );
};

export default ContactForm;
