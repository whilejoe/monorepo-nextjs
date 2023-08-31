import { TripResponse } from "models/Trip";
import { formatTrip } from "utils/formatTrip";
import { useQuery } from "./useQuery";

const date = new Date();

export const useUpcomingTrips = () => {
  return useQuery<TripResponse>(
    "/ride/api/v1/trip",
    { pageSize: 100, page: 1, startDate: date, excludeCanceledRides: true },
    {
      select: (data) => {
        if (data?.items) {
          return {
            ...data,
            items: data.items.map(formatTrip),
          };
        }

        return data;
      },
    }
  );
};
