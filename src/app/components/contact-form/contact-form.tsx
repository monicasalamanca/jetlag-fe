"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
import Modal from "../modal/modal";

import s from "./contact-form.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

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
        <h2 className={s.contactFormTitle}>Get in Touch</h2>
        <p className={s.contactformDescription}>
          Have a question? Fill out the form below!
        </p>
        <form onSubmit={handleSubmit} className={s.formContainer}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            className={s.formInput}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            className={s.formInput}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            onChange={handleChange}
            className={s.formInput}
            required
          ></textarea>
          <button type="submit" className={s.submitButton}>
            Send Message
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ContactForm;
