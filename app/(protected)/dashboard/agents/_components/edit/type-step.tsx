import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { OptionCard } from "./option-card";
import { OPTIONS, INTERACTION_TYPES } from "./constants";

interface TypeStepProps {
  selectedOption: string | null;
  interactionTypes: string[];
  onSelectOption: (id: string) => void;
  onToggleInteractionType: (id: string) => void;
}

export function TypeStep({
  selectedOption,
  interactionTypes,
  onSelectOption,
  onToggleInteractionType,
}: TypeStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-sm font-medium">Type d&apos;agent</h2>
        <p className="text-xs text-muted-foreground">
          Sélectionnez le type d&apos;agent qui correspond à votre besoin.
        </p>
      </div>
      <div className="grid gap-2">
        {OPTIONS.map((option, index) => (
          <OptionCard
            key={option.id}
            option={option}
            index={index}
            selected={selectedOption === option.id}
            onSelect={() => onSelectOption(option.id)}
          />
        ))}
      </div>

      {selectedOption === "niche-interest" && (
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium">Type d&apos;interaction</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {INTERACTION_TYPES.map((type) => (
              <label
                key={type.id}
                className="flex items-center gap-2 rounded-md border bg-background p-2.5 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  checked={interactionTypes.includes(type.id)}
                  onCheckedChange={() => onToggleInteractionType(type.id)}
                />
                <span className="text-xs">{type.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
