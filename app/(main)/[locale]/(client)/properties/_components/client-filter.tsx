import { useTranslations } from "next-intl";
import { BedBathFilter } from "./filters/bath-bed-filter";
import { MinMaxSizeFilter } from "./filters/min-max-size-filter";
import { StateCityFilter } from "./filters/state-city-filter";
import PropertyTargetFilter from "./filters/target-filter";
import PropertyTypeFilter from "./filters/type-filter";

function ClientFilter() {
  const t = useTranslations("filter");
  return (
    <div className="space-y-5">
      <h1 className="font-bold text-lg">{t("title")}</h1>
      <div className="space-y-5">
        <StateCityFilter />
        <PropertyTargetFilter />
        <PropertyTypeFilter />
        <BedBathFilter />
        <MinMaxSizeFilter />
      </div>
    </div>
  );
}

export default ClientFilter;
