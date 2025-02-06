import { useState } from "react";
import s from "./burger-menu.module.scss";
import Link from "next/link";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.burgerMenu}>
      <button className={s.burgerButton} onClick={toggleMenu}>
        <span className={s.burgerIcon}></span>
        <span className={s.burgerIcon}></span>
        <span className={s.burgerIcon}></span>
      </button>
      {isOpen && (
        <nav className={s.menu}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default BurgerMenu;
