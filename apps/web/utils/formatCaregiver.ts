import { Caregiver } from "models/Caregiver";
import { ACCESS_TYPE_DISPLAY } from "constants/accessType";

export interface CaregiverFormatted extends Caregiver {
  typeOfAccessDisplay: string;
  fullName: string;
}

/**
 * Formats caregiver data to simplify UI
 */
export const formatCaregiver = (c: Caregiver): CaregiverFormatted => {
  return {
    ...c,
    fullName: `${c.firstName} ${c.lastName}`,
    typeOfAccessDisplay: ACCESS_TYPE_DISPLAY[c.typeOfAccess],
  };
};
