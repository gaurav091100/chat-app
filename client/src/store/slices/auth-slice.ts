/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator } from "zustand";

export interface AuthSlice {
  userInfo: Record<string, any> | null; // Replace `Record<string, any>` with a more specific type if available
  setUserInfo: (userInfo: Record<string, any>) => void; // Update type as needed
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
});
