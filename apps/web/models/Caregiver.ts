export type AccessType = "FullAccess" | "ViewOnly";

export interface Caregiver {
  allowCaregiverAccess: boolean;
  caregiverId: string;
  email?: string;
  firstName: string;
  lastName: string;
  typeOfAccess: AccessType;
}

export interface CaregiverInvite {
  caregiverEmail: string;
  caregiverPhoneNumber: string;
  createDateTime: string;
  typeOfAccess: AccessType;
}

export interface CaregiverPatient
  extends Pick<
    Caregiver,
    "allowCaregiverAccess" | "typeOfAccess" | "firstName" | "lastName"
  > {
  id: string;
}
