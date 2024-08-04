"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAdminPropertiesQuery } from "@/hooks/use-query-admin-properties";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import PropertyCard from "../../../(admin)/dashboard/properties/_components/property-card";
import { useClientPropertiesQuery } from "@/hooks/use-query-client-properties";
import { useFilterModal } from "@/hooks/use-filter-modal-store";
import { useTranslations } from "next-intl";

function ClientPropertiesFeed() {
  const pathname = usePathname();

  const { clientPropertyData } = useFilterModal();

  const t = useTranslations("filter");

  const {
    data: properties,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useClientPropertiesQuery();

  const [Buttonref, ButtonInView] = useInView();

  useEffect(() => {
    if (ButtonInView) {
      fetchNextPage();
    }
  }, [ButtonInView]);

  return (
    <div className="flex flex-col space-y-3 w-full max-w-[1700px] mx-auto">
      {(clientPropertyData.bathroom ||
        clientPropertyData.bedroom ||
        clientPropertyData.city ||
        !!clientPropertyData.target?.length ||
        clientPropertyData.wilaya ||
        clientPropertyData.maxSize ||
        clientPropertyData.minSize ||
        !!clientPropertyData.type?.length) &&
        !!properties?.pages[0].properties.length && (
          <h1 className="text-black font-semibold">
            {properties?.pages[0].properties.length} {t("results")}
          </h1>
        )}
      {isLoading ? (
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 min-[1800px]:grid-cols-4 gap-4 ">
          <ClientPropertiesFeed.Skelton />
          <ClientPropertiesFeed.Skelton />
          <ClientPropertiesFeed.Skelton />
          <ClientPropertiesFeed.Skelton />
          <ClientPropertiesFeed.Skelton />
          <ClientPropertiesFeed.Skelton />
        </div>
      ) : (
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 min-[1800px]:grid-cols-4 gap-5 w-full">
          {properties?.pages.map((page) =>
            page?.properties.map((property, idx) => (
              <Link
                key={idx}
                href={`/properties/${property.id}`}
                className="w-full">
                <PropertyCard isClient property={property} />
              </Link>
            ))
          )}
        </div>
      )}
      {hasNextPage && (
        <div className="flex justify-center w-full">
          {isFetchingNextPage ? (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 min-[1800px]:grid-cols-4 gap-4 w-full ">
              <ClientPropertiesFeed.Skelton />
              <ClientPropertiesFeed.Skelton />
              <ClientPropertiesFeed.Skelton />
              <ClientPropertiesFeed.Skelton />
              <ClientPropertiesFeed.Skelton />
              <ClientPropertiesFeed.Skelton />
            </div>
          ) : (
            <Button
              ref={Buttonref}
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}>
              Show more
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

ClientPropertiesFeed.Skelton = function SkeltonTravel() {
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

export default ClientPropertiesFeed;
