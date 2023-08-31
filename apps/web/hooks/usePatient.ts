import { useQuery } from "./useQuery";
import { Patient } from "models/Patient";
import axios from "axios";
import { APIErrorResponse } from "./useRequest";

/**
 * Retrieves patient data for the logged-in user
 */
export const usePatient = () => {
  return useQuery<Patient>("/user/api/v1/patient", undefined, {
    select: (data) => {
      return data;
    },
    useErrorBoundary: (error) => {
      // Don't throw an error if endpoint returns a 404
      if (
        axios.isAxiosError<APIErrorResponse>(error) &&
        error.response?.status! >= 403
      ) {
        return false;
      }
      return true;
    },
  });
};
