import { database, storage } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { ChangeEvent } from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
