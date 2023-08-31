import { TripResponse } from "models/Trip";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRequest } from "./useRequest";
export interface TripQuery {
  startDate?: string;
  endDate?: string;
  pageSize?: number;
  page?: number;
}

export const useTrips = (query: TripQuery) => {
  //move
  const request = useRequest();
  const tripRequest = async (query: TripQuery, pageParam = 0) => {
    const { data } = await request<TripResponse>({
      method: "get",
      url: "/ride/api/v1/trip",
      params: { ...query, page: pageParam + 1 },
    });

    // data.items = data.items.filter((i) =>
    //   i.rides.some((i) => i.status !== "CANCELED_BY_RIDER")
    // );

    return data;
  };

  return useInfiniteQuery<TripResponse>({
    queryKey: ["trips", query],
    queryFn: ({ pageParam }) => tripRequest(query, pageParam),
    getNextPageParam: (res) => res.page < res.totalPages ?? undefined,
  });
};
