"use client";

import { Menu, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLinks } from "./NavLinks";
import { LogoLockup } from "./LogoLockup";

const track = (event: string) => {
  console.log(event);
};

export function MobileMenu() {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-80 border-border bg-background">
          <SheetHeader>
            <SheetTitle className="sr-only">
              Trustflow navigation
            </SheetTitle>
            <LogoLockup className="w-fit" />
          </SheetHeader>

          <nav className="mt-6 flex flex-col gap-4 px-6">
            <NavLinks />

            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant="gradient"
                onClick={() => track("mobile_get_started")}
              >
                Get Started
              </Button>

              <Button asChild variant="outline">
                <Link href="#track">
                  Track
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="ghost" onClick={() => track("mobile_sign_in")}>
                Sign in
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
