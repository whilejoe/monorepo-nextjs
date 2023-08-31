import { useQuery } from "./useQuery";
import { ServiceOptions } from "models/Trip";

/**
 * Retrieves travel modes
 */
export const useLevelsOfService = () => {
  return useQuery<ServiceOptions[]>(
    "/ride/api/v1/trip/levelsofservice",
    undefined,
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      suspense: false,
    }
  );
};
