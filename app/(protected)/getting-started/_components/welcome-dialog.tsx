"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WelcomeDialog({
  open,
  onOpenChange,
}: WelcomeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="mb-2 flex justify-center">
          <Image src="/3d-icons/user.png" alt="user icon" width={64} height={64} />
        </div>

        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            Bonjour, bienvenue sur Seeklead 👋
          </DialogTitle>

          <DialogDescription className="text-sm leading-relaxed text-center">
            La première étape consiste à configurer votre cible : une fois
            définie, nous pourrons commencer à identifier les prospects
            qualifiés qui correspondent à votre profil.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}