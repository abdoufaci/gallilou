"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ReactCountryFlag from "react-country-flag";

function LangNavigation() {
  const pathname = usePathname();
  const local = useLocale();

  return (
    <Popover>
      <PopoverTrigger asChild className="focus-within:ring-0 ring-0">
        <div
          className="uppercase cursor-pointer text-sm flex items-center justify-center h-9 w-9 rounded-full border border-lightBrand 
        text-lightBrand">
          <h1>{local}</h1>
        </div>
      </PopoverTrigger>
      <PopoverContent className="focus-within:ring-0 w-fit p-1 space-y-1 px-2">
        <Link
          href={
            local === "fr"
              ? pathname.replace("fr", "en")
              : local === "ar"
              ? pathname.replace("ar", "en")
              : pathname.replace("en", "en")
          }>
          <div
            className="flex items-center gap-2 text-black font-medium cursor-pointer p-1 rounded hover:bg-black/5 transition-all 
          duration-200 text-sm">
            <h3>EN</h3>
          </div>
        </Link>
        <Link
          href={
            local === "fr"
              ? pathname.replace("fr", "fr")
              : local === "ar"
              ? pathname.replace("ar", "fr")
              : pathname.replace("en", "fr")
          }>
          <div
            className="flex items-center gap-2 text-black font-medium cursor-pointer p-1 rounded hover:bg-black/5 transition-all 
          duration-200 text-sm">
            <h3>FR</h3>
          </div>
        </Link>
        <Link
          href={
            local === "fr"
              ? pathname.replace("fr", "ar")
              : local === "en"
              ? pathname.replace("en", "ar")
              : pathname.replace("ar", "ar")
          }>
          <div
            className="flex items-center gap-2 text-black font-medium cursor-pointer p-1 rounded hover:bg-black/5 transition-all 
          duration-200 text-sm">
            <h3>AR</h3>
          </div>
        </Link>
      </PopoverContent>
    </Popover>
  );
}

export default LangNavigation;
