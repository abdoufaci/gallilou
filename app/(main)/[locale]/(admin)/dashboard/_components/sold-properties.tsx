import { PersentageCalculation } from "@/lib/PersentageCalculation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PercentageBadge from "./percentage-badge";

interface SoldPropertiesProps {
  soldProperties?: number;
  LastMonthSoldProperties?: number;
}

function SoldProperties({
  soldProperties,
  LastMonthSoldProperties,
}: SoldPropertiesProps) {
  const percentage = PersentageCalculation({
    lastMonth: LastMonthSoldProperties,
    thisMonth: soldProperties,
  });

  return (
    <Card className="w-full rounded-2xl shadow-md shadow-black/5 -space-y-2 text-[#15091B]">
      <CardHeader className="pl-6 p-5 pt-4">
        <div className="flex items-center gap-2">
          <h1 className="text-[#15091B8A] text-xs font-medium">
            Sold Properties
          </h1>
          <PercentageBadge percentage={percentage} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-semibold text-5xl">{soldProperties}</h1>
      </CardContent>
    </Card>
  );
}

export default SoldProperties;
