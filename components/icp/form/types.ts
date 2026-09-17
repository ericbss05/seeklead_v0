export type ICPFormData = {
  jobTitles: string[];
  locations: string[];
  industries: string[];
  companyTypes: string[];
  companySizes: string[];
  exclude: string[];
};

export type ICPFormProps = {
  initialData?: Partial<ICPFormData>;
  onSubmitSuccess: () => void;
};