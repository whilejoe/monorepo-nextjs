import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NavLinkProps } from "components/NavLink";
import { useUser } from "./useUser";

interface DynamicLink extends NavLinkProps {
  linkText: string;
  requireAdminAccess?: boolean;
  requirePatientAccess?: boolean;
}

const LINKS: DynamicLink[] = [
  {
    href: "/admin",
    id: "admin",
    linkText: "Dashboard",
    loose: true,
    requireAdminAccess: true,
  },
  {
    href: "/",
    id: "schedule",
    linkText: "Schedule",
    requirePatientAccess: true,
  },
  {
    href: "/caregivers",
    id: "caregivers",
    linkText: "Caregivers",
    loose: true,
    requirePatientAccess: true,
  },
  {
    href: "/rides",
    id: "rides",
    linkText: "Rides",
    loose: true,
    requirePatientAccess: true,
  },
  { href: "/help-center", id: "helpcenter", linkText: "Help Center" },
];

export const useNavLinks = () => {
  const { data: user } = useUser();
  const { t } = useTranslation("common");

  return useMemo(() => {
    return LINKS.reduce<NavLinkProps[]>((acc, link) => {
      const { linkText, requireAdminAccess, requirePatientAccess, ...rest } =
        link;

      if (
        (requireAdminAccess && !user?.isAdmin) ||
        (requirePatientAccess && !user?.hasPatientAccess)
      ) {
        return acc;
      }

      return [...acc, { ...rest, children: t(linkText) }];
    }, []);
  }, [t, user?.isAdmin, user?.hasPatientAccess]);
};
