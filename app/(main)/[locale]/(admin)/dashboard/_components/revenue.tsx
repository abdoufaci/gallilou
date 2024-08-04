import { DollarSign } from "lucide-react";
import Image from "next/image";

interface RevenueProps {
  revenue?: number | null;
}

function Revenue({ revenue }: RevenueProps) {
  const formatedRevenue = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "DZD",
  }).format(revenue ?? 0);

  return (
    <div className="w-full text-white rounded-2xl shadow-md shadow-black/5 bg-gradient-to-b from-[#7F369F] to-[#B456DD] h-[150px] p-3 relative overflow-hidden">
      <Image
        alt="money"
        src={"/revenue-bg.svg"}
        height={100}
        width={100}
        className="object-contain absolute bottom-0 right-0"
      />
      <div className="flex items-center text-xs font-semibold gap-1 z-50">
        <DollarSign className="h-3.5 w-3.5 z-50" />
        <h1 className="z-50">Revenue</h1>
      </div>
      <div className="flex h-[80%] items-center justify-center text-3xl sm:text-4xl md:text-5xl font-medium z-50">
        <h1 className="z-50">{formatedRevenue}</h1>
      </div>
    </div>
  );
}

export default Revenue;
