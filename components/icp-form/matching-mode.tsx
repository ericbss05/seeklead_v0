"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MODE_COPY, type MatchingMode } from "./constants";

export function MatchingModeSection({
  mode,
  onChange,
}: {
  mode: MatchingMode;
  onChange: (mode: MatchingMode) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold">Mode de correspondance</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Choisissez entre plus de volume ou plus de précision.
          </p>
        </div>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          <Button
            type="button"
            size="sm"
            variant={mode === "discovery" ? "default" : "ghost"}
            className="h-7 rounded-md px-3 text-xs"
            onClick={() => onChange("discovery")}
          >
            Découverte
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === "precision" ? "default" : "ghost"}
            className="h-7 rounded-md px-3 text-xs"
            onClick={() => onChange("precision")}
          >
            Précision
          </Button>
        </div>
      </div>

      <Alert>
        <AlertTitle className="text-xs">{MODE_COPY[mode].title}</AlertTitle>
        <AlertDescription className="text-xs">{MODE_COPY[mode].text}</AlertDescription>
      </Alert>
    </div>
  );
}