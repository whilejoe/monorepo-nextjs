import { useQuery } from "./useQuery";
import {
  formatCaregiverPatient,
  CaregiverPatientFormatted,
} from "utils/formatCaregiverPatient";

/**
 * Retrieves a list of a caregiver's patients
 */
export const useCaregiverPatients = () => {
  return useQuery<CaregiverPatientFormatted[]>(
    "/user/api/v1/caregiver/patient",
    undefined,
    {
      select: (data) => {
        // Handle 404 returning object in response
        // TODO: Handle in error callback
        if (data && Array.isArray(data)) {
          return data.map(formatCaregiverPatient);
        }

        return [];
      },
    }
  );
};
