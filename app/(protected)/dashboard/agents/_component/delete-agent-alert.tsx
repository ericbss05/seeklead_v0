"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteAgent } from "@/app/actions/agent/delete";

interface DeleteAgentAlertProps {
  agentId: string;
  agentName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void; // Optionnel : si le parent veut exécuter une action spécifique
}

export function DeleteAgentAlert({
  agentId,
  agentName,
  open,
  onOpenChange,
  onSuccess,
}: DeleteAgentAlertProps) {
  const router = useRouter();
  const [confirmationName, setConfirmationName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isConfirmed = confirmationName === agentName;

  const handleOpenChange = (value: boolean) => {
    onOpenChange(value);

    if (!value) {
      setConfirmationName("");
    }
  };

  const handleDelete = async () => {
    if (!isConfirmed) return;

    try {
      setIsDeleting(true);

      await deleteAgent(agentId);

      onOpenChange(false);
      setConfirmationName("");

      // Re-fetch les Server Components de la page courante sans tout recharger
      router.refresh();

      // Callback optionnel (ex: toast de confirmation ou mise à jour d'un state parent)
      onSuccess?.();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Supprimer cette cible ?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Cette action est irréversible. Pour confirmer la
            suppression, écris le nom exact de ta cible :
          </AlertDialogDescription>

          <div className="rounded-md bg-muted px-3 py-2 text-sm font-medium text-foreground">
            {agentName}
          </div>
        </AlertDialogHeader>

        <Input
          value={confirmationName}
          onChange={(event) =>
            setConfirmationName(event.target.value)
          }
          placeholder={agentName}
          disabled={isDeleting}
        />

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Annuler
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              void handleDelete();
            }}
            disabled={!isConfirmed || isDeleting}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isDeleting ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}