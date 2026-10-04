"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CircleHelp,
  LayoutDashboard,
  Menu,
  MessageSquare,
  ReceiptText,
  Settings,
  ShieldCheck,
  UserCheck,
  WalletCards,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

const primary = [
  ["Home", "/home", LayoutDashboard],
  ["Orders", "/orders", ReceiptText],
  ["Wallet", "/wallet", WalletCards],
  ["Messages", "/messages", MessageSquare],
  ["Activity", "/activity", Bell],
] as const;
const secondary = [
  ["Trust", "/trust", ShieldCheck],
  ["Verification", "/verification", UserCheck],
] as const;

function Nav({ close }: { close?: () => void }) {
  const pathname = usePathname();
  const item = ([label, href, Icon]: readonly [
    string,
    string,
    typeof LayoutDashboard,
  ]) => (
    <Link
      onClick={close}
      key={href}
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold",
        pathname === href ||
          (href !== "/home" && pathname.startsWith(`${href}/`))
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-surface hover:text-foreground",
      )}
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
  return (
    <nav aria-label="Application navigation" className="grid gap-1">
      {primary.map(item)}
      <div className="my-3 border-t border-border" />
      {secondary.map(item)}
      <div className="my-3 border-t border-border" />
      <Link
        onClick={close}
        href="/support"
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-surface hover:text-foreground"
      >
        <CircleHelp className="size-4" />
        Help
      </Link>
      <Link
        onClick={close}
        href="/settings"
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-surface hover:text-foreground"
      >
        <Settings className="size-4" />
        Settings
      </Link>
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-dvh bg-surface">
      <aside className="fixed inset-y-0 hidden w-64 border-r border-border bg-background p-5 lg:block">
        <Link
          href="/home"
          className="mb-10 block text-xl font-bold tracking-tight text-brand-navy"
        >
          Trustflow
        </Link>
        <Nav />
        <div className="absolute bottom-5 left-5 right-5 border-t border-border pt-4">
          <Link
            href="/auth"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Account access
          </Link>
        </div>
      </aside>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:ml-64 lg:px-8">
        <button
          aria-label="Open navigation"
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 hover:bg-surface lg:hidden"
        >
          <Menu className="size-5" />
        </button>
        <span className="text-base font-bold text-brand-navy lg:hidden">
          Trustflow
        </span>
        <div className="ml-auto flex items-center gap-3">
          <Link
            aria-label="Notifications"
            href="/notifications"
            className="rounded-lg p-2 text-muted-foreground hover:bg-surface hover:text-foreground"
          >
            <Bell className="size-5" />
          </Link>
          <Link
            href="/settings"
            className="hidden rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-surface sm:block"
          >
            Account
          </Link>
        </div>
      </header>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-brand-navy/35"
            onClick={() => setOpen(false)}
          />
          <aside className="relative h-full w-72 bg-background p-5 shadow-xl">
            <button
              aria-label="Close navigation"
              className="ml-auto mb-7 block rounded-lg p-2 hover:bg-surface"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
            <Link
              onClick={() => setOpen(false)}
              href="/home"
              className="mb-8 block text-xl font-bold text-brand-navy"
            >
              Trustflow
            </Link>
            <Nav close={() => setOpen(false)} />
          </aside>
        </div>
      ) : null}
      <main className="lg:ml-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
