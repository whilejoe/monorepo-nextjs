import { useQuery } from "./useQuery";
import { formatMember } from "utils/formatMember";
import { MemberSearchQuery, MemberSearchResponse } from "models/Member";

/**
 * Retrieves a list of a members for an admin
 */
export const useMembers = (query?: MemberSearchQuery) => {
  // `query` is always passed as an object even if empty
  // Disable request if query is empty
  const hasQuery = !!query && Object.keys(query).length > 0;
  const url = hasQuery ? "/user/api/v1/patient/search" : null;

  return useQuery<MemberSearchResponse>(url, hasQuery ? query : undefined, {
    select: (data) => {
      if (data?.items) {
        return {
          ...data,
          items: data.items.map(formatMember),
        };
      }

      return data;
    },
  });
};
