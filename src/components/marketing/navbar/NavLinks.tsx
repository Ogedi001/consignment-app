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
          className="rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
