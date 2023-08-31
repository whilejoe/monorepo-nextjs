import { MemberResponse, Member } from "models/Member";
import { formatPhoneNumber } from "./phoneNumber";

/**
 * Formats member data to simplify UI
 */
export const formatMember = (member: MemberResponse): Member => {
  return {
    ...member,
    fullName: `${member.firstName} ${member.lastName}`,
    phoneNumber: formatPhoneNumber(member.phoneNumber),
  };
};
