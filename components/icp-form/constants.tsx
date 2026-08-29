export const LOCATION_OPTIONS = [
  "France", "Belgique", "Suisse", "Espagne", "Allemagne", "Royaume-Uni", "États-Unis", "Canada",
];

export const INDUSTRY_OPTIONS = [
  "Software", "SaaS", "Marketing", "Consulting", "Fintech", "E-commerce", "Healthtech", "Legaltech",
];

export const COMPANY_TYPE_OPTIONS = [
  "Private Company", "Startup", "Public Company", "Non-profit", "Agency",
];

export const COMPANY_SIZE_OPTIONS = [
  "1–10 employés", "11–50 employés", "51–200 employés", "201–500 employés", "500+ employés",
];

export const FUNDING_OPTIONS = [
  "Toutes les étapes", "Seed", "Série A", "Série B", "Série C+", "Bootstrap",
];

export type MatchingMode = "discovery" | "precision";

export const MODE_COPY: Record<MatchingMode, { title: string; text: string }> = {
  discovery: {
    title: "Mode découverte — plus de résultats, exploration élargie",
    text: "Les profils proches de votre ICP seront également suggérés, même s'ils ne correspondent pas à tous les critères.",
  },
  precision: {
    title: "ICP strict — moins de résultats, mais des leads plus qualifiés",
    text: "Seuls les profils correspondant aux critères principaux de votre ICP seront retenus.",
  },
};

export interface ICPPayload {
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
  submittedAt: string;
}