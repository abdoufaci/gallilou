"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ArrowLeft, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Burger() {
  const t = useTranslations("Navigation");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader className="flex flex-row items-end gap-4">
          <SheetClose>
            <ArrowLeft className="h-7 w-7 cursor-pointer" />
          </SheetClose>
        </SheetHeader>
        <div className=" mt-10">
          <NavigationMenu>
            <NavigationMenuItem className="list-none flex flex-col">
              <Link href="/properties">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "p-5 text-[#585858]"
                  )}>
                  {t("properties")}
                </NavigationMenuLink>
              </Link>
              <Link href="/#about">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "p-5 text-[#585858]"
                  )}>
                  {t("about")}
                </NavigationMenuLink>
              </Link>
              <Link href="/#contact">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "p-5 text-[#585858]"
                  )}>
                  {t("contact")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>
      </SheetContent>
    </Sheet>
  );
}
