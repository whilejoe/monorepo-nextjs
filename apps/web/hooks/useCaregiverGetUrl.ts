import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRequest, APIErrorResponse } from "./useRequest";
import axios from "axios";

interface UrlData {
  url: string;
}
/**
 * Validate and return url from SMS invite based on URL query params
 */
export const useCaregiverGetUrl = () => {
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation(
    async (id: string) => {
      try {
        const { data } = await request<UrlData>({
          method: "get",
          url: `/user/api/v1/caregiver/get-url?id=${id}`,
        });

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
