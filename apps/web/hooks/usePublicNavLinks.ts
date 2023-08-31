import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NavLinkProps } from "components/NavLink";

interface DynamicLink extends NavLinkProps {
  linkText: string;
}

const LINKS: DynamicLink[] = [
  { href: "/help-center", id: "helpcenter", linkText: "Help Center" },
];

export const usePublicNavLinks = () => {
  const { t } = useTranslation("common");

  return useMemo(() => {
    return LINKS.reduce<NavLinkProps[]>((acc, link) => {
      const { linkText, ...rest } = link;

      return [...acc, { ...rest, children: t(linkText) }];
    }, []);
  }, [t]);
};
