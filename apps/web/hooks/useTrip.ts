import { useQuery } from "./useQuery";
import { Trip } from "models/Trip";

/**
 * Get a trip by id
 */
export const useTrip = (id: string) => {
  return useQuery<Trip | null>(`/ride/api/v1/trip/${id}`, undefined, {
    select: (data) => {
      if (data) {
        return data;
      }
      return null;
    },
  });
};
