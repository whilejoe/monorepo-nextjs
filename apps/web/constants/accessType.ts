import { AccessType } from "models/Caregiver";

export const ACCESS_TYPE_DISPLAY: Record<AccessType, string> = {
  FullAccess: "Full Access",
  ViewOnly: "View Only",
} as const;
