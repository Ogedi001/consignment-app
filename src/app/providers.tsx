"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "@/providers/query-provider";
import { ZustandProvider } from "@/providers/zustand-provider";

/** Client-side infrastructure shared by every route. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ZustandProvider>{children}</ZustandProvider>
    </QueryProvider>
  );
}
