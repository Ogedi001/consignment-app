"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { LogoLockup } from "./LogoLockup";

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <LogoLockup />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLinks />
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm"><Link href="/login">Sign in</Link></Button>
          <Button asChild size="sm" variant="gradient"><Link href="/register">Get started</Link></Button>
        </div>

        {/* Mobile */}
        <MobileMenu />
      </div>
    </header>
  );
}
