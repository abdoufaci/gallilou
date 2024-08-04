"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAdminPropertiesQuery } from "@/hooks/use-query-admin-properties";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import { fetch6Properties } from "@/hooks/use-fetch-6-properties";
import { Separator } from "@/components/ui/separator";
import PropertyCard from "@/app/(main)/[locale]/(admin)/dashboard/properties/_components/property-card";
import { useTranslations } from "next-intl";

function SuggestedPropertiesFeed() {
  const pathname = usePathname();

  const { data: properties, isPending } = fetch6Properties();

  const t = useTranslations("property");

  return (
    <div className="flex flex-col space-y-10 w-[90%] max-w-[1700px] mx-auto mt-36">
      <div className="flex items-center gap-5">
        <Separator className="bg-[#15091B] h-0.5 w-20" />
        <h1 className="text-3xl text-[#15091B] font-semibold">{t("sugg")}</h1>
      </div>
      {isPending ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 ">
          <SuggestedPropertiesFeed.Skelton />
          <SuggestedPropertiesFeed.Skelton />
          <SuggestedPropertiesFeed.Skelton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {properties?.slice(3)?.map((property, idx) => (
            <Link key={idx} href={`/properties/${property.id}`}>
              <PropertyCard isClient property={property} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

SuggestedPropertiesFeed.Skelton = function SkeltonTravel() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[285px] w-[285px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[125px]" />
      </div>
    </div>
  );
};

export default SuggestedPropertiesFeed;
