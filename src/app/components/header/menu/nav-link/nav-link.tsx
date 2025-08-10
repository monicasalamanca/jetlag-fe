"use client";

import { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackNavigation } from "@/app/utils/analytics";

import s from "./nav-link.module.scss";

interface NavLinkProps {
  name: string;
  href: string;
  children: ReactNode;
}

const NavLink: FC<NavLinkProps> = ({
  name,
  href,
  children,
}: {
  name: string;
  href: string;
  children: ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  // const trackClick = useTrackClick({
  //   category: "header",
  //   label: `${name} link`,
  // });

  const handleClick = () => {
    trackNavigation({
      destination: href,
      source: pathname,
      navigationText: name,
      navigationType: "header",
    });
  };

  return (
    <Link
      aria-label={`Navigate to ${name}`}
      href={href}
      className={`${isActive ? s.activeLink : s.defaultLink}`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
