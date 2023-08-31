import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRequest } from "./useRequest";
import { NamedLocation } from "models/NamedLocation";
/**
 * Updates a single caregiver by ID
 */
export const useUpdateNamedLocation = () => {
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation(
    async (vars: NamedLocation) => {
      const { data } = await request<NamedLocation>({
        method: "put",
        url: `/ride/api/v1/NamedLocation/`,
        data: vars,
      });
      return data;
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["/ride/api/v1/NamedLocation"]);
      },
    }
  );
};
