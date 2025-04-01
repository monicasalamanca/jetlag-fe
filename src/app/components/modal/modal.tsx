"use client";

import { useEffect, useState, FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import s from "./modal.module.scss";

const Modal: FC<{
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}> = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className={s.backdrop}>
      <div className={s.modalContent}>
        <button
          type="button"
          aria-label="close modal"
          onClick={onClose}
          className={s.closeButton}
        >
          <FontAwesomeIcon icon={faXmark} className={s.closeIcon} />
        </button>
        {children}
      </div>
    </div>,
    document.body // Portals directly to <body> in App Router
  );
};

export default Modal;
