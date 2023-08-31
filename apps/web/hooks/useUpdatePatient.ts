import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRequest } from "./useRequest";
import { Patient } from "models/Patient";

type PatientUpdate = Required<Pick<Patient, "allowCaregiverAccess">>;

/**
 * Updates the logged-in user's patient data
 */
export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation(
    async (vars: PatientUpdate) => {
      const { data } = await request<Patient>({
        method: "put",
        url: "/user/api/v1/patient",
        data: vars,
      });

      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["/user/api/v1/patient", null], data);
      },
    }
  );
};
