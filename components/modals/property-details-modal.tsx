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
import { PropertyDetailsForm } from "../forms/property-details-form";
import BuyerInfo from "../buyer-info";
import Profit from "../profit";

export const PropertyDetailsModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const { property } = data;

  const isModalOpen = isOpen && type === "propertyDetails";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogTitle className="hidden">Property details</DialogTitle>
        <ScrollArea className="h-[550px]">
          <div className="space-y-10">
            {property?.isSold && (
              <div className="flex flex-wrap items-start gap-5 justify-between">
                <BuyerInfo property={property} />
                <Profit property={property} />
              </div>
            )}
            <PropertyDetailsForm />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
