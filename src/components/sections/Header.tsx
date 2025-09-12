"use client";
import Link from "next/link";
import React, { useEffect } from "react";
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
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "our-team", label: "Our Team" },
  { id: "contact", label: "Contact" },
];

const Header: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (window.scrollY > 100) {
        header?.classList.add("bg-white/80", "backdrop-blur-sm");
      } else {
        header?.classList.remove("bg-white/80", "backdrop-blur-sm");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="header"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-black cursor-pointer">LOGO</div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 justify-center">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA (Desktop only) */}
        <div className="hidden md:block">
          <Button asChild>
            <Link href="#track">
              Track
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
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
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>
                  <div className="text-xl font-bold">LOGO</div>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex px-6 flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="text-gray-700 hover:text-black transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <Button asChild className="mt-4 w-full">
                  <Link href="#track">
                    Track
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
