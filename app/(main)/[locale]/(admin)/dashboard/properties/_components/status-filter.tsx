"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const statusSchema = z.object({
  status: z.string(),
});

function StatusFilter() {
  const { onSearch, adminPropertyData } = useFilterModal();

  const form = useForm<z.infer<typeof statusSchema>>({
    resolver: zodResolver(statusSchema),
  });

  const selectedStatus = form.watch("status");

  useEffect(() => {
    if (selectedStatus) {
      form.handleSubmit(onSubmit)();
    }
  }, [selectedStatus, form.handleSubmit]);

  async function onSubmit({ status }: z.infer<typeof statusSchema>) {
    onSearch({
      searchTerm: adminPropertyData?.searchTerm,
      status,
      timeline: adminPropertyData?.timeline,
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-14 w-[180px]">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full focus-visible:ring-0">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"all"}>All</SelectItem>
                    <SelectItem value={"availabel"}>availabel</SelectItem>
                    <SelectItem value={"unavailabel"}>unavailabel</SelectItem>
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

export default StatusFilter;
