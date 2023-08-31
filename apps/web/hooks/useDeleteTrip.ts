import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRequest } from "./useRequest";
import { RideNew } from "./useNewTrip";
import { Trip, AdditionalPassenger } from "models/Trip";

type TripDelete = Required<Pick<Trip, "id">>;

interface TripUpdateOrDelete extends TripDelete {
  rides?: RideNew[];
  additionalPassengers?: AdditionalPassenger[];
  tripReason?: string;
  levelOfService?: string;
  isRoundTrip?: boolean;
  notes?: string;
}

/**
 * Cancels an upcoming Trip
 */
export const useDeleteOrUpdateTrip = () => {
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation(
    async (vars: TripUpdateOrDelete) => {
      const { data } = await request({
        method: "delete",
        url: `/ride/api/v1/trip/${vars.id}`,
        data: { status: "CANCELED_BY_RIDER", ...vars },
      });

      return data;
    },
    {
      onSuccess: () => {
        // Invalidate upcoming rides query
        return queryClient.invalidateQueries(["/ride/api/v1/trip"]);
      },
    }
  );
};
