import { Location } from "models/Location";
import { useQuery } from "./useQuery";

type RecentDestinationParams = {
  count?: number;
};

/**
 * Retrieves past ride destinations
 */
export const useRecentDestinations = (params?: RecentDestinationParams) => {
  return useQuery<Location[]>("/ride/api/v1/trip/recentdestinations", params, {
    select: (data) => {
      // Handle 404 returning object in response
      // TODO: Handle in error callback
      if (data && Array.isArray(data)) {
        return data;
      }

      return [];
    },
  });
};
