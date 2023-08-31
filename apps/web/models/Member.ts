import { Patient } from "./Patient";
import { ParsedUrlQuery } from "querystring";

export interface MemberResponse
  extends Omit<Patient, "allowCaregiverAccess" | "id"> {
  eligibilityStartDate: string | null;
  eligibilityEndDate: string | null;
  firstName: string;
  lastName: string;
  patientId: string;
  phoneNumber: string;
}

// Formatted API Response
export interface Member extends MemberResponse {
  fullName: string;
}

export interface MemberSearchResponse {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: MemberResponse[];
}

export type MemberSortFields = Pick<
  Member,
  "dateOfBirth" | "firstName" | "lastName" | "phoneNumber"
>;

export type MemberSearchFields = MemberSortFields & { memberId: string };

export interface MemberSearchQuery
  extends Partial<MemberSearchFields>,
    ParsedUrlQuery {
  page?: string;
  pageSize?: string;
  sortColumn?: keyof MemberSortFields;
  sortAsc?: string;
}
