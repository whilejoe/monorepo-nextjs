import { CaregiverPatient } from "models/Caregiver";
import { ACCESS_TYPE_DISPLAY } from "constants/accessType";

export interface CaregiverPatientFormatted extends CaregiverPatient {
  typeOfAccessDisplay: string;
  fullName: string;
}

/**
 * Formats caregiver patient data to simplify UI
 */
export const formatCaregiverPatient = (
  cp: CaregiverPatient
): CaregiverPatientFormatted => {
  return {
    ...cp,
    fullName: `${cp.firstName} ${cp.lastName}`,
    typeOfAccessDisplay: ACCESS_TYPE_DISPLAY[cp.typeOfAccess],
  };
};
