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
import { AddPropertyForm } from "../forms/add-property-form";
import { ScrollArea } from "../ui/scroll-area";

export const AddPropertyModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "addProperty";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogTitle className="hidden">Add property</DialogTitle>
        <ScrollArea className="h-[550px]">
          <AddPropertyForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
