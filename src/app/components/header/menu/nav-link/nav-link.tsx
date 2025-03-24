import { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import s from "./nav-link.module.scss";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const NavLink: FC<NavLinkProps> = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`${isActive ? s.activeLink : s.defaultLink}`}>
      {children}
    </Link>
  );
};

export default NavLink;
