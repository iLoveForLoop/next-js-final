import { create } from "zustand";

type ConfessState = {
  isConfessing: boolean;
  setIsConfessing: (value: boolean) => void;
};

export const useConfessStore = create<ConfessState>((set) => ({
  isConfessing: false,
  setIsConfessing: (value) => set({ isConfessing: value }),
}));
