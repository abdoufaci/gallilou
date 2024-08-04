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
import { SendEmail } from "@/actions/mutations/send-email";
import { useTranslations } from "next-intl";

export const ContactformSchema = z.object({
  name: z.string(),
  email: z.string(),
  description: z.string(),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof ContactformSchema>>({
    resolver: zodResolver(ContactformSchema),
    defaultValues: {
      description: "",
      email: "",
      name: "",
    },
  });
  const t = useTranslations("contact");

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof ContactformSchema>) =>
      SendEmail({ data }),
    onSuccess(data) {
      form.reset();
      toast.success("your message has been sent successfully");
    },
    onError() {
      toast.error("Something went wrong.");
    },
  });

  async function onSubmit(data: z.infer<typeof ContactformSchema>) {
    if (data.description === "" || data.email === "" || data.name === "") {
      toast.error("Make sure to fill all the inputs");
    } else {
      mutate(data);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start ">
              <FormControl>
                <Input
                  placeholder={t("name")}
                  {...field}
                  className="w-full bg-[#FFFFFF3B] rounded-md placeholder:text-white border-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start ">
              <FormControl>
                <Input
                  placeholder={t("email")}
                  {...field}
                  className="w-full bg-[#FFFFFF3B] rounded-md placeholder:text-white border-none"
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
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t("message")}
                  className="placeholder:text-white border-none bg-[#FFFFFF3B] w-full max-w-[590px] h-[103px] rounded-lg resize-none "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
          size={"lg"}
          className="h-11 w-full rounded-[10.76px] bg-white/90 hover:bg-white text-[#15091B] ">
          {t("button")}
        </Button>
      </form>
    </Form>
  );
}
