import { PersentageCalculation } from "@/lib/PersentageCalculation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PercentageBadge from "./percentage-badge";

interface PropertiesForSellProps {
  propertiesForSell?: number;
  LastMonthPropertiesForSell?: number;
}

function PropertiesForSell({
  propertiesForSell,
  LastMonthPropertiesForSell,
}: PropertiesForSellProps) {
  const percentage = PersentageCalculation({
    lastMonth: LastMonthPropertiesForSell,
    thisMonth: propertiesForSell,
  });

  return (
    <Card className="w-full rounded-2xl shadow-md shadow-black/5 -space-y-2 text-[#15091B]">
      <CardHeader className="pl-6 p-5 pt-4">
        <div className="flex items-center gap-2">
          <h1 className="text-[#15091B8A] text-xs font-medium">
            Properties for sell
          </h1>
          <PercentageBadge percentage={percentage} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-semibold text-5xl">{propertiesForSell}</h1>
      </CardContent>
    </Card>
  );
}

export default PropertiesForSell;
