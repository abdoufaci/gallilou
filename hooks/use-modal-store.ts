import { Property } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "addProperty"
  | "inviteUser"
  | "propertyDetails"
  | "makeSold"
  | "makeUnsold"
  | "clientFilter"
  | "call"
  | "buyerInfo"
  | "profit";

interface ModalData {
  property?: Property | null;
}

interface ModalStore {
  data: ModalData;
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
