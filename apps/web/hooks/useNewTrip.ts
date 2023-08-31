import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRequest } from "./useRequest";
import { Ride } from "models/Ride";
import { AdditionalPassenger } from "models/Trip";

export type RideNew = Required<
  Pick<
    Ride,
    | "appointmentDateTime"
    | "pickupDateTime"
    | "startingLocation"
    | "endingLocation"
    | "sequence"
  >
>;

export interface TripNew {
  id?: string;
  notes?: string;
  additionalPassengers: AdditionalPassenger[];
  rides: RideNew[];
  tripReason: string;
  levelOfService: string;
  isRoundTrip: boolean;
}

/**
 * Creates a new trip
 */
export const useNewTrip = () => {
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation(
    async (vars: TripNew) => {
      const { data } = await request<TripNew>({
        method: "post",
        url: "/ride/api/v1/trip",
        data: vars,
      });

      return data;
    },
    {
      onSuccess: () => {
        // Invalidate trips query
        return queryClient.invalidateQueries(["/ride/api/v1/trip"]);
      },
    }
  );
};
