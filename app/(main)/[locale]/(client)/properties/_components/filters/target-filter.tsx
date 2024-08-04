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
import { PropertyFor, PropertyType } from "@prisma/client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PropertyTargetSchema = z.object({
  target: z.array(z.enum([PropertyFor.RENT, PropertyFor.SALE])),
});

function PropertyTargetFilter() {
  const pathname = usePathname();

  const { onSearch, clientPropertyData } = useFilterModal();
  const t = useTranslations("filter");

  const form = useForm<z.infer<typeof PropertyTargetSchema>>({
    resolver: zodResolver(PropertyTargetSchema),
    defaultValues: {
      target: clientPropertyData?.target || [],
    },
  });

  const selectedTarget = form.watch("target");

  useEffect(() => {
    if (selectedTarget) {
      form.handleSubmit(onSubmit)();
    }
  }, [selectedTarget, form.handleSubmit]);

  async function onSubmit({ target }: z.infer<typeof PropertyTargetSchema>) {
    onSearch(
      {},
      {},
      {
        bathroom: clientPropertyData?.bathroom,
        bedroom: clientPropertyData?.bedroom,
        city: clientPropertyData?.city,
        wilaya: clientPropertyData?.wilaya,
        maxSize: clientPropertyData?.maxSize,
        minSize: clientPropertyData?.minSize,
        target,
        type: clientPropertyData?.type,
      }
    );
  }

  return (
    <Form {...form}>
      <form className="w-full md:w-[180px]">
        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="whitespace-nowrap text-[#070707] font-medium text-lg">
                {t("target")}
              </FormLabel>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="target"
                  render={({ field }) => {
                    return (
                      <div className="flex flex-col gap-3">
                        <FormItem className="flex items-center -space-y-1 gap-2 !m-0">
                          <FormControl>
                            <Checkbox
                              className="rounded-[2px] p-0.5 border-[#C9CFD2] data-[state=checked]:bg-lightBrand data-[state=checked]:border-none data-[state=checked]:text-white"
                              checked={field.value?.includes(PropertyFor.RENT)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      PropertyFor.RENT,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== PropertyFor.RENT
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel
                            className={cn(
                              "text-sm font-normal ",
                              field.value?.includes(PropertyFor.RENT)
                                ? "text-lightBrand"
                                : "text-[#443948]"
                            )}>
                            {t("rent")}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center -space-y-1 gap-2 !m-0">
                          <FormControl>
                            <Checkbox
                              className="rounded-[2px] p-0.5 border-[#C9CFD2] data-[state=checked]:bg-lightBrand data-[state=checked]:border-none data-[state=checked]:text-white"
                              checked={field.value?.includes(PropertyFor.SALE)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      PropertyFor.SALE,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== PropertyFor.SALE
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel
                            className={cn(
                              "text-sm font-normal ",
                              field.value?.includes(PropertyFor.SALE)
                                ? "text-lightBrand"
                                : "text-[#443948]"
                            )}>
                            {t("sale")}
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

export default PropertyTargetFilter;
