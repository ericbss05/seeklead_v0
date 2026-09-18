"use client";

import { useState } from "react";

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

import { deleteICP } from "@/app/actions/icp/delete";

interface DeleteTargetAlertProps {
  icpId: string;
  icpName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteTargetAlert({
  icpId,
  icpName,
  open,
  onOpenChange,
}: DeleteTargetAlertProps) {
  const [confirmationName, setConfirmationName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isConfirmed = confirmationName === icpName;

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

      await deleteICP(icpId);

      onOpenChange(false);
      setConfirmationName("");
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
            {icpName}
          </div>
        </AlertDialogHeader>

        <Input
          value={confirmationName}
          onChange={(event) =>
            setConfirmationName(event.target.value)
          }
          placeholder={icpName}
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