import { useMutation } from "@tanstack/react-query";
import { useRequest } from "./useRequest";
import { Caregiver } from "models/Caregiver";

type CaregiverDelete = Required<Pick<Caregiver, "caregiverId">>;

/**
 * Deletes the relationship between a patient and a caregiver
 */
export const useDeleteCaregiver = () => {
  const request = useRequest();

  return useMutation(async (vars: CaregiverDelete) => {
    const { data } = await request({
      method: "delete",
      url: `/user/api/v1/PatientCaregiver/${vars.caregiverId}`,
    });

    return data;
  });
};
