"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { useStore } from "zustand";
import { createAppStore, type AppStore } from "@/shared/stores/app.store";

type AppStoreApi = ReturnType<typeof createAppStore>;

const AppStoreContext = createContext<AppStoreApi | null>(null);

/** Provides request-scoped client state without putting server data in Zustand. */
export function ZustandProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createAppStore();
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore<T>(selector: (state: AppStore) => T): T {
  const store = useContext(AppStoreContext);

  if (!store) {
    throw new Error("useAppStore must be used within ZustandProvider.");
  }

  return useStore(store, selector);
}
