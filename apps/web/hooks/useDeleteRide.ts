import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRequest } from "./useRequest";
import { Ride } from "models/Ride";
import { Location } from "models/Location";

type RideDelete = Required<Pick<Ride, "id" | "tripId">>;

interface RideUpdateOrDelete extends RideDelete {
  schedule?: {
    appointmentDateTime: string;
    pickupDateTime: string;
    startingLocation: Location;
    endingLocation: Location;
  };
}

/**
 * Cancels an upcoming ride
 */
export const useDeleteOrUpdateRide = () => {
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation(
    async (vars: RideUpdateOrDelete) => {
      const { data } = await request({
        method: "delete",
        url: `/ride/api/v1/trip/${vars.tripId}/ride/${vars.id}`,
        data: {
          status: "CANCELED_BY_RIDER",
          ...vars,
        },
      });

      return data;
    },
    {
      onSuccess: () => {
        // Invalidate upcoming rides query
        return queryClient.invalidateQueries(["/ride/api/v1/trip/upcoming"]);
      },
    }
  );
};
