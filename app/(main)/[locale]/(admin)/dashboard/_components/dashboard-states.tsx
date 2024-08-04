"use client";

import { fetchDashboardStates } from "@/hooks/use-fetch-dashboard-states";
import { DollarSign } from "lucide-react";
import Revenue from "./revenue";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLastMonthDashboardStates } from "@/hooks/use-fetch-last-month-dashboard-states";
import SoldProperties from "./sold-properties";
import PropertiesForSell from "./properties-for-sell";
import { chartData } from "@/lib/chart-data";
import Chart from "./chart";

function DashboardStates() {
  const { data, isPending } = fetchDashboardStates();
  const { data: lastMonth, isPending: LastMonthPending } =
    fetchLastMonthDashboardStates();

  const chart = chartData({ properties: data?.chartData });

  return (
    <>
      {!isPending && !LastMonthPending ? (
        <div className=" mx-auto max-w-[1700px] space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5"></div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Revenue revenue={data?.revenue._sum.profit} />
            <SoldProperties
              soldProperties={data?.soldProperties.length}
              LastMonthSoldProperties={lastMonth?.soldProperties.length}
            />
            <PropertiesForSell
              propertiesForSell={data?.propertiesForSell.length}
              LastMonthPropertiesForSell={lastMonth?.propertiesForSell.length}
            />
          </div>
          <div className="w-full flex items-start max-md:flex-col gap-5">
            <Chart chart={chart} />
          </div>
        </div>
      ) : (
        <DashboardStates.Skelton />
      )}
    </>
  );
}

DashboardStates.Skelton = function DashboardStatesSkelton() {
  return (
    <div className="mx-auto max-w-[1700px] space-y-5">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Skeleton className="w-full h-[120px] rounded-2xl" />
        <Skeleton className="w-full h-[120px] rounded-2xl" />
        <Skeleton className="w-full h-[120px] rounded-2xl" />
      </div>
      <div className="w-full flex items-center max-md:flex-col gap-5">
        <Skeleton className="rounded-2xl w-full h-[450px]" />
      </div>
      <div></div>
    </div>
  );
};

export default DashboardStates;
