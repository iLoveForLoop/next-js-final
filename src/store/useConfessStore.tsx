import { create } from "zustand";

type ConfessState = {
  isConfessing: boolean;
  setIsConfessing: (value: boolean) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
};

export const useConfessStore = create<ConfessState>((set) => ({
  isConfessing: false,
  isEditing: false,
  setIsEditing: (value) => set({isEditing: value}),
  setIsConfessing: (value) => set({ isConfessing: value }),
}));
