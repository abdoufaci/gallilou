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

export const AddPropertyformSchema = z.object({
  images: z
    .array(
      z.object({
        url: z.string(),
        key: z.string(),
      })
    )
    .nonempty("one image at least is required ."),
  target: z.enum([PropertyFor.RENT, PropertyFor.SALE]),
  size: z.string().transform((v) => Number(v) || 0),
  type: z.enum([PropertyType.APARTEMENT, PropertyType.VILLA]),
  wilaya: z.string(),
  city: z.string(),
  bathroom: z.string(),
  bedroom: z.string(),
  location: z.string(),
  description: z.string(),
  mapLink: z.string(),
});

export function AddPropertyForm() {
  const { refetch } = useAdminPropertiesQuery();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof AddPropertyformSchema>) =>
      AddProperty(data),
    onSuccess(data) {
      refetch();
      toast.success("property added successfully");
    },
    onError() {
      toast.error("Something went wrong.");
    },
    onSettled() {
      onClose();
    },
  });

  const { onClose } = useModal();
  const form = useForm<z.infer<typeof AddPropertyformSchema>>({
    resolver: zodResolver(AddPropertyformSchema),
    defaultValues: {
      images: [],
      target: "SALE",
    },
  });

  async function onSubmit(data: z.infer<typeof AddPropertyformSchema>) {
    mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col">
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="whitespace-nowrap  text-sm font-medium">
                Property photos
              </FormLabel>
              <FormControl>
                <div className="flex items-center gap-3 w-full relative">
                  <FileUpload
                    //@ts-ignore
                    value={field.value}
                    onChange={field.onChange}
                    endpoint="imageUploader"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center -space-x-5  relative border w-fit border-[#443948] rounded-full">
                  <div
                    onClick={() => field.onChange(PropertyFor.SALE)}
                    className={cn(
                      "h-10 w-28 rounded-full flex items-center justify-center px-5 cursor-pointer",
                      field.value === PropertyFor.SALE
                        ? "bg-lightBrand text-white"
                        : "bg-transparent text-[#66717E]"
                    )}>
                    Sale
                  </div>
                  <div
                    onClick={() => field.onChange(PropertyFor.RENT)}
                    className={cn(
                      "h-10 w-28 rounded-full flex items-center justify-center px-5 cursor-pointer",
                      field.value === PropertyFor.RENT
                        ? "bg-lightBrand text-white"
                        : "bg-transparent text-[#66717E]"
                    )}>
                    Rent
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="whitespace-nowrap  font-medium text-lg">
                  Property Type
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-[150px] rounded-full focus-visible:ring-0 bg-white border border-[#443948B8]">
                      <SelectValue />
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
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start text-[#15091B]">
                <FormLabel className="whitespace-nowrap  font-medium text-lg">
                  Area Size <span className="text-xs text-gray-500">(m²)</span>
                </FormLabel>
                <FormControl>
                  <Input
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
          <FormField
            control={form.control}
            name="wilaya"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="whitespace-nowrap  font-medium text-lg">
                  State
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-[150px] rounded-full focus-visible:ring-0 bg-white border border-[#443948B8]">
                      <SelectValue placeholder="State" />
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
                <FormLabel className="whitespace-nowrap  font-medium text-lg">
                  City
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
          <FormField
            control={form.control}
            name="bedroom"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="whitespace-nowrap  font-medium text-lg">
                  Bedroom
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
          <FormField
            control={form.control}
            name="bathroom"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="whitespace-nowrap  font-medium text-lg">
                  Bathroom
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
        </div>
        <FormField
          control={form.control}
          name="mapLink"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start  text-[#15091B]">
              <FormLabel className="whitespace-nowrap  font-medium text-lg">
                Map Link
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
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start  text-[#15091B]">
              <FormLabel className="whitespace-nowrap  font-medium text-lg">
                Title
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
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start gap-2">
              <FormLabel className="whitespace-nowrap  text-lg font-medium">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Write here.."
                  className="border-gray-sub-300 placeholder:text-[#66717E] focus-visible:ring-0 bg-white border border-[#443948B8] w-full max-w-[590px] h-[103px] rounded-lg resize-none "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
          variant={"brand"}
          size={"lg"}
          className="h-11 w-48 rounded-full ">
          Add Property
        </Button>
      </form>
    </Form>
  );
}
