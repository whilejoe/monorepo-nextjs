import { useQuery } from "./useQuery";

/**
 * Send request to the api to update the trip cache
 */
export const useTripCacheUpdate = () => {
  return useQuery<any | null>(`/ride/api/v1/trip/all`, undefined, {
    select: (data) => {
      if (data) {
        return data;
      }
      return null;
    },
    useErrorBoundary: () => {
      return false;
    },
  });
};
