import { useQuery } from "./useQuery";
import { formatCaregiver, CaregiverFormatted } from "utils/formatCaregiver";

/**
 * Retrieves a list of caregivers
 */
export const useCaregivers = () => {
  return useQuery<CaregiverFormatted[]>(
    "/user/api/v1/patientcaregiver",
    undefined,
    {
      select: (data) => {
        // Handle 404 returning object in response
        // TODO: Handle in error callback
        if (data && Array.isArray(data)) {
          return data.map(formatCaregiver);
        }

        return [];
      },
    }
  );
};
