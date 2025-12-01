import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useInputStore = create(
  devtools((set) => ({
    inputValue: "",
    setInputValue: (newValue) => set({ inputValue: newValue }),
  }))
);
