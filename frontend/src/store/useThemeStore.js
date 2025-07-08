import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("NodeTalk-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("NodeTalk-theme", theme);
    set({ theme });
  },
}));
