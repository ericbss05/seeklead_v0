"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch {
      setError("Une erreur est survenue lors de la connexion.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Bienvenue sur Seeklead
        </h1>

        <p className="text-sm text-muted-foreground">
          Connectez-vous pour accéder à votre espace.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border bg-background px-4 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        {!loading && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M21.35 12.27c0-.78-.07-1.53-.2-2.27H12v4.3h5.25a4.48 4.48 0 0 1-1.95 2.94v2.45h3.15c1.84-1.69 2.9-4.18 2.9-7.42Z"
            />
            <path
              fill="#34A853"
              d="M12 21.6c2.63 0 4.84-.87 6.45-2.36l-3.15-2.45c-.87.58-1.98.93-3.3.93-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.74 9.74 0 0 0 12 21.6Z"
            />
            <path
              fill="#FBBC05"
              d="M6.53 13.69A5.85 5.85 0 0 1 6.22 12c0-.59.1-1.16.31-1.69V7.78H3.28A9.72 9.72 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.22l3.25-2.53Z"
            />
            <path
              fill="#EA4335"
              d="M12 6.28c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.33 14.63 2.4 12 2.4a9.74 9.74 0 0 0-8.72 5.38l3.25 2.53C7.3 8 9.46 6.28 12 6.28Z"
            />
          </svg>
        )}

        {loading ? "Connexion..." : "Continuer avec Google"}
      </button>

      <p className="px-6 text-center text-xs leading-relaxed text-muted-foreground">
        En continuant, vous acceptez nos conditions d&apos;utilisation et notre
        politique de confidentialité.
      </p>
    </div>
  );
}
