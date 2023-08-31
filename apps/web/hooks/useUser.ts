import { useQuery } from "./useQuery";
import { User } from "models/User";
import { APIErrorResponse } from "./useRequest";
import axios from "axios";

export const useUser = () => {
  return useQuery<User | null>("/user/api/v1/user", undefined, {
    select: (data) => {
      // Endpoint returns a 204 (empty response) if user hasn't registered
      // Convert to null for easier checks
      if (!data) return null;

      // If firstName exists we know that the user has registered
      // TODO: Design a better way to derive flag
      const isCaregiverRegistered = data.isCaregiver && !!data.firstName;

      return {
        ...data,
        caregiverFullAccess:
          data.actingAsPatient === null ||
          data.actingAsPatient.typeOfAccess === "FullAccess",
        hasPatientAccess:
          data.isPatient ||
          (isCaregiverRegistered && !!data.actingAsPatient) ||
          (data.isAdmin && !!data.actingAsPatient),
        isCaregiverRegistered,
        fullName:
          data.firstName && data.lastName
            ? `${data.firstName} ${data.lastName}`
            : "",
      };
    },
    useErrorBoundary: (error) => {
      // Don't throw an error if endpoint returns a 404
      if (
        axios.isAxiosError<APIErrorResponse>(error) &&
        error.response?.status === 404
      ) {
        return false;
      }

      return true;
    },
  });
};
