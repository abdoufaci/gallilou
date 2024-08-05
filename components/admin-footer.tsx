"use client";

import OpenInvite from "@/app/(main)/[locale]/(admin)/dashboard/_components/open-invite";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Building, Home, LaptopMinimal, ScrollText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminFooter() {
  const pathname = usePathname();

  return (
    <div className="bg-black w-[90%] max-w-[419px] mx-auto hidden max-md:!flex rounded-2xl p-4 pb-0 justify-between items-start gap-5 sticky bottom-5 left-0">
      <Link href={"/dashboard"}>
        <div
          className={cn(
            "space-y-2 w-fit flex flex-col items-center transition-all duration-200 ease-out",
            pathname === "/en/dashboard" ||
              pathname === "/fr/dashboard" ||
              pathname === "/ar/dashboard"
              ? "text-white"
              : "text-[#535252] hover:text-white"
          )}>
          <div className="flex flex-col items-center gap-1">
            <Home />
            <h1 className="font-light text-sm">Home</h1>
          </div>
          <div
            className={cn(
              "rounded-t-xl  h-1.5 w-16",
              pathname === "/dashboard"
                ? "bg-brand dashboardfootershadow"
                : "bg-transparent"
            )}></div>
        </div>
      </Link>
      <Link href={"/dashboard/properties"}>
        <div
          className={cn(
            "space-y-2 w-fit flex flex-col items-center transition-all duration-200 ease-out",
            pathname.includes("/dashboard/products")
              ? "text-white"
              : "text-[#535252] hover:text-white"
          )}>
          <div className="flex flex-col items-center gap-1">
            <Building />
            <h1 className="font-light text-sm">Properties</h1>
          </div>
          <div
            className={cn(
              "rounded-t-xl  h-1.5 w-16",
              pathname === "/dashboard/products"
                ? "bg-brand dashboardfootershadow"
                : "bg-transparent"
            )}></div>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonAvatarBox: "w-9 h-9", // Custom width and height
            },
          }}
        />

        <OpenInvite />
      </div>
    </div>
  );
}

export default AdminFooter;
