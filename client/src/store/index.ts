import { create } from "zustand";
import { createAuthSlice, AuthSlice } from "./slices/auth-slice";

// Define the overall application state type
type AppState = AuthSlice;

// Create the zustand store with the correct types
export const useAppStore = create<AppState>()((...a) => ({
  ...createAuthSlice(...a),
}));
