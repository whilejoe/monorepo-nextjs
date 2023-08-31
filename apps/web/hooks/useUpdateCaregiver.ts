import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRequest } from "./useRequest";
import { formatCaregiver, CaregiverFormatted } from "utils/formatCaregiver";
import { Caregiver } from "models/Caregiver";

export type CaregiverUpdate = Required<
  Pick<Caregiver, "allowCaregiverAccess" | "caregiverId" | "typeOfAccess">
>;

/**
 * Updates a single caregiver by ID
 */
export const useUpdateCaregiver = () => {
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation(
    async (vars: CaregiverUpdate) => {
      const { data } = await request<CaregiverFormatted>({
        method: "put",
        url: `/user/api/v1/patientcaregiver/${vars.caregiverId}`,
        data: vars,
      });

      return data;
    },
    {
      onSuccess: (data, vars) => {
        const formatted = formatCaregiver(data);

        queryClient.setQueryData(
          [`/user/api/v1/patientcaregiver/${vars.caregiverId}`, null],
          formatted
        );

        // Invalidate user query
        return queryClient.invalidateQueries(["/user/api/v1/user"]);
      },
    }
  );
};
