"use client";

import { useICPPreviewStore } from "@/lib/stores/target-preview";

export default function TargetPreview() {
  const data = useICPPreviewStore((state) => state.data);

  const jobTitle = data?.jobTitles?.[0] || "Web Designer freelance";
  const location =
    data?.locations?.[0] || "Paris, Île-de-France, France";
  const industry =
    data?.industries?.[0] || "Création de sites web";
  const companyType =
    data?.companyTypes?.[0] || "Entreprise";
  const companySize =
    data?.companySizes?.[0] || "11-50";

  const description = `${jobTitle} évoluant au sein d'une ${companyType} dans le secteur ${industry}, avec un rôle actif dans le développement et la croissance de l'entreprise.`;

  return (
    <div className="relative h-[800px] w-full overflow-hidden rounded-tl-3xl border shadow-[0_8px_40px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.08)]">
      {/* Bannière */}
      <div className="h-64 w-full p-4 pb-0">
        <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-gradient-to-b from-[#E8F0FE] to-[#D0E4FF]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 800 256"
            preserveAspectRatio="xMidYMax slice"
          >
            <defs>
              <filter
                id="soft-blur"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="22" />
              </filter>

              <radialGradient
                id="sun-glow"
                cx="50%"
                cy="50%"
                r="50%"
              >
                <stop
                  offset="0%"
                  stopColor="#FFD9A0"
                  stopOpacity="0.9"
                />
                <stop
                  offset="100%"
                  stopColor="#FFD9A0"
                  stopOpacity="0"
                />
              </radialGradient>
            </defs>

            <circle
              cx="640"
              cy="60"
              r="70"
              fill="url(#sun-glow)"
            />

            <g filter="url(#soft-blur)">
              <path
                d="M-20 210 C120 130 200 210 300 150 C400 90 480 190 560 140 C650 90 720 170 820 130 L820 280 L-20 280 Z"
                fill="#0A66C2"
                opacity="0.35"
              />

              <path
                d="M-20 250 C140 190 260 250 380 200 C500 150 600 230 720 190 L820 210 L820 280 L-20 280 Z"
                fill="#5E9CE8"
                opacity="0.4"
              />
            </g>
          </svg>

          {/* Fondu vers le bas de la bannière */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
        </div>
      </div>

      {/* Photo de profil — avatar flottant */}
      <div className="absolute left-12 top-36 h-44 w-44">
        <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-[#FAFAFA] bg-[#DCE9FA] shadow-[0_20px_40px_rgba(10,102,194,0.35)]">
          <svg
            viewBox="0 0 200 200"
            className="h-full w-full"
          >
            <circle
              cx="100"
              cy="80"
              r="38"
              fill="#8FB8E8"
            />

            <path
              d="M30 200 C30 140 60 120 100 120 C140 120 170 140 170 200 Z"
              fill="#8FB8E8"
            />
          </svg>
        </div>
      </div>

      {/* Contenu du profil */}
      <div className="mt-28 px-12">
        <h3 className="text-[32px] font-bold text-black">
          Thomas Quinet
        </h3>

        <p className="mt-3 pr-8 text-[15px] leading-relaxed text-black/90">
          {description}
        </p>

        <p className="mt-4 text-sm text-gray-500">
          {location} ·{" "}
          <span className="cursor-pointer font-semibold text-[#0A66C2] hover:underline">
            Coordonnées
          </span>
        </p>

        <p className="mt-6 text-sm font-semibold text-gray-400">
          {companySize} · 500+ relations
        </p>

        <div className="mt-6 flex gap-4">
          <button
            type="button"
            className="relative rounded-full bg-[#0A66C2] px-6 py-1.5 font-semibold text-white shadow-[0_10px_24px_rgba(10,102,194,0.35)] transition-transform hover:scale-[1.03] hover:bg-blue-700"
          >
            Se connecter
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-[#0A66C2]/30 bg-white px-5 py-1.5 font-semibold text-[#0A66C2] shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition-transform hover:scale-[1.03] hover:bg-blue-50"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>

            Message
          </button>
        </div>
      </div>
    </div>
  );
}