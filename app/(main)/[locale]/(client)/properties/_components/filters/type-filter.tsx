"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterModal } from "@/hooks/use-filter-modal-store";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyType } from "@prisma/client";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PropertyTypeSchema = z.object({
  type: z.array(z.enum([PropertyType.APARTEMENT, PropertyType.VILLA])),
});

function PropertyTypeFilter() {
  const searchParams = useSearchParams();

  const typeparam = searchParams.get("type");
  const bedroomparam = searchParams.get("bedroom");
  const wilayaparam = searchParams.get("wilaya");
  const t = useTranslations("filter");

  const { onSearch, clientPropertyData } = useFilterModal();

  const form = useForm<z.infer<typeof PropertyTypeSchema>>({
    resolver: zodResolver(PropertyTypeSchema),
    defaultValues: {
      type: clientPropertyData?.type
        ? clientPropertyData?.type
        : typeparam
        ? [typeparam === "VILLA" ? PropertyType.VILLA : PropertyType.APARTEMENT]
        : [],
    },
  });

  const selectedBrand = form.watch("type");

  useEffect(() => {
    if (selectedBrand || typeparam) {
      form.handleSubmit(onSubmit)();
    }
  }, [selectedBrand, form.handleSubmit, typeparam]);

  async function onSubmit({ type }: z.infer<typeof PropertyTypeSchema>) {
    onSearch(
      {},
      {},
      {
        bathroom: clientPropertyData?.bathroom,
        bedroom: clientPropertyData?.bedroom || bedroomparam || undefined,
        city: clientPropertyData?.city,
        wilaya: clientPropertyData?.wilaya || wilayaparam || undefined,
        maxSize: clientPropertyData?.maxSize,
        minSize: clientPropertyData?.minSize,
        target: clientPropertyData?.target,
        type: type
          ? type
          : typeparam
          ? typeparam === "VILLA"
            ? [PropertyType.VILLA]
            : [PropertyType.APARTEMENT]
          : undefined,
      }
    );
  }

  return (
    <Form {...form}>
      <form className="w-full md:w-[180px]">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="whitespace-nowrap text-[#070707] font-medium text-lg">
                {t("type")}
              </FormLabel>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => {
                    return (
                      <div className="flex flex-col gap-3">
                        <FormItem className="flex items-center -space-y-1 gap-2 !m-0">
                          <FormControl>
                            <Checkbox
                              className="rounded-[2px] p-0.5 border-[#C9CFD2] data-[state=checked]:bg-lightBrand data-[state=checked]:border-none data-[state=checked]:text-white"
                              checked={field.value?.includes(
                                PropertyType.APARTEMENT
                              )}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      PropertyType.APARTEMENT,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) =>
                                          value !== PropertyType.APARTEMENT
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel
                            className={cn(
                              "text-sm font-normal ",
                              field.value?.includes(PropertyType.APARTEMENT)
                                ? "text-lightBrand"
                                : "text-[#443948]"
                            )}>
                            {t("appartement")}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center -space-y-1 gap-2 !m-0">
                          <FormControl>
                            <Checkbox
                              className="rounded-[2px] p-0.5 border-[#C9CFD2] data-[state=checked]:bg-lightBrand data-[state=checked]:border-none data-[state=checked]:text-white"
                              checked={field.value?.includes(
                                PropertyType.VILLA
                              )}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      PropertyType.VILLA,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== PropertyType.VILLA
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel
                            className={cn(
                              "text-sm font-normal ",
                              field.value?.includes(PropertyType.VILLA)
                                ? "text-lightBrand"
                                : "text-[#443948]"
                            )}>
                            {t("villa")}
                          </FormLabel>
                        </FormItem>
                      </div>
                    );
                  }}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default PropertyTypeFilter;
