import env from "@beam-australia/react-env";
import { useTranslation } from "react-i18next";
import {
  MdPersonOutline,
  MdOutlineLogout,
  MdSupervisorAccount,
  MdOutlineSettings,
} from "react-icons/md";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "ui/components/Popover";

import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";
import { Button } from "ui/components/Button";
import { NavLink } from "components/NavLink";
import { LanguageSelector } from "components/LanguageSelector";
import { ColorModeToggle } from "components/ColorMode";
import { useAuth0User } from "hooks/useAuth0User";
import { useUser } from "hooks/useUser";
import { menuContainer, menuLink } from "./UserAvatar.css";

const UserAvatar = () => {
  const { logout } = useAuth0User();
  const { data: user } = useUser();
  const { t } = useTranslation("common");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          data-automation-hook="user-avatar-menu-button"
          kind="text"
          priority={2}
          round
        >
          <AccessibleIcon
            label="Toggle user menu"
            icon={<MdPersonOutline size={20} />}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className={menuContainer}
        sideOffset={15}
        style={{ minWidth: 195 }}
      >
        {user?.fullName && (
          <Box as="p" mb="0x" py="1x" fontSize="xs" color="muted">
            {user.fullName}
          </Box>
        )}

        {user?.isCaregiverRegistered && (
          <PopoverClose asChild>
            <NavLink
              className={menuLink}
              data-automation-hook="select-access-route-link"
              href="/select-access"
              id="select-access"
            >
              <AccessibleIcon icon={<MdSupervisorAccount size={18} />} />
              {t("Select Access")}
            </NavLink>
          </PopoverClose>
        )}

        <ColorModeToggle />
        <PopoverClose asChild>
          <NavLink
            className={menuLink}
            data-automation-hook="settings-route-link"
            href="/settings"
            id="settings"
          >
            <AccessibleIcon icon={<MdOutlineSettings size={18} />} />
            {t("Settings")}
          </NavLink>
        </PopoverClose>
        <PopoverClose asChild>
          <button
            className={menuLink}
            data-automation-hook="logout-user-button"
            onClick={() => {
              logout({
                logoutParams: {
                  returnTo: env("AUTH0_REDIRECT_URI"),
                },
              });
            }}
          >
            <AccessibleIcon icon={<MdOutlineLogout size={18} />} />
            {t("Logout")}
          </button>
        </PopoverClose>
        <LanguageSelector />
      </PopoverContent>
    </Popover>
  );
};

export { UserAvatar };
