"use client";

import qs from "query-string";
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
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const HomeSearchSchema = z.object({
  wilaya: z.string().optional(),
  type: z.string().optional(),
  bedroom: z.string().optional(),
});

export function HomeSearch() {
  const router = useRouter();

  const t = useTranslations("homeSearch");

  const form = useForm<z.infer<typeof HomeSearchSchema>>({
    resolver: zodResolver(HomeSearchSchema),
    defaultValues: {},
  });

  async function onSubmit(data: z.infer<typeof HomeSearchSchema>) {
    const url = qs.stringifyUrl(
      {
        url: "/properties" || "",
        query: {
          type: data?.type ? data.type : undefined,
          wilaya: data?.wilaya ? data.wilaya : undefined,
          bedroom: data?.bedroom ? data.bedroom : undefined,
        },
      },
      { skipNull: true }
    );

    router.push(url);
  }

  return (
    <div className="flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap gap-5 justify-center transform translate-y-[-50%] items-center bg-white searchShadow p-5 px-10 rounded-md w-fit">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="whitespace-nowrap text-[#15091B] font-medium text-sm">
                  {t("type")}
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-[150px] focus-visible:ring-0 bg-white ">
                      <SelectValue placeholder={t("any")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={PropertyType.APARTEMENT}>
                        Appartement
                      </SelectItem>
                      <SelectItem value={PropertyType.VILLA}>Villa</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator
            className=" bg-[#15091B] w-0.5 rounded-full h-[73.97px]"
            orientation="vertical"
          />
          <FormField
            control={form.control}
            name="bedroom"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="whitespace-nowrap text-[#15091B] font-medium text-sm">
                  {t("bedroom")}
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-[150px] focus-visible:ring-0 bg-white ">
                      <SelectValue placeholder={t("any")} />
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
          <Separator
            className=" bg-[#15091B] w-0.5 rounded-full h-[73.97px]"
            orientation="vertical"
          />
          <FormField
            control={form.control}
            name="wilaya"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="whitespace-nowrap text-[#15091B] font-medium text-sm">
                  {t("location")}
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-[150px] focus-visible:ring-0 bg-white ">
                      <SelectValue placeholder={t("any")} />
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
          <Separator
            className=" bg-[#15091B] w-0.5 rounded-full h-[73.97px]"
            orientation="vertical"
          />
          <Button
            size={"lg"}
            className="h-12 px-10 rounded-sm bg-brand/90 hover:bg-brand text-white font-normal text-lg">
            {t("button")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
