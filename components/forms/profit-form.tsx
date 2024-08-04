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
import { UpdateProfit } from "@/actions/mutations/property-actions/update-profit";

export const ProfitformSchema = z.object({
  profit: z.string().transform((v) => Number(v) || 0),
});

export function ProfitForm() {
  const { refetch } = useAdminPropertiesQuery();

  const { onClose, data } = useModal();

  const { property } = data;

  const form = useForm<z.infer<typeof ProfitformSchema>>({
    resolver: zodResolver(ProfitformSchema),
    defaultValues: {
      //@ts-ignore
      profit: `${property?.profit}`,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof ProfitformSchema>) =>
      UpdateProfit({ data, propertyId: property?.id }),
    onSuccess(data) {
      refetch();
      toast.success("profit updated successfully");
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

  async function onSubmit(data: z.infer<typeof ProfitformSchema>) {
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
          <div className="w-full py-10 rounded-md border border-[#443948B8] flex items-center justify-center gap-2">
            <FormField
              control={form.control}
              name="profit"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start  text-[#15091B]">
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className="text-xl focus-visible:ring-0 w-[200px] h-10 bg-gray-200 rounded-md
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h1 className="text-xl text-lightBrand">DA</h1>
          </div>
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
