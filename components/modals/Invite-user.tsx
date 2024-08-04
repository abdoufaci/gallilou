"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Separator } from "../ui/separator";
import { InviteForm } from "../forms/Invite-user-form";

export const InviteModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "inviteUser";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogHeader className="py-2">
          <DialogTitle className="text-xl text-[#303030]">
            Invite User
          </DialogTitle>
          <Separator />
        </DialogHeader>
        <InviteForm />
      </DialogContent>
    </Dialog>
  );
};
