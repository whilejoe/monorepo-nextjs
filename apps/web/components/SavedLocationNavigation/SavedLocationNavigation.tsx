import Link from "next/link";
import { useRouter } from "next/router";
import { ActiveLink } from "components/ActiveLink";
import { active } from "components/NavLink";
import {
  settingsBack,
  settingsLink,
  settingsNavigation,
} from "components/SettingsNavigation/SettingsNavigation.css";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";
import { Button } from "ui/components/Button";
import { useNamedLocations } from "hooks/useNamedLocations";
import { useTranslation } from "react-i18next";
import { MdChevronLeft } from "react-icons/md";

const SavedLocationNavigation = () => {
  const { data } = useNamedLocations();
  const { push } = useRouter();
  const { t } = useTranslation("settings");

  return (
    <Box className={settingsNavigation}>
      <Box mb="2x">
        <Link href="/settings" className={settingsBack}>
          <AccessibleIcon icon={<MdChevronLeft size={20} />} />
          {t("Back to Settings")}
        </Link>
      </Box>
      <h2> {t("Saved Locations")}</h2>
      <Box mb="3x">
        {data?.map((location) => (
          <Box key={location.id}>
            <ActiveLink
              className={settingsLink}
              activeClassName={active}
              href={`/settings/saved-locations/${location.id}`}
              id={location.name}
            >
              {location.name}
            </ActiveLink>
          </Box>
        ))}
      </Box>
      <Button onClick={() => push("/settings/saved-locations/add")}>
        {t("Add Location")}
      </Button>
    </Box>
  );
};

export { SavedLocationNavigation };
