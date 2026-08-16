"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, Clock3, ShieldCheck, X } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

type ComingSoonButtonProps = React.ComponentProps<typeof Button> & {
  modalDescription?: string;
  modalTitle?: string;
};

export function ComingSoonButton({
  children,
  className,
  modalDescription = "We are finalizing escrow flows, identity checks, and dispute support before opening access.",
  modalTitle = "TrustFlow is coming soon",
  ...buttonProps
}: ComingSoonButtonProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className={className} {...buttonProps}>
          {children}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-brand-navy/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-background shadow-enterprise outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
          <div className="bg-brand-navy px-6 py-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <Badge className="border-white/15 bg-white/10 text-white hover:bg-white/10">
                <Clock3 className="h-3 w-3" />
                Private beta
              </Badge>

              <Dialog.Close className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>

            <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>

            <Dialog.Title className="mt-5 text-2xl font-bold tracking-normal">
              {modalTitle}
            </Dialog.Title>
            <Dialog.Description className="mt-3 text-sm leading-6 text-white/72">
              {modalDescription}
            </Dialog.Description>
          </div>

          <div className="px-6 py-5">
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-accent" />
                Escrow-backed payments are being tested end to end.
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-accent" />
                Buyer and seller onboarding will open in phases.
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {/* <Button className="flex-1" variant="gradient" asChild>
                <a href="mailto:hello@trustflow.africa?subject=TrustFlow%20early%20access">
                  <Bell className="h-4 w-4" />
                  Request early access
                </a>
              </Button> */}
              <Dialog.Close asChild>
                <Button className="flex-1" variant="outline">
                  Continue browsing
                </Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
