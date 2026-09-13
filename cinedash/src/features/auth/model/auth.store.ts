import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,

      login: () => {
        const token = crypto.randomUUID();

        set({
          token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "cinedash-auth",
    },
  ),
);
