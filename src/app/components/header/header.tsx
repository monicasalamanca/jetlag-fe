"use client";

import { FC } from "react";
import Image from "next/image";
import BurgerMenu from "./burger-menu/burger-menu";
import { Destination, GroupedCountries } from "@/api/types";

import s from "./header.module.scss";

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
        alt="Logo"
      />
      <BurgerMenu destinations={groupedByContinent} />
    </header>
  );
};

export default Header;
