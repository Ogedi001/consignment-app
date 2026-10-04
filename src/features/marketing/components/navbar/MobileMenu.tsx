"use client";

import { Menu } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { useAppStore } from "@/providers/zustand-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { NavLinks } from "./NavLinks";
import { LogoLockup } from "./LogoLockup";

export function MobileMenu() {
  const isOpen = useAppStore((state) => state.isMobileNavigationOpen);
  const setIsOpen = useAppStore((state) => state.setMobileNavigationOpen);

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
              <Button asChild variant="gradient"><Link href="/register">Get started</Link></Button>
              <Button asChild variant="ghost"><Link href="/login">Sign in</Link></Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
