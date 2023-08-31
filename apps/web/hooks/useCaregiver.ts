import { useQuery } from "./useQuery";
import { formatCaregiver, CaregiverFormatted } from "utils/formatCaregiver";
import { Caregiver } from "models/Caregiver";

/**
 * Retrieves a single caregiver by ID
 */
export const useCaregiver = (id?: Caregiver["caregiverId"]) => {
  return useQuery<CaregiverFormatted>(
    !id ? null : `/user/api/v1/patientcaregiver/${id}`,
    undefined,
    {
      select: (data) => formatCaregiver(data),
    }
  );
};
