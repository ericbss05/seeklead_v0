export type ICPFormData = {
  name: string;
  jobTitles: string[];
  locations: string[];
  industries: string[];
  companyTypes: string[];
  companySizes: string[];
  exclude: string[];
};

export type ICPFormProps = {
  initialData?: Partial<ICPFormData>;
  onSubmitSuccess?: () => void;
  icpId?: string;
};