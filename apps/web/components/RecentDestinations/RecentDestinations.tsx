import { MdChevronRight } from "react-icons/md";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";
import { useRecentDestinations } from "hooks/useRecentDestinations";
import { recentDestinationCard } from "./RecentDestinations.css";
import { Location } from "models/Location";
import { useTranslation } from "react-i18next";
import { shortenAddressSuffix } from "utils/formatRide";

interface RecentDestinationsProps {
  onScheduleAgain: (location: Location) => void;
}

const RecentDestinations = ({ onScheduleAgain }: RecentDestinationsProps) => {
  const { data: recentDestinations } = useRecentDestinations({ count: 3 });
  const { t } = useTranslation("home");

  if (!recentDestinations || !recentDestinations.length) return null;

  return (
    <Box py="2x" display="flex" flexDirection="column" gap="2x">
      <Box px="2x" as="h6" mb="0x" color="muted" fontWeight="xbold">
        {t("RecentDestinations")}
      </Box>
      {recentDestinations.map((recentDestination) => {
        return (
          <Box
            as="button"
            data-automation-hook="schedule-recent-destination-button"
            className={recentDestinationCard}
            key={recentDestination.address}
            onClick={() => onScheduleAgain(recentDestination)}
          >
            <Box>
              <Box fontSize="md" fontWeight="xbold">
                {shortenAddressSuffix(recentDestination.address)}
              </Box>
              <Box fontSize="sm" color="muted" lineHeight="dense">
                {recentDestination.city}, {recentDestination.state}{" "}
                {recentDestination.postalCode}
              </Box>
            </Box>

            <AccessibleIcon
              label={t("RecentDestinationLabel", {
                address: recentDestination.address,
              })}
              icon={<MdChevronRight size={24} />}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export { RecentDestinations };
