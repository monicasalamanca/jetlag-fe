"use client";

import Image from "next/image";
import BurgerMenu from "./burger-menu/burger-menu";

import s from "./header.module.scss";

const Header = () => {
  return (
    <header className={s.header}>
      <Image
        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1738804265/JLCLogo_cxqt6p.png`}
        width={268}
        height={46}
        alt="Logo"
      />
      <BurgerMenu />
    </header>
  );
};

export default Header;
