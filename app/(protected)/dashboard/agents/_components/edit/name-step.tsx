import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NameStepProps {
  agentName: string;
  onChange: (name: string) => void;
}

export function NameStep({ agentName, onChange }: NameStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-sm font-medium">Nom de l&apos;agent</h2>
        <p className="text-xs text-muted-foreground">
          Choisissez un nom descriptif pour identifier votre agent.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="agent-name" className="text-xs">
          Nom de l&apos;agent
        </Label>
        <Input
          id="agent-name"
          placeholder="Ex: Agent Prospection SaaS France"
          value={agentName}
          onChange={(e) => onChange(e.target.value)}
          className="h-10"
        />
      </div>
    </div>
  );
}
