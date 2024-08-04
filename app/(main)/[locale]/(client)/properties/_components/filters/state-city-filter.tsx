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

export const StateCityFilterSchema = z.object({
  wilaya: z.string().optional(),
  city: z.string().optional(),
});

export function StateCityFilter() {
  const { onSearch, clientPropertyData } = useFilterModal();

  const searchParams = useSearchParams();

  const t = useTranslations("filter");

  const type = searchParams.get("type");
  const bedroomparam = searchParams.get("bedroom");
  const wilayaparam = searchParams.get("wilaya");

  const form = useForm<z.infer<typeof StateCityFilterSchema>>({
    resolver: zodResolver(StateCityFilterSchema),
    defaultValues: {
      wilaya: clientPropertyData?.wilaya || wilayaparam || undefined,
      city: clientPropertyData?.city,
    },
  });

  const wilaya = form.watch("wilaya");
  const city = form.watch("city");

  useEffect(() => {
    if (wilaya || city || wilaya === "" || city === "") {
      form.handleSubmit(onSubmit)();
    }
  }, [wilaya, city, wilayaparam]);

  async function onSubmit(data: z.infer<typeof StateCityFilterSchema>) {
    onSearch(
      {},
      {},
      {
        bathroom: clientPropertyData?.bathroom,
        bedroom: clientPropertyData?.bedroom || bedroomparam || undefined,
        city: data.city,
        wilaya:
          data.wilaya || clientPropertyData?.wilaya || wilayaparam || undefined,
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
          name="wilaya"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="whitespace-nowrap text-gray-sub-300 font-medium text-lg">
                {t("state")}
              </FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-[150px] rounded-full focus-visible:ring-0 bg-white border border-[#443948B8]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {wilayas.map((wilaya, idx) => (
                      <SelectItem key={idx} value={wilaya.name}>
                        {wilaya.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start  text-[#15091B]">
              <FormLabel className="whitespace-nowrap text-gray-sub-300 font-medium text-lg">
                {t("city")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-[150px] bg-white border border-[#443948B8] rounded-full"
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
