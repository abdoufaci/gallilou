import { useInfiniteQuery } from "@tanstack/react-query";
import { useFilterModal } from "./use-filter-modal-store";
import { getProperties } from "@/actions/queries/get-admin-properties";
import { getClientProperties } from "@/actions/queries/get-client-properties";

export const useClientPropertiesQuery = () => {
  const { clientPropertyData: filterData } = useFilterModal();

  const fetchCientProperties = async ({
    pageParam = undefined,
  }: {
    pageParam?: string;
  }) => {
    const properties = await getClientProperties({
      pageParam,
      filterData,
    });

    return properties;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isLoadingError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["clientproperties", filterData],
    queryFn: fetchCientProperties,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: undefined,
    refetchInterval: false,
  });

  return {
    fetchNextPage,
    data,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isLoadingError,
    refetch,
  };
};
