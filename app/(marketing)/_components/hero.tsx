import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';
import Link from 'next/link';
import React from 'react';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-24 overflow-hidden font-sans bg-gradient-to-b from-neutral-50 to-neutral-100">

      {/* Conteneur de la grille d'icônes */}
      <div className="flex flex-col items-center gap-4 mb-10 select-none">

        {/* Première rangée (5 éléments) */}
        <div className="flex gap-4 items-center justify-center">
          {/* EXTRÉMITÉ GAUCHE : Flou */}
          <IconBox className="blur-[2px] opacity-70 scale-90">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-md" />
          </IconBox>

          {/* CENTRE : Net */}
          <IconBox className="z-10">
            <div className="w-8 h-8 bg-orange-400 rounded-full" />
          </IconBox>

          {/* CENTRE (Discord) : Net */}
          <IconBox className="scale-110 transition-transform">
            <svg className="w-10 h-10 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </IconBox>

          {/* CENTRE : Net */}
          <IconBox className="z-10">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-b-[28px] border-b-green-500 border-r-[16px] border-r-transparent" />
          </IconBox>

          {/* EXTRÉMITÉ DROITE : Flou */}
          <IconBox className="blur-[2px] opacity-70 scale-90">
            <div className="w-8 h-8 bg-blue-500 rounded-sm rotate-45" />
          </IconBox>
        </div>

        {/* Deuxième rangée (4 éléments) */}
        <div className="flex gap-4 items-center justify-center">
          {/* EXTRÉMITÉ GAUCHE : Flou */}
          <IconBox className="blur-[2px] opacity-70 scale-90">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">f</div>
          </IconBox>

          {/* CENTRE (GitHub) : Net */}
          <IconBox className="z-10">
            <svg className="w-9 h-9 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </IconBox>

          {/* CENTRE (GitLab) : Net */}
          <IconBox className="z-10">
            <svg className="w-9 h-9 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 5.1 2h.02a.43.43 0 0 1 .4.27l2.95 9.11h6.98l2.95-9.11a.43.43 0 0 1 .4-.27h.02a.43.43 0 0 1 .4.26l2.44 7.51 1.22 3.78a.84.84 0 0 1-.23.94z" />
            </svg>
          </IconBox>

          {/* EXTRÉMITÉ DROITE : Flou */}
          <IconBox className="blur-[2px] opacity-70 scale-90">
             <div className="w-8 h-8 rounded-full border-4 border-t-red-500 border-r-blue-500 border-b-green-500 border-l-yellow-500" />
          </IconBox>
        </div>
      </div>

      {/* Contenu textuel */}
      <div className="text-center max-w-3xl mx-auto mt-6 space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Blocks that connect your <br className="hidden sm:block" /> workflow.
        </h1>
        <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto">
          Connect your favorite tools to the world&apos;s largest collection of Shadcn blocks and components.
        </p>

        <Link href="/login">
         <LiquidMetalButton>
          <p className="text-sm text-white">Get started</p>
         </LiquidMetalButton>
         </Link>
      </div>

    </section>
  );
}

// Composant réutilisable pour garantir la cohérence des conteneurs d'icônes
// Effet "glass" : fond translucide + flou d'arrière-plan, liseré lumineux en
// haut (reflet), ombre douce en dessous, et légère ombre interne pour donner
// du volume au verre.
function IconBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        relative w-16 h-16 md:w-20 md:h-20 rounded-2xl
        flex items-center justify-center
        bg-white/40 backdrop-blur-xl
        border border-white/60
        shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18),inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-1px_2px_0_rgba(0,0,0,0.04)]
        transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/50 via-white/5 to-transparent" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}