import { useQuery } from "./useQuery";

export interface ReturnTrip {
  isReturnRideAvailable: boolean;
}

/**
 * Check if a return trip is available
 */
export const useReturnTrip = () => {
  return useQuery<ReturnTrip | null>(`/ride/api/v1/trip/return`, undefined, {
    select: (data) => {
      if (data) {
        return data;
      }
      return null;
    },
  });
};
