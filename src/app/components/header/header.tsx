"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
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
      <Link href="/">
        <Image
          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1761689951/blog-assets/Logo_a0elnn.png`}
          width={222}
          height={63}
          alt="The Jet Lag Chronicles Logo"
          loading="lazy"
        />
      </Link>
      <BurgerMenu destinations={groupedByContinent} />
      <Menu destinations={groupedByContinent} />
    </header>
  );
};

export default Header;
