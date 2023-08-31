import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRequest } from "./useRequest";
import { CaregiverInvite } from "models/Caregiver";

export type CaregiverInviteNew = Required<
  Pick<
    CaregiverInvite,
    "caregiverEmail" | "caregiverPhoneNumber" | "typeOfAccess"
  >
>;

/**
 * Invites a caregiver by email
 */
export const useInviteCaregiver = () => {
  const request = useRequest();
  const queryClient = useQueryClient();

  return useMutation(
    async (vars: CaregiverInviteNew[]) => {
      const { data } = await request<CaregiverInvite[]>({
        method: "post",
        url: "/user/api/v1/patientcaregiver/invite",
        data: vars,
      });

      return data;
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries([
          "/user/api/v1/patientcaregiver/invite",
        ]);
      },
    }
  );
};
