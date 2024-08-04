import { PropertyFor, PropertyType } from "@prisma/client";
import { create } from "zustand";

export interface ModalAdminPropertyData {
  searchTerm?: string;
  status?: string;
  timeline?: {
    from?: Date;
    to?: Date;
  };
}

export interface ModalClientPropertyData {
  wilaya?: string;
  city?: string;
  type?: PropertyType[];
  target?: PropertyFor[];
  bedroom?: string;
  bathroom?: string;
  minSize?: number;
  maxSize?: number;
}

export interface ModalDashboardData {
  timeline?: {
    from?: Date;
    to?: Date;
  };
}

interface ModalStore {
  onSearch: (
    adminPropertyData?: ModalAdminPropertyData,
    dashboardData?: ModalDashboardData,
    clientPropertyData?: ModalClientPropertyData
  ) => void;
  adminPropertyData: ModalAdminPropertyData;
  clientPropertyData: ModalClientPropertyData;
  dashboardData: ModalDashboardData;
}

export const useFilterModal = create<ModalStore>((set) => ({
  adminPropertyData: {},
  dashboardData: {},
  clientPropertyData: {},
  onSearch: (adminPropertyData, dashboardData, clientPropertyData) =>
    set({ adminPropertyData, dashboardData, clientPropertyData }),
}));
