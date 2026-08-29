"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FUNDING_OPTIONS } from "./constants";

export function AdvancedFilters({
  open,
  onOpenChange,
  funding,
  onFundingChange,
  headcountMin,
  onHeadcountMinChange,
  headcountMax,
  onHeadcountMaxChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  funding: string;
  onFundingChange: (v: string) => void;
  headcountMin: string;
  onHeadcountMinChange: (v: string) => void;
  headcountMax: string;
  onHeadcountMaxChange: (v: string) => void;
}) {
  return (
    <>
      <div className="flex justify-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs text-muted-foreground"
          onClick={() => onOpenChange(!open)}
        >
          {open ? "Masquer les filtres avancés" : "Filtres avancés"}
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
        </Button>
      </div>

      {open && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground">Levée de fonds</Label>
            <Select value={funding} onValueChange={(v) => onFundingChange(v ?? "")}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FUNDING_OPTIONS.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground">Effectif (min / max)</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Min"
                value={headcountMin}
                onChange={(e) => onHeadcountMinChange(e.target.value)}
                className="h-10"
              />
              <span className="text-xs text-muted-foreground">à</span>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Max"
                value={headcountMax}
                onChange={(e) => onHeadcountMaxChange(e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}