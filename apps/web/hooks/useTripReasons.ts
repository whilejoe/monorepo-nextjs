import { useQuery } from "./useQuery";
import { TripOptions } from "models/Trip";

/**
 * Retrieves trip reasons
 */
export const useTripReasons = () => {
  return useQuery<TripOptions[]>("/ride/api/v1/trip/reasons", undefined, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    suspense: false,
  });
};
