import { SavedLocationNavigation } from "components/SavedLocationNavigation";
import { settingsBack } from "components/SettingsNavigation/SettingsNavigation.css";
import { useUser } from "hooks/useUser";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { MdChevronLeft } from "react-icons/md";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";

interface SavedLocationLayoutProps {
  children: React.ReactNode;
}

const SavedLocationLayout = ({ children }: SavedLocationLayoutProps) => {
  const { t } = useTranslation("settings");
  const { data: user } = useUser();

  return (
    <Box
      display="flex"
      height="100%"
      pt={user?.actingAsPatient ? "5x" : undefined}
    >
      <Box display={{ xs: "none", md: "block" }}>
        <SavedLocationNavigation />
      </Box>
      <Box flex="1">
        <Box mx="auto" px="4x" py="3x" style={{ maxWidth: "600px" }}>
          <Box display={{ md: "none" }} mb="2x">
            <Link href="/settings/saved-locations" className={settingsBack}>
              <AccessibleIcon icon={<MdChevronLeft size={20} />} />
              {t("Back to Locations")}
            </Link>
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export { SavedLocationLayout };
