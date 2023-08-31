import { rest } from "msw";
import { MemberSearchResponse } from "../models/Member";
import memberSearch from "./data/memberSearch.json";

export const handlers = [
  rest.get(
    "https://api.dev.access2care.com/user/api/v1/patient/search",
    (req, res, ctx) => {
      const searchParams = new URLSearchParams(req.url.searchParams);
      const firstName = searchParams.get("firstName");

      if (firstName) {
        const filteredMembers = memberSearch.items.filter((m) =>
          m.firstName.toLowerCase().includes(firstName.toLowerCase() as string)
        );

        return res(
          ctx.json<MemberSearchResponse>({
            items: filteredMembers,
            page: 1,
            pageSize: 10,
            totalCount: filteredMembers.length,
            totalPages: 1,
          })
        );
      }

      return res(ctx.json<MemberSearchResponse>(memberSearch));
    }
  ),
];
