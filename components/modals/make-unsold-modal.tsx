"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Prisma } from "@prisma/client";
import { useAdminPropertiesQuery } from "@/hooks/use-query-admin-properties";
import { MakeUnsold } from "@/actions/mutations/property-actions/make-unsold";

export const SoldPropertyModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const { property } = data;
  const isModalOpen = isOpen && !!property && type === "makeUnsold";

  const { refetch } = useAdminPropertiesQuery();

  let images = property?.images as Prisma.JsonArray;

  const { mutate: removeProductMutation, isPending } = useMutation({
    mutationFn: () => MakeUnsold({ id: property?.id }),
    onSuccess(data) {
      refetch();
      toast.success(`property updated successfully`);
    },
    onError() {
      toast.error("Something went wrong");
    },
    onSettled() {
      onClose();
    },
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6 py-2 flex flex-col items-center">
          <Image
            alt="laptop"
            src={
              //@ts-ignore
              images?.[0]?.url ?? ""
            }
            height={100}
            width={100}
            className="h-20 w-20 rounded-full object-cover"
          />
          <DialogTitle className="text-xl text-center font-medium">
            <h1 className="text-lg">
              Do want to make <span className="text-brand">Property</span>{" "}
              UnSold?
            </h1>
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center gap-5">
          <Button
            onClick={onClose}
            className="bg-transparent border border-black rounded-md text-black font-medium text-lg hover:bg-black hover:text-white"
            size={"lg"}>
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={() => removeProductMutation()}
            size={"lg"}
            variant={"brand"}
            className="font-medium text-lg">
            UNSOLD
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
