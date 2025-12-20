"use client";

import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { id: "about", label: "Why ConsignPro" },
  { id: "services", label: "What We Do" },
  { id: "features", label: "Product" },
  { id: "credibility", label: "Customers" },
];

// 🔒 Analytics abstraction (A1 habit)
const track = (event: string) => {
  console.log(event);
  // later: posthog.capture(event)
};

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          ConsignPro
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
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

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">
                  ConsignPro
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex  px-6 flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={`#${link.id}`}
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile CTAs */}
                <div className="mt-6 flex flex-col gap-3">
                  <Button onClick={() => track("mobile_get_started")}>
                    Get Started
                  </Button>

                  <Button asChild variant="outline">
                    <Link href="#track">
                      Track
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => track("mobile_sign_in")}
                  >
                    Sign in
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
