"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { MatchingMode } from "./constants";

interface IcpState {
  jobTitles: string[];
  locations: string[];
  industries: string[];
  companyTypes: string[];
  companySizes: string[];
  exclude: string[];
  mode: MatchingMode;
  funding: string;
  headcountMin: string;
  headcountMax: string;
}

interface IcpContextValue {
  icp: IcpState;
  setIcp: (icp: IcpState) => void;
}

const defaultIcp: IcpState = {
  jobTitles: [],
  locations: [],
  industries: [],
  companyTypes: [],
  companySizes: [],
  exclude: [],
  mode: "precision",
  funding: "Toutes les étapes",
  headcountMin: "",
  headcountMax: "",
};

const IcpContext = createContext<IcpContextValue>({
  icp: defaultIcp,
  setIcp: () => {},
});

export function IcpProvider({ children }: { children: ReactNode }) {
  const [icp, setIcp] = useState<IcpState>(defaultIcp);

  return (
    <IcpContext.Provider value={{ icp, setIcp }}>
      {children}
    </IcpContext.Provider>
  );
}

export function useIcp() {
  return useContext(IcpContext);
}

export type { IcpState };
