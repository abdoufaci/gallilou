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
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export const BedBathFilterSchema = z.object({
  bathroom: z.string().optional(),
  bedroom: z.string().optional(),
});

export function BedBathFilter() {
  const { onSearch, clientPropertyData } = useFilterModal();

  const searchParams = useSearchParams();
  const t = useTranslations("filter");

  const type = searchParams.get("type");
  const bedroomparam = searchParams.get("bedroom");
  const wilayaparam = searchParams.get("wilaya");

  const form = useForm<z.infer<typeof BedBathFilterSchema>>({
    resolver: zodResolver(BedBathFilterSchema),
    defaultValues: {
      bathroom: clientPropertyData.bathroom,
      bedroom: clientPropertyData.bedroom || bedroomparam || undefined,
    },
  });

  const bathroom = form.watch("bathroom");
  const bedroom = form.watch("bedroom");

  useEffect(() => {
    if (bathroom || bedroom || bedroomparam) {
      form.handleSubmit(onSubmit)();
    }
  }, [bathroom, bedroom, bedroomparam]);

  async function onSubmit(data: z.infer<typeof BedBathFilterSchema>) {
    onSearch(
      {},
      {},
      {
        bathroom: data.bathroom,
        bedroom:
          data.bedroom ||
          clientPropertyData?.bedroom ||
          bedroomparam ||
          undefined,
        city: clientPropertyData?.city,
        wilaya: clientPropertyData?.wilaya || wilayaparam || undefined,
        maxSize: clientPropertyData?.maxSize,
        minSize: clientPropertyData?.minSize,
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
          name="bedroom"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="whitespace-nowrap text-gray-sub-300 font-medium text-lg">
                {t("bedroom")}
              </FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-[150px] rounded-full focus-visible:ring-0 bg-white border border-[#443948B8]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"1"}>1</SelectItem>
                    <SelectItem value={"2"}>2</SelectItem>
                    <SelectItem value={"3"}>3</SelectItem>
                    <SelectItem value={"4"}>4</SelectItem>
                    <SelectItem value={"5"}>5</SelectItem>
                    <SelectItem value={"6"}>6</SelectItem>
                    <SelectItem value={"7"}>7</SelectItem>
                    <SelectItem value={"8"}>8</SelectItem>
                    <SelectItem value={"9"}>9</SelectItem>
                    <SelectItem value={"10"}>10</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bathroom"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="whitespace-nowrap text-gray-sub-300 font-medium text-lg">
                {t("bathroom")}
              </FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-[150px] rounded-full focus-visible:ring-0 bg-white border border-[#443948B8]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"1"}>1</SelectItem>
                    <SelectItem value={"2"}>2</SelectItem>
                    <SelectItem value={"3"}>3</SelectItem>
                    <SelectItem value={"4"}>4</SelectItem>
                    <SelectItem value={"5"}>5</SelectItem>
                    <SelectItem value={"6"}>6</SelectItem>
                    <SelectItem value={"7"}>7</SelectItem>
                    <SelectItem value={"8"}>8</SelectItem>
                    <SelectItem value={"9"}>9</SelectItem>
                    <SelectItem value={"10"}>10</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
