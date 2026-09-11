import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "dark",

      setTheme: (theme) => {
        set({ theme });
      },

      toggleTheme: () => {
        const currentTheme = get().theme;

        set({
          theme: currentTheme === "dark" ? "light" : "dark",
        });
      },
    }),
    {
      name: "cinedash-theme",
    },
  ),
);
