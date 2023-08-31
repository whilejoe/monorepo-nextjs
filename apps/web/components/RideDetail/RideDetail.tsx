import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import { IoMdCar, IoMdPin } from "react-icons/io";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";
import { clampLine } from "ui/styles/utils.css";

export interface RideDetailProps {
  calendarView?: boolean;
  dense?: boolean;
  levelOfService?: string;
  pickupDay: string;
  pickupDayOfWeek: string;
  pickupMonth: string;
  pickupTime: string;
  showPickupDetails?: boolean;
  startAddress: string;
  truncate?: boolean;
  endAddress: string;
}

const RideDetail = ({
  calendarView,
  dense,
  levelOfService,
  pickupDay,
  pickupDayOfWeek,
  pickupMonth,
  pickupTime,
  showPickupDetails = false,
  startAddress,
  truncate = false,
  endAddress,
}: RideDetailProps) => {
  const { t } = useTranslation("home");
  if (calendarView) {
    return (
      <>
        <Box display="flex" gap="2x" mb={dense ? "2x" : "3x"}>
          <Box as="span" color="muted">
            <AccessibleIcon
              label={t("Destination")}
              icon={<IoMdPin size={26} />}
            />
          </Box>
          <Box lineHeight="dense">
            <Box fontSize="sm" fontWeight="xbold">
              {endAddress}
            </Box>
            <Box fontSize="xs" fontWeight="bold" color="primary">
              <Trans
                i18nKey="home:PickupAtTime"
                values={{ time: pickupTime.toLowerCase() }}
              ></Trans>
            </Box>
          </Box>
        </Box>
        <Box display="flex" gap="2x">
          <Box as="span" color="muted">
            <AccessibleIcon label={t("Pickup")} icon={<IoMdCar size={26} />} />
          </Box>
          <Box lineHeight="dense">
            <Box fontSize="sm" fontWeight="xbold">
              {startAddress}
            </Box>
            <Box fontSize={dense ? "xxs" : "xs"} color="muted">
              Please be ready 60 min before appointment
            </Box>
            {levelOfService && (
              <Box fontSize="xxs" color="muted">
                {levelOfService}
              </Box>
            )}
          </Box>
        </Box>
      </>
    );
  }
  return (
    <Box display="flex" alignItems="center" gap={dense ? "2.5x" : "3x"}>
      <Box display="flex" flexDirection="column" align="center">
        <Box as="span" fontSize="xs" fontWeight="bold" lineHeight="1" mb="1x">
          {pickupDayOfWeek.substring(0, 3)}
        </Box>
        <Box
          as="span"
          fontSize={dense ? "sm" : "md"}
          fontWeight="xbold"
          lineHeight="1"
          style={{ marginBottom: 2 }}
        >
          {pickupDay}
        </Box>
        <Box
          as="span"
          fontSize={dense ? "xs" : "sm"}
          fontWeight="bold"
          lineHeight="1"
        >
          {pickupMonth}
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        style={{ wordBreak: truncate ? "break-all" : undefined }}
      >
        <Box
          as="span"
          className={truncate ? clampLine : undefined}
          fontWeight="xbold"
          lineHeight="heading"
          fontSize={dense ? "sm" : "md"}
          style={{ marginBottom: 3 }}
        >
          {endAddress}
        </Box>
        <Box as="span" fontSize={dense ? "xs" : "sm"} lineHeight="dense">
          {showPickupDetails ? (
            <Trans
              i18nKey="home:PickUpAt"
              values={{
                time: pickupTime.toLowerCase(),
                location: startAddress,
              }}
              components={{
                c: <Box as="span" color="primary" />,
              }}
            />
          ) : (
            t("PickupAtTime", { time: pickupTime.toLowerCase() })
          )}
        </Box>
      </Box>
    </Box>
  );
};

export { RideDetail };
