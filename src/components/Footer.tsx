"use client";

import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import { LogoLockup } from "@/components/marketing/navbar/LogoLockup";

const productLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#trust", label: "Trust & Security" },
];

const companyLinks = [
  { href: "#", label: "About" },
  { href: "#", label: "Documentation" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
];

const socialLinks = [
  { href: "#", label: "Twitter", icon: Twitter },
  { href: "#", label: "LinkedIn", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4 md:col-span-2">
            <LogoLockup className="w-fit" />

            <p className="max-w-sm text-sm text-muted-foreground">
              Trust infrastructure for secure, high-value trade. Built to
              protect buyers, sellers, and every step in between.
            </p>

            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} TrustFlow. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="rounded-md transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="rounded-md transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border" />

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            Payments held in escrow. Funds released only after confirmed
            completion.
          </p>

          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary/25 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                <Icon className="h-4 w-4" />
              </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
