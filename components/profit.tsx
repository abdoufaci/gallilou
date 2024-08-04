"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Property } from "@prisma/client";
import { Pencil } from "lucide-react";

interface ProfitProps {
  property?: Property | null;
}

function Profit({ property }: ProfitProps) {
  const { onOpen } = useModal();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-5">
        <h1 className="text-lg font-semibold">Profit</h1>
        <Pencil
          onClick={() => onOpen("profit", { property })}
          className="h-4 w-4 text-lightBrand cursor-pointer"
        />
      </div>
      <div className="w-full p-7 rounded-[11px] border border-[#443948B8] flex items-center justify-center gap-2">
        <h1 className="text-3xl text-[#15091B] font-medium">
          {property?.profit}{" "}
          <span className="text-3xl text-lightBrand"> DA</span>
        </h1>
      </div>
    </div>
  );
}

export default Profit;
