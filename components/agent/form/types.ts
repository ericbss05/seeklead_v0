export type AgentSignalType =
  | "keywords"
  | "profile-interactions"
  | "profile-activity"
  | "buying-signals";

export interface AgentKeyword {
  id?: string;
  raw: string;
}

export interface AgentSignal {
  id?: string;
  type: AgentSignalType;
  keywords: AgentKeyword[];
}

export interface AgentFormData {
  name: string;
  signals: AgentSignal[];
}

export interface AgentFormProps {
  initialData?: Partial<AgentFormData>;
  onSubmitSuccess?: () => void;
  agentId?: string;
}