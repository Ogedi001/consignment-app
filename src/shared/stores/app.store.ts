import { createStore } from "zustand/vanilla";

/** Ephemeral UI state only. Keep API entities and request status in React Query. */
export type AppStore = {
  isMobileNavigationOpen: boolean;
  setMobileNavigationOpen: (isOpen: boolean) => void;
};

export const createAppStore = () =>
  createStore<AppStore>()((set) => ({
    isMobileNavigationOpen: false,
    setMobileNavigationOpen: (isOpen) =>
      set({ isMobileNavigationOpen: isOpen }),
  }));
