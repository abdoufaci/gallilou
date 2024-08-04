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

export const MakeSoldModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "makeSold";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <MakeSoldForm />
      </DialogContent>
    </Dialog>
  );
};
