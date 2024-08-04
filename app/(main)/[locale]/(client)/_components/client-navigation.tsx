"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ClientNavigation() {
  const [isMounted, setIsMounted] = useState(false);

  const t = useTranslations("Navigation");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <NavigationMenu>
      <NavigationMenuItem className="list-none ">
        <Link href="/properties">
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle(), "p-5")}>
            {t("properties")}
          </NavigationMenuLink>
        </Link>
        <Link href="/#about">
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle(), "p-5")}>
            {t("about")}
          </NavigationMenuLink>
        </Link>
        <Link href="/#contact">
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle(), "p-5")}>
            {t("contact")}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

export default ClientNavigation;
