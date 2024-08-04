"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PropertyFor, PropertyType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { inviteUser } from "@/actions/mutations/user-actions/inviteUser";
import { FileUpload } from "../FileUpload";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { wilayas } from "@/wilayas";
import { Textarea } from "../ui/textarea";
import { AddProperty } from "@/actions/mutations/property-actions/add-property";
import { useAdminPropertiesQuery } from "@/hooks/use-query-admin-properties";
import { useState } from "react";
import { DialogTitle } from "../ui/dialog";
import { MakeSold } from "@/actions/mutations/property-actions/make-sold";
import { UpdateBuyerInfo } from "@/actions/mutations/property-actions/update-buyer-info";

export const BuyerInfoformSchema = z.object({
  clientAdress: z.string(),
  clientPhone: z.string(),
  clientName: z.string(),
});

export function BuyerInfoForm() {
  const { refetch } = useAdminPropertiesQuery();

  const { onClose, data } = useModal();

  const { property } = data;

  const form = useForm<z.infer<typeof BuyerInfoformSchema>>({
    resolver: zodResolver(BuyerInfoformSchema),
    defaultValues: {
      clientAdress: property?.clientAdress || "",
      clientName: property?.clientName || "",
      clientPhone: property?.clientPhone || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof BuyerInfoformSchema>) =>
      UpdateBuyerInfo({ data, propertyId: property?.id }),
    onSuccess(data) {
      refetch();
      toast.success("buyer informations updated successfully");
    },
    onError() {
      toast.error("Something went wrong.");
    },
    onSettled() {
      onClose();
    },
  });

  const {
    formState: { isDirty },
  } = form;

  async function onSubmit(data: z.infer<typeof BuyerInfoformSchema>) {
    mutate(data);
  }

  return (
    <>
      <DialogTitle className="text-center font-semibold">
        Buyer Inforamtions
      </DialogTitle>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start  text-[#15091B]">
                <FormLabel className="whitespace-nowrap text-gray-sub-300 font-medium text-lg">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full bg-white border border-[#443948B8] rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientPhone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start  text-[#15091B]">
                <FormLabel className="whitespace-nowrap text-gray-sub-300 font-medium text-lg">
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full bg-white border border-[#443948B8] rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientAdress"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start  text-[#15091B]">
                <FormLabel className="whitespace-nowrap text-gray-sub-300 font-medium text-lg">
                  Adress
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full bg-white border border-[#443948B8] rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending || !isDirty}
            type="submit"
            variant={isDirty ? "brand" : "notActive"}
            size={"lg"}
            className="h-11 w-full rounded-full ">
            Confirm
          </Button>
        </form>
      </Form>
    </>
  );
}
