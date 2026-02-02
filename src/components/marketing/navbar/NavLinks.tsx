"use client";

import Link from "next/link";
import { navLinks } from "@/lib/constants/nav";

interface NavLinksProps {
  onClick?: () => void;
}

export function NavLinks({ onClick }: NavLinksProps) {
  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.id}
          href={`#${link.id}`}
          onClick={onClick}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
