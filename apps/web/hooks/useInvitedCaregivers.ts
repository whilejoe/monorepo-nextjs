import { useQuery } from "./useQuery";
import {
  formatInvitedCaregiver,
  InvitedCaregiverFormatted,
} from "utils/formatInvitedCaregiver";

/**
 * Retrieves a list of caregivers that have been invited
 */
export const useInvitedCaregivers = () => {
  return useQuery<InvitedCaregiverFormatted[]>(
    "/user/api/v1/patientcaregiver/invite",
    undefined,
    {
      select: (data) => {
        // Handle 404 returning object in response
        // TODO: Handle in error callback
        if (data && Array.isArray(data)) {
          return data.map(formatInvitedCaregiver);
        }

        return [];
      },
    }
  );
};
