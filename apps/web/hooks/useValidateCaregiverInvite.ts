import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0User } from "./useAuth0User";
import { useRequest, APIErrorResponse } from "./useRequest";
import axios from "axios";

type CaregiverValidate = {
  caregiverEmail: string;
  caregiverPhoneNumber: string;
  caregiverCode: string;
};

/**
 * Validate a caregiver invite from URL query params
 */
export const useValidateCaregiverInvite = () => {
  const { getAccessTokenSilently } = useAuth0User();
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation(
    async (vars: CaregiverValidate) => {
      try {
        const { data } = await request({
          method: "post",
          url: "/user/api/v1/caregiver/validate-invite",
          data: vars,
        });

        // Get updated access token from Auth0
        await getAccessTokenSilently({ cacheMode: "off" });

        return data;
      } catch (error) {
        // Use error message from API response if it exists
        if (axios.isAxiosError<APIErrorResponse>(error)) {
          throw new Error(error.response?.data?.message);
        }

        throw error;
      }
    },
    {
      onSuccess: () => {
        // Invalidate all queries
        return queryClient.invalidateQueries();
      },
      useErrorBoundary: false,
    }
  );
};
