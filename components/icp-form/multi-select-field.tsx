"use client";

import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function MultiSelectField({
  label,
  options,
  values,
  onChange,
}: {
  label: string;
  options: string[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  function toggle(option: string) {
    onChange(values.includes(option) ? values.filter((v) => v !== option) : [...values, option]);
  }

  const triggerLabel =
    values.length === 0 ? "Sélectionner..." : values.length === 1 ? values[0] : `${values.length} sélectionnés`;

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <Popover>
        <PopoverTrigger
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 text-sm shadow-sm",
            "hover:border-primary/50 transition-colors",
            values.length === 0 && "text-muted-foreground"
          )}
        >
          <span className={cn(values.length === 0 && "truncate")}>{triggerLabel}</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-60 overflow-y-auto p-1" align="start">
          {options.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent transition-colors"
            >
              <Checkbox checked={values.includes(option)} onCheckedChange={() => toggle(option)} />
              <span className="truncate">{option}</span>
            </label>
          ))}
        </PopoverContent>
      </Popover>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {values.map((v) => (
            <Badge key={v} variant="secondary" className="gap-1 rounded-md h-6 px-2">
              {v}
              <button
                type="button"
                onClick={() => onChange(values.filter((x) => x !== v))}
                className="text-muted-foreground hover:text-foreground"
                aria-label={`Retirer ${v}`}
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}