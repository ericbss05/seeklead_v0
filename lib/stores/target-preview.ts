import { create } from "zustand";

import type { ICPFormData } from "@/components/icp/form/types";

type ICPPreviewStore = {
  data: ICPFormData;
  setData: (data: Partial<ICPFormData>) => void;
};

export const useICPPreviewStore = create<ICPPreviewStore>((set) => ({
  data: {
    jobTitles: [],
    locations: [],
    industries: [],
    companyTypes: [],
    companySizes: [],
    exclude: [],
  },

  setData: (newData) =>
    set((state) => ({
      data: {
        ...state.data,
        ...newData,
      },
    })),
}));