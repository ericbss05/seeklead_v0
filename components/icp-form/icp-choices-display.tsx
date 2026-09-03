"use client";

import {
  MoreHorizontal,
  Pencil,
  Shell,
  Send,
  Plus,
  Eye,
  Users,
  BarChart2,
  Search,
  ExternalLink,
} from "lucide-react";
import { useIcp } from "./icp-context";
import Image from "next/image";

function getCompanyFromType(types: string[]): string {
  if (types.includes("Startup")) return "TechStartup";
  if (types.includes("Agency")) return "Agency Co";
  if (types.includes("Non-profit")) return "Non-Profit Org";
  return "Entreprise cible";
}

export function IcpChoicesDisplay() {
  const { icp } = useIcp();

  const jobTitle = icp.jobTitles[0] || "Décideur";
  const location = icp.locations[0] || "France";
  const company = getCompanyFromType(icp.companyTypes);
  const size = icp.companySizes[0] || "";
  const industry = icp.industries[0] || "";

  return (
    <div className="py-6">
      <div className="bg-gray-100 min-h-screen font-sans">
        <div className="max-w-4xl mx-auto bg-white shadow-sm mt-0 sm:mt-6 sm:rounded-lg overflow-hidden">

          {/* Bannière */}
          <div className="relative h-44 sm:h-52 bg-gradient-to-br from-indigo-600 to-blue-500 overflow-hidden">
            <div className="absolute top-3 right-3 rounded p-1.5 shadow flex items-center gap-1 bg-white">
              <Pencil className="w-4 h-4 text-gray-700" />
            </div>
          </div>

          {/* Photo de profil */}
          <div className="relative px-6">
            <div className="absolute -top-16 left-0">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-gray-300 shadow-md flex items-center justify-center text-gray-500 text-sm overflow-hidden">
                <Image src="/images/Avatar.png" alt="avatar" width={144} height={144} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <span className="w-6 h-6 rounded bg-amber-600 flex items-center justify-center text-white font-extrabold text-xs">
                in
              </span>
              <Pencil className="w-5 h-5 text-gray-700" />
            </div>
          </div>

          {/* Infos profil */}
          <div className="px-6 pt-14 pb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  Thomas Morel
                  <span className="text-blue-600 text-lg">✔️</span>
                </h1>
                <p className="text-gray-800 mt-1 max-w-xl">
                  {jobTitle} chez Nortech Solutions | J&apos;aide les équipes commerciales à automatiser leur prospection grâce à l&apos;IA 🚀
                </p>
                <div className="space-y-2">
                  <p className="text-gray-500 text-sm">
                    {location} ·{" "}
                    <span className="text-blue-700 font-semibold hover:underline">
                      Coordonnées
                    </span>
                  </p>

                  <p className="flex gap-1 text-blue-700 font-semibold text-sm hover:underline cursor-pointer">
                    https://nortech-solutions.com/ <ExternalLink size={16} strokeWidth={3} />
                  </p>

                  <p className="text-blue-700 font-semibold text-sm hover:underline cursor-pointer">
                    318 relations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <div className="w-8 h-8 rounded flex items-center justify-center shrink-0">
                  <Shell className="w-5 h-5 text-orange-700" strokeWidth={1.5} />
                </div>

                <p className="font-semibold">
                  {company}
                </p>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-wrap gap-3 mt-5">
              <button className="flex items-center bg-blue-700 text-white font-semibold px-4 py-1.5 rounded-full text-sm hover:bg-blue-800 transition gap-1">
                <Send className="w-4 h-4" strokeWidth={1.5} />
                Message
              </button>
              <button className="flex items-center border border-blue-700 text-blue-700 font-semibold px-4 py-1.5 rounded-full text-sm hover:bg-blue-50 transition gap-1">
                <Plus className="w-4 h-4" strokeWidth={1.5} />
                Suivre
              </button>
              <button className="border border-gray-400 text-gray-700 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-50 transition">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cartes suggestions */}
          <div className="px-6 pb-6">
            <div className="flex gap-4 overflow-x-auto pb-2">
              <div className="border border-gray-200 rounded-lg p-4 min-w-[240px] max-w-xs shrink-0 bg-white hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                  <Shell className="w-5 h-5 text-orange-700" strokeWidth={1.5} />
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-tight truncate max-w-[180px]">
                    {company}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5 truncate max-w-[180px]">
                    {industry}
                  </p>
                  <p className="text-gray-400 text-xs">{size}</p>
                </div>

                <button className="flex items-center gap-1 border border-blue-700 text-blue-700 font-semibold text-sm px-4 py-1.5 rounded-full hover:bg-blue-50 transition w-full justify-center">
                  <Plus className="w-4 h-4" strokeWidth={2} />
                  Suivre
                </button>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Statistiques */}
          <div className="px-6 py-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-bold text-gray-900">Statistiques</h2>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> Privé
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex gap-3">
                <Users className="w-5 h-5 text-gray-700 shrink-0" />
                <div>
                  <p className="font-bold text-gray-900 text-sm">15 vues du profil</p>
                  <p className="text-gray-500 text-xs">Découvrez qui a consulté votre profil</p>
                </div>
              </div>
              <div className="flex gap-3">
                <BarChart2 className="w-5 h-5 text-gray-700 shrink-0" />
                <div>
                  <p className="font-bold text-gray-900 text-sm">490 impressions de post</p>
                  <p className="text-gray-500 text-xs">Découvrez la portée de vos posts</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Search className="w-5 h-5 text-gray-700 shrink-0" />
                <div>
                  <p className="font-bold text-gray-900 text-sm">4 apparitions dans les recherches</p>
                  <p className="text-gray-500 text-xs">Découvrez la fréquence à laquelle vous apparaissez</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}