import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRequest } from "./useRequest";
import { User, UserResponse } from "models/User";

export type CaregiverNew = Partial<UserResponse>;

/**
 * Registers the logged-in user as a caregiver
 */
export const useRegisterCaregiver = () => {
  const queryClient = useQueryClient();
  const request = useRequest();

  return useMutation(
    async (vars: CaregiverNew) => {
      const { data } = await request<User>({
        method: "put",
        url: "/user/api/v1/user",
        data: vars,
      });

      return data;
    },
    {
      onSuccess: () => {
        // Invalidate user query
        return queryClient.invalidateQueries(["/user/api/v1/user"]);
      },
    }
  );
};
