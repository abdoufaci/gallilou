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
import ClientFilter from "@/app/(main)/[locale]/(client)/properties/_components/client-filter";
import { Button } from "../ui/button";

export const ClientFilterModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "clientFilter";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogTitle className="hidden">Property filter</DialogTitle>
        <ScrollArea className="h-[550px]">
          <ClientFilter />
          <Button
            onClick={() => onClose()}
            className="w-full mt-7"
            variant={"brand"}
            size={"lg"}>
            Filter
          </Button>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
