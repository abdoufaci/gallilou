"use client";

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Prisma, Property } from "@prisma/client";
import { Bath, BedDouble, Scan } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface PropertyCardProps {
  property: Property | null;
  isClient?: boolean;
}

function PropertyCard({ property, isClient = false }: PropertyCardProps) {
  const { onOpen } = useModal();
  const images = property?.images as Prisma.JsonArray;

  const t = useTranslations("card");

  return (
    <div
      onClick={() => !isClient && onOpen("propertyDetails", { property })}
      className={cn(
        "flex flex-col w-full rounded-[3.27px] propertyCardShadow h-[450px] max-w-sm bg-white relative",
        !isClient && "cursor-pointer"
      )}>
      {property?.isSold && (
        <div
          className="w-full h-full absolute top-0 left-0 bg-lightBrand/70 font-semibold rounded-[3.27px] flex items-center 
        justify-center text-white text-5xl z-50">
          <h1>SOLD</h1>
        </div>
      )}
      <div className="relative w-full min-h-[285px] h-[285px]">
        <Image
          alt="Property"
          src={
            //@ts-ignore
            images[0].url || ""
          }
          fill
          objectFit="conver"
          quality={100}
          className="object-cover w-full h-full rounded-[3.27px]"
        />
      </div>
      <div className="w-full p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-[#4D515B] text-sm font-semibold">
            {property?.wilaya}, {property?.city}
          </h1>
          <div className="flex items-center gap-2 px-4 py-0.5 text-xs rounded-full border border-[#7F369F] text-[#7F369F]">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                property?.target === "RENT" ? "bg-[#D6A319]" : "bg-[#2BC194]"
              )}></div>
            <h1>{property?.target === "RENT" ? t("rent") : t("sale")}</h1>
          </div>
        </div>
        <h1 className="text-xl font-bold">{property?.location}</h1>
        <div className="w-full grid grid-cols-3 ">
          <div className="flex items-center gap-3 text-[#15091B] font-semibold">
            <BedDouble className="h-4 w-4" />
            <h1>{property?.bedroom}</h1>
          </div>
          <div className="flex items-center gap-3 text-[#15091B] font-semibold">
            <Bath className="h-4 w-4" />
            <h1>{property?.bathroom}</h1>
          </div>
          <div className="flex items-center gap-3 text-[#15091B] font-semibold">
            <Scan className="h-4 w-4" />
            <h1>{property?.size} m²</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
