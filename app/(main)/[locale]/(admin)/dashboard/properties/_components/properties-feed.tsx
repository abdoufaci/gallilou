"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAdminPropertiesQuery } from "@/hooks/use-query-admin-properties";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import PropertyCard from "./property-card";

function PropertiesFeed() {
  const pathname = usePathname();

  const {
    data: properties,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useAdminPropertiesQuery();

  const [Buttonref, ButtonInView] = useInView();

  useEffect(() => {
    if (ButtonInView) {
      fetchNextPage();
    }
  }, [ButtonInView]);

  return (
    <div className="flex flex-col space-y-3 w-full max-w-[1700px] mx-auto">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          <PropertiesFeed.Skelton />
          <PropertiesFeed.Skelton />
          <PropertiesFeed.Skelton />
          <PropertiesFeed.Skelton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {properties?.pages.map((page) =>
            page?.properties.map((property, idx) => (
              <PropertyCard key={idx} property={property} />
            ))
          )}
        </div>
      )}
      {hasNextPage && (
        <div className="flex justify-center w-full">
          {isFetchingNextPage ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full ">
              <PropertiesFeed.Skelton />
              <PropertiesFeed.Skelton />
              <PropertiesFeed.Skelton />
              <PropertiesFeed.Skelton />
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

PropertiesFeed.Skelton = function SkeltonTravel() {
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

export default PropertiesFeed;
