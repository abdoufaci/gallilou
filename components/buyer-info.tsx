"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Property } from "@prisma/client";
import { Pencil } from "lucide-react";

interface BuyerInfoProps {
  property?: Property | null;
}

function BuyerInfo({ property }: BuyerInfoProps) {
  const { onOpen } = useModal();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-5">
        <h1 className="text-lg font-semibold">Buyer Inforamtions</h1>
        <Pencil
          onClick={() => onOpen("buyerInfo", { property })}
          className="h-4 w-4 text-lightBrand cursor-pointer"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h3 className="text-[#6A6868] text-sm">Name : </h3>
          <h1>{property?.clientName}</h1>
        </div>
        <div className="flex items-center gap-3">
          <h3 className="text-[#6A6868] text-sm">Phone : </h3>
          <h1>{property?.clientPhone}</h1>
        </div>
        <div className="flex items-center gap-3">
          <h3 className="text-[#6A6868] text-sm">Address : </h3>
          <h1>{property?.clientAdress}</h1>
        </div>
      </div>
    </div>
  );
}

export default BuyerInfo;
