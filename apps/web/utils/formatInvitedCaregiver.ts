import { formatPhoneNumber } from "utils/phoneNumber";
import { ACCESS_TYPE_DISPLAY } from "constants/accessType";
import { CaregiverInvite } from "models/Caregiver";

export interface InvitedCaregiverFormatted extends CaregiverInvite {
  typeOfAccessDisplay: string;
}

/**
 * Formats invited caregiver data to simplify UI
 */
export const formatInvitedCaregiver = (
  c: CaregiverInvite
): InvitedCaregiverFormatted => {
  return {
    ...c,
    caregiverEmail: c.caregiverEmail || "N/A",
    caregiverPhoneNumber: c.caregiverPhoneNumber
      ? formatPhoneNumber(c.caregiverPhoneNumber)
      : "N/A",
    typeOfAccessDisplay: ACCESS_TYPE_DISPLAY[c.typeOfAccess],
  };
};
