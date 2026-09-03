import {
  Eye,
  Target,
  Users,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export const INTERACTION_TYPES = [
  { id: "posts", label: "Publications" },
  { id: "likes", label: "Likes" },
  { id: "comments", label: "Commentaires" },
  { id: "all", label: "Tout" },
] as const;

export type InteractionTypeId = (typeof INTERACTION_TYPES)[number]["id"];

export interface AgentOption {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  available: boolean;
}

export const OPTIONS: AgentOption[] = [
  {
    id: "profile-interactions",
    icon: Eye,
    title: "Détectez les personnes qui interagissent avec votre profil",
    description:
      "Identifiez les personnes ayant récemment consulté votre profil ou interagi avec vos contenus.",
    available: false,
  },
  {
    id: "niche-interest",
    icon: Target,
    title: "Identifiez les personnes intéressées par votre niche",
    description:
      "Repérez les personnes qui interagissent récemment avec des contenus LinkedIn pertinents contenant des mots-clés liés à votre niche, que ce soit par des likes, des commentaires ou des publications.",
    available: true,
  },
  {
    id: "active-around-profiles",
    icon: Users,
    title: "Repérez les personnes actives autour des profils pertinents",
    description:
      "Identifiez les personnes qui interagissent avec des profils importants de votre niche : concurrents, experts, créateurs de contenu ou leaders d'opinion.",
    available: false,
  },
  {
    id: "buying-signals",
    icon: Briefcase,
    title: "Détectez les événements révélateurs d'un besoin",
    description:
      "Repérez les changements de poste, nouvelles embauches, levées de fonds et autres événements professionnels pouvant signaler un besoin ou une intention d'achat.",
    available: false,
  },
];

export const STEPS = [
  { id: 0, label: "Nom de l'agent" },
  { id: 1, label: "Type d'agent" },
  { id: 2, label: "Mots-clés" },
] as const;
