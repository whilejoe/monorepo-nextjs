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
    href: "/settings/saved-locations",
    id: "saved-locations",
    linkText: "Saved Locations",
    loose: true,
  },
];

export const useSettingsLinks = () => {
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
