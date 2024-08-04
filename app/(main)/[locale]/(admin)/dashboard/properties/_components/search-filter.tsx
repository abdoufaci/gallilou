"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDebounce } from "@uidotdev/usehooks";
import { useFilterModal } from "@/hooks/use-filter-modal-store";
import { useAdminPropertiesQuery } from "@/hooks/use-query-admin-properties";

function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { onSearch, adminPropertyData } = useFilterModal();

  const { data: properties } = useAdminPropertiesQuery();

  useEffect(() => {
    const fetchProducts = async () => {
      onSearch({
        searchTerm,
        status: adminPropertyData?.status,
        timeline: adminPropertyData?.timeline,
      });
    };
    fetchProducts();
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full flex items-center gap-3">
      <Input
        className="w-full max-w-[380.52px] border-none rounded-sm focus-visible:ring-0 bg-[#F6F6F6] "
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {((adminPropertyData?.timeline?.from && adminPropertyData?.timeline.to) ||
        (adminPropertyData?.searchTerm &&
          adminPropertyData?.searchTerm != "") ||
        (adminPropertyData?.status && adminPropertyData?.status != "")) &&
        !!properties?.pages[0].properties.length && (
          <h1 className="text-black font-semibold">
            {properties?.pages[0].properties.length} Result
          </h1>
        )}
    </div>
  );
}

export default SearchFilter;
