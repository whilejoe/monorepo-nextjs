import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0User } from "./useAuth0User";
import { useRequest } from "./useRequest";
import { Patient } from "models/Patient";

export interface PatientNew extends Omit<Patient, "id" | "plans"> {
  email: string;
  firstName: string;
  lastName: string;
  memberId: string;
  phoneNumber: string;
  postalCode: string;
}

/**
 * Registers the logged-in user as a patient
 */
export const useRegisterPatient = () => {
  const { getAccessTokenSilently } = useAuth0User();
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation(
    async (vars: PatientNew) => {
      const { data } = await request<Patient>({
        method: "post",
        url: "/user/api/v1/patient",
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
