import { SettingsNavigation } from "components/SettingsNavigation";
import { settingsBack } from "components/SettingsNavigation/SettingsNavigation.css";
import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <Box display="flex" height="100%">
      <Box display={{ xs: "none", md: "block" }}>
        <SettingsNavigation />
      </Box>
      <Box flex="1" p="containerX">
        <Box display={{ md: "none" }}>
          <Link href="/settings/" className={settingsBack}>
            <AccessibleIcon label="Back" icon={<MdChevronLeft size={20} />} />
            Back
          </Link>
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export { SettingsLayout };
