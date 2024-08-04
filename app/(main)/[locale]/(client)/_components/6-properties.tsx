"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAdminPropertiesQuery } from "@/hooks/use-query-admin-properties";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import PropertyCard from "../../(admin)/dashboard/properties/_components/property-card";
import { fetch6Properties } from "@/hooks/use-fetch-6-properties";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

function HomePropertiesFeed() {
  const t = useTranslations("properties");

  const { data: properties, isPending } = fetch6Properties();

  return (
    <div className="flex flex-col space-y-10 w-[90%] max-w-[1700px] mx-auto">
      <div className="flex items-center gap-5">
        <Separator className="bg-[#FFCF15] h-0.5 w-20" />
        <h1 className="text-3xl font-semibold">{t("properties")}</h1>
      </div>
      {isPending ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 ">
          <HomePropertiesFeed.Skelton />
          <HomePropertiesFeed.Skelton />
          <HomePropertiesFeed.Skelton />
          <HomePropertiesFeed.Skelton />
          <HomePropertiesFeed.Skelton />
          <HomePropertiesFeed.Skelton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {properties?.map((property, idx) => (
            <Link key={idx} href={`/properties/${property.id}`}>
              <PropertyCard isClient property={property} />
            </Link>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center">
        <Link href={"/properties"}>
          <Button
            className="h-11 w-48 rounded-full bg-transparent text-[#15091B] border border-[#15091B] hover:bg-[#15091B] hover:text-white transition-all 
          duration-300 ease-out">
            {t("view")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

HomePropertiesFeed.Skelton = function SkeltonTravel() {
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

export default HomePropertiesFeed;
