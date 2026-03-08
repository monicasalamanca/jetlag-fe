import { FC } from "react";
import s from "./burger-menu.module.scss";

const AnimatedBurgerIcon: FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <span
    className={`${s.burgerIcon}${isOpen ? ` ${s.burgerIconOpen}` : ""}`}
    aria-hidden="true"
  >
    <span className={s.burgerLine} />
    <span className={s.burgerLine} />
    <span className={s.burgerLine} />
  </span>
);

export default AnimatedBurgerIcon;
