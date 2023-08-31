import { CaregiverPatient } from "./Caregiver";

export interface UserResponse {
  actingAsPatient: CaregiverPatient | null;
  phoneNumber: string;
  email?: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  isCaregiver: boolean;
  isPatient: boolean;
}

export interface User extends UserResponse {
  caregiverFullAccess: boolean;
  hasPatientAccess: boolean;
  isAdmin: boolean;
  isCaregiverRegistered: boolean;
  fullName: string;
}

export interface Auth0User {
  name: string;
  sub: string;
}
