import { cn } from "@/lib/utils";
import { STEPS } from "./constants";

interface StepIndicatorProps {
  current: number;
}

export function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center gap-1.5">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors",
              i === current ? "bg-foreground" : "bg-muted"
            )}
          />
          <span
            className={cn(
              "text-xs transition-colors",
              i === current ? "font-medium text-foreground" : "text-muted-foreground"
            )}
          >
            {step.label}
          </span>
          {i < STEPS.length - 1 && <span className="mx-1 h-px w-4 bg-border" />}
        </div>
      ))}
    </div>
  );
}
