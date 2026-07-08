"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { LogoLockup } from "./LogoLockup";

const track = (event: string) => {
  console.log(event);
};

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto h-20 px-8 flex items-center justify-between">
        {/* Logo */}
        <LogoLockup />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLinks />
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => track("nav_sign_in")}
          >
            Sign in
          </Button>

          <Button asChild variant="outline" size="sm">
            <Link href="#track">
              Track
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button size="sm" onClick={() => track("nav_get_started")}>
            Get Started
          </Button>
        </div>

        {/* Mobile */}
        <MobileMenu />
      </div>
    </header>
  );
}
