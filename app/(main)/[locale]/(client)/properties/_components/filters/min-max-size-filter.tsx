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
import { AddProperty } from "@/actions/mutations/property-actions/add-property";
import { useAdminPropertiesQuery } from "@/hooks/use-query-admin-properties";
import { useEffect } from "react";
import { useFilterModal } from "@/hooks/use-filter-modal-store";
import { useTranslations } from "next-intl";

export const MinMaxSizeFilterSchema = z.object({
  min: z
    .string()
    .transform((v) => Number(v) || 0)
    .optional(),
  max: z
    .string()
    .transform((v) => Number(v) || 0)
    .optional(),
});

export function MinMaxSizeFilter() {
  const { onSearch, clientPropertyData } = useFilterModal();
  const t = useTranslations("filter");

  const form = useForm<z.infer<typeof MinMaxSizeFilterSchema>>({
    resolver: zodResolver(MinMaxSizeFilterSchema),
    defaultValues: {
      //@ts-ignore
      min: `${clientPropertyData.minSize}`,
      //@ts-ignore
      max: `${clientPropertyData.maxSize}`,
    },
  });

  const min = form.watch("min");
  const max = form.watch("max");

  useEffect(() => {
    if (min || max) {
      form.handleSubmit(onSubmit)();
    }
  }, [min, max]);

  async function onSubmit(data: z.infer<typeof MinMaxSizeFilterSchema>) {
    onSearch(
      {},
      {},
      {
        bathroom: clientPropertyData?.bathroom,
        bedroom: clientPropertyData?.bedroom,
        city: clientPropertyData?.city,
        wilaya: clientPropertyData?.wilaya,
        maxSize: data.max,
        minSize: data.min,
        target: clientPropertyData?.target,
        type: clientPropertyData?.type,
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-5">
        <FormField
          control={form.control}
          name="min"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="whitespace-nowrap text-gray-sub-300 font-medium text-lg">
                {t("min")} <span className="text-xs text-gray-500">m²</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Any"
                  {...field}
                  className=" focus-visible:ring-0 bg-white border border-[#443948B8] w-[150px] rounded-full
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="max"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start  text-[#15091B]">
              <FormLabel className="whitespace-nowrap text-gray-sub-300 font-medium text-lg">
                {t("max")} <span className="text-xs text-gray-500">m²</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Any"
                  type="number"
                  {...field}
                  className=" focus-visible:ring-0 bg-white border border-[#443948B8] w-[150px] rounded-full
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
