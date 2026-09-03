import { Check, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AgentOption } from "./constants";

interface OptionCardProps {
  option: AgentOption;
  index: number;
  selected: boolean;
  onSelect: () => void;
}

export function OptionCard({ option, index, selected, onSelect }: OptionCardProps) {
  const Icon = option.icon;
  const isAvailable = option.available;

  return (
    <button
      type="button"
      onClick={isAvailable ? onSelect : undefined}
      disabled={!isAvailable}
      className={cn(
        "flex items-start gap-3 rounded-lg border p-3 text-left transition-colors",
        !isAvailable && "cursor-not-allowed opacity-60",
        isAvailable && "hover:bg-muted/50",
        selected ? "border-foreground/20 bg-muted/30" : "border-border"
      )}
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border bg-background text-xs font-medium text-muted-foreground">
        {index + 1}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium">{option.title}</h3>
          {!isAvailable ? (
            <Badge variant="outline" className="gap-1 text-[10px] font-normal">
              <Lock className="h-3 w-3" />
              Arrive bientôt
            </Badge>
          ) : (
            selected && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background">
                <Check className="h-3 w-3" strokeWidth={2.5} />
              </div>
            )
          )}
        </div>
        <p className="text-xs text-muted-foreground">{option.description}</p>
      </div>
    </button>
  );
}
