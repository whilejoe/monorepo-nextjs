import { Box } from "ui/components/Box";
import { NavLink } from "components/NavLink";
import { settingsLink, settingsNavigation } from "./SettingsNavigation.css";
import { useTranslation } from "react-i18next";
import { useSettingsLinks } from "hooks/useSettingsLinks";

const SettingsNavigation = () => {
  const { t } = useTranslation("settings");
  const links = useSettingsLinks();

  return (
    <div className={settingsNavigation}>
      <h2>{t("Settings")}</h2>
      <Box as="nav" gap="1x" role="navigation">
        {links.map((link) => {
          return <NavLink className={settingsLink} {...link} key={link.id} />;
        })}
      </Box>
    </div>
  );
};

export { SettingsNavigation };
