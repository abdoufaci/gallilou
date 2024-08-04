"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Navigation() {
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <NavigationMenu className="rounded-full bg-white">
      <NavigationMenuItem className="list-none rounded-full">
        <Link href="/dashboard">
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "rounded-full p-5",
              (pathname === "/en/dashboard" ||
                pathname === "/fr/dashboard" ||
                pathname === "/ar/dashboard") &&
                "bg-[#15091B] text-primary-foreground hover:bg-[#15091B]/90 hover:text-primary-foreground"
            )}>
            Overview
          </NavigationMenuLink>
        </Link>
        <Link href="/dashboard/properties">
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              "rounded-full p-5",
              (pathname === "/en/dashboard/properties" ||
                pathname === "/ar/dashboard/properties" ||
                pathname === "/fr/dashboard/properties") &&
                "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
            )}>
            Properties
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

export default Navigation;
