import { useQuery } from "./useQuery";
import { formatRide } from "utils/formatRide";
import { Ride } from "models/Ride";

type RideParams = {
  count?: number;
};

/**
 * Retrieves upcoming rides
 */
export const useUpcomingRides = (params?: RideParams) => {
  return useQuery<Ride[]>("/ride/api/v1/trip/upcoming", params, {
    select: (data) => {
      // Handle 404 returning object in response
      // TODO: Handle in error callback
      if (data && Array.isArray(data)) {
        return data.map(formatRide).slice(1, data.length);
      }

      return [];
    },
  });
};

/**
 * Retrieves next ride
 */
export const useNextRide = () => {
  return useQuery<Ride | null>(
    "/ride/api/v1/trip/upcoming",
    { count: 1 },
    {
      select: (data) => {
        // Handle 404 returning object in response
        // TODO: Handle in error callback
        if (data && Array.isArray(data) && data.length) {
          return formatRide(data[0]);
        }

        return null;
      },
    }
  );
};
