import { useQuery } from "@tanstack/react-query";
import { useFilterModal } from "./use-filter-modal-store";
import { getDashboardStates } from "@/actions/queries/dashboard-queries/get-states";
import { Get6Properties } from "@/actions/queries/get-6-properties";

export const fetch6Properties = () => {
  const { data, isPending, refetch } = useQuery({
    queryFn: () => Get6Properties(),
    queryKey: ["6properties"],
  });

  return {
    data,
    isPending,
    refetch,
  };
};
