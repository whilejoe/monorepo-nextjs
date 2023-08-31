import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0User } from "./useAuth0User";
import { useRequest } from "./useRequest";

export type CaregiverAsPatient = { id: string | null };

/**
 * Allows a caregiver to act on behalf of a patient
 */
export const useCaregiverAsPatient = () => {
  const { getAccessTokenSilently } = useAuth0User();
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation(
    async (vars: CaregiverAsPatient) => {
      const { data } = await request({
        method: "post",
        url: "/user/api/v1/caregiver/act-as-patient",
        data: vars,
      });

      // Get updated access token from Auth0
      await getAccessTokenSilently({ cacheMode: "off" });

      return data;
    },
    {
      onSuccess: () => {
        // Invalidate all queries
        return queryClient.invalidateQueries();
      },
    }
  );
};
