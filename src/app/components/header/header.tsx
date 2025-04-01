"use client";

import dynamic from "next/dynamic";
import { FC } from "react";
import Image from "next/image";
import { Destination, GroupedCountries } from "@/api/types";

import s from "./header.module.scss";

// Dynamically import BurgerMenu (only loaded when needed, on mobile)
const BurgerMenu = dynamic(() => import("./burger-menu/burger-menu"), {
  ssr: false,
});
// Dynamically import Menu (only loaded when needed, on desktop)
const Menu = dynamic(() => import("./menu/menu"), {
  ssr: false,
});

const Header: FC<{ destinations: Destination[] | null }> = ({
  destinations,
}) => {
  const groupedByContinent = destinations
    ? destinations.reduce((acc, destination) => {
        const { continent } = destination;
        if (!acc[continent]) {
          acc[continent] = [];
        }
        acc[continent].push(destination.name);
        return acc;
      }, {} as GroupedCountries)
    : null;

  return (
    <header className={s.header}>
      <Image
        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1738804265/blog-assets/JLCLogo_cxqt6p.png`}
        width={268}
        height={46}
        alt="The Jet Lag Chronicles Logo"
        loading="lazy"
      />
      <BurgerMenu destinations={groupedByContinent} />
      <Menu destinations={groupedByContinent} />
    </header>
  );
};

export default Header;
