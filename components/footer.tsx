"use client";

import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

function Footer() {
  const t = useTranslations("Navigation");

  return (
    <div className="w-[80%] mx-auto border-t p-5 pb-8 mt-36 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        <div className="flex items-center gap-4">
          <Image alt="logo" src={"/footer-logo.svg"} height={100} width={100} />
          <h1 className="text-sm text-[#15091BA6]">{t("footer")}</h1>
        </div>
        <div className="space-y-3">
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
          <div className="flex items-center gap-5">
            <Link
              target="_blank"
              href={"https://www.instagram.com/gallilou_immobilier"}>
              <div className="rounded-full flex items-center justify-center h-10 w-10 bg-lightBrand/15">
                <Image alt="logo" src={"/insta.svg"} height={20} width={20} />
              </div>
            </Link>
            <Link
              target="_blank"
              href={
                "https://www.facebook.com/gallilouimmobilier/?locale=fr_FR"
              }>
              <div className="rounded-full flex items-center justify-center h-10 w-10 bg-lightBrand/15">
                <Image
                  alt="logo"
                  src={"/facebook.svg"}
                  height={10}
                  width={10}
                />
              </div>
            </Link>
            <Link
              target="_blank"
              href={"https://www.tiktok.com/@gallilou_immobilier"}>
              <div className="rounded-full flex items-center justify-center h-10 w-10 bg-lightBrand/15">
                <Image alt="logo" src={"/tiktok.svg"} height={15} width={15} />
              </div>
            </Link>
          </div>
        </div>
        <div className="hidden md:!flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <div className="rounded-full flex items-center justify-center h-8 w-8 bg-lightBrand/15">
              <Phone className="w-4 h-4 text-brand" />
            </div>
            <h1 className="text-[#484848] font-bold text-sm">
              (+213) 770 71 11 63
            </h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="rounded-full flex items-center justify-center h-8 w-8 bg-lightBrand/15">
              <Phone className="w-4 h-4 text-brand" />
            </div>
            <h1 className="text-[#484848] font-bold text-sm">
              (+213) 553 88 71 99
            </h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="rounded-full flex items-center justify-center h-8 w-8 bg-lightBrand/15">
              <Mail className="w-4 h-4 text-brand" />
            </div>
            <h1 className="text-[#484848] font-bold text-sm">
              Gallilou.yammi@gmail.com
            </h1>
          </div>
        </div>
      </div>
      <h1 className="text-center text-[#585858]">
        © 2024 GALILLOU IMMOBILER. All rights reserved.
      </h1>
    </div>
  );
}

export default Footer;
