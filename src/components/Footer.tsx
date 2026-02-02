"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

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
  { href: "#", label: "Twitter", src: "/twitter.svg" },
  { href: "#", label: "LinkedIn", src: "/linkedin.svg" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <ShieldCheck className="h-5 w-5 text-primary" />
              TrustFlow
            </div>

            <p className="max-w-sm text-sm text-muted-foreground">
              Trust infrastructure for secure, high-value trade. Built to
              protect buyers, sellers, and every step in between.
            </p>

            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} TrustFlow. All rights reserved.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t" />

        {/* Bottom */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            Payments held in escrow. Funds released only after confirmed
            completion.
          </p>

          {/* Socials */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-muted transition"
              >
                <Image
                  src={social.src}
                  alt={social.label}
                  width={24}
                  height={24}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
