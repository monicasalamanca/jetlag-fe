import { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTrackClick } from "@/app/hooks/useTrackClicks";

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

  const trackClick = useTrackClick({
    category: "header",
    label: `${name} link`,
  });

  return (
    <Link
      aria-label={`Navigate to ${name}`}
      href={href}
      className={`${isActive ? s.activeLink : s.defaultLink}`}
      onClick={trackClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
