import { useInfiniteQuery } from "@tanstack/react-query";
import { useFilterModal } from "./use-filter-modal-store";
import { getProperties } from "@/actions/queries/get-admin-properties";

export const useAdminPropertiesQuery = () => {
  const { adminPropertyData: filterData } = useFilterModal();

  const fetchCars = async ({
    pageParam = undefined,
  }: {
    pageParam?: string;
  }) => {
    const properties = await getProperties({
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
    queryKey: ["properties", filterData],
    queryFn: fetchCars,
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
