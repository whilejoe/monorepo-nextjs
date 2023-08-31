import { useQuery } from "./useQuery";
import { NamedLocation } from "models/NamedLocation";

/**
 * Retrieves travel modes
 */
export const useNamedLocations = () => {
  return useQuery<NamedLocation[]>("/ride/api/v1/namedlocation", undefined, {
    select: (data) => {
      if (data && Array.isArray(data)) {
        return data;
      }
      return [];
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};
