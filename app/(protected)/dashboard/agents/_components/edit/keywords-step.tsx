import { Label } from "@/components/ui/label";
import { KeywordField } from "./keyword-field";

interface KeywordsStepProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
  error: string | null;
  responseLog: string[];
}

export function KeywordsStep({ keywords, onChange, error, responseLog }: KeywordsStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-sm font-medium">Mots-clés</h2>
        <p className="text-xs text-muted-foreground">
          Définissez les mots-clés que votre agent utilisera pour ses recherches.
        </p>
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-semibold">Mots-clés ciblés</Label>
        <p className="text-[11px] text-muted-foreground">
          Appuyez sur Entrée ou virgule pour valider chaque mot-clé.
        </p>
        <KeywordField values={keywords} onChange={onChange} />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {responseLog.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs">Log de réponse</Label>
          <div className="rounded-md border bg-muted/50 p-3 font-mono text-xs text-muted-foreground">
            {responseLog.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
