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
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import { MakeSoldForm } from "../forms/make-sold-form";
import { BuyerInfoForm } from "../forms/buyer-info-form";

export const BuyerInfoModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "buyerInfo";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <BuyerInfoForm />
      </DialogContent>
    </Dialog>
  );
};
