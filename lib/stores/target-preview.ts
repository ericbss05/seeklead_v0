import { create } from "zustand";

import type { ICPFormData } from "@/components/icp/form/types";

type TargetPreviewStore = {
  data: ICPFormData;
  setData: (data: ICPFormData) => void;
  updateData: (changes: Partial<ICPFormData>) => void;
  reset: () => void;
};

const initialData: ICPFormData = {
  name: "",
  jobTitles: [],
  locations: [],
  industries: [],
  companyTypes: [],
  companySizes: [],
  exclude: [],
};

export const useICPPreviewStore = create<TargetPreviewStore>((set) => ({
  data: initialData,

  setData: (data) => {
    set({ data });
  },

  updateData: (changes) => {
    set((state) => ({
      data: {
        ...state.data,
        ...changes,
      },
    }));
  },

  reset: () => {
    set({ data: initialData });
  },
}));