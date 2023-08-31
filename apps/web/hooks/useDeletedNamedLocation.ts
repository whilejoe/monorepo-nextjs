import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRequest } from "./useRequest";

/**
 * Cancels an upcoming ride
 */
export const useDeleteNamedLocation = () => {
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation(
    async (id: string) => {
      const { data } = await request({
        method: "delete",
        url: `/ride/api/v1/NamedLocation/${id}`,
      });

      return data;
    },
    {
      onSuccess: () => {
        // Invalidate upcoming rides query
        return queryClient.invalidateQueries(["/ride/api/v1/NamedLocation"]);
      },
    }
  );
};
