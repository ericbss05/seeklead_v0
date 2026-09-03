import { Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OPTIONS, INTERACTION_TYPES } from "./constants";

interface AgentPreviewProps {
  agentName: string;
  selectedOption: string | null;
  interactionTypes: string[];
  keywords: string[];
}

export function AgentPreview({
  agentName,
  selectedOption,
  interactionTypes,
  keywords,
}: AgentPreviewProps) {
  if (!agentName) return null;

  return (
    <div className="mt-4 rounded-lg border bg-muted/30 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Bot className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium">Aperçu</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="text-xs">
          {agentName}
        </Badge>
        {selectedOption && (
          <Badge variant="secondary" className="text-xs">
            {OPTIONS.find((o) => o.id === selectedOption)?.title}
          </Badge>
        )}
        {interactionTypes.includes("all") && (
          <Badge variant="outline" className="text-xs">
            Tout
          </Badge>
        )}
        {interactionTypes
          .filter((t) => t !== "all")
          .map((t) => (
            <Badge key={t} variant="outline" className="text-xs">
              {INTERACTION_TYPES.find((it) => it.id === t)?.label}
            </Badge>
          ))}
        {keywords.map((kw) => (
          <Badge key={kw} variant="outline" className="text-xs">
            {kw}
          </Badge>
        ))}
      </div>
    </div>
  );
}
