import { Plan } from "./Plan";

export interface Patient {
  allowCaregiverAccess: boolean;
  dateOfBirth: string;
  plans: Plan[];
  id: string;
  isEligible?: boolean;
}
