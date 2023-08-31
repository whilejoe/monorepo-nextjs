import { Box } from "ui/components/Box";
import { DateBadge } from "components/DateBadge";
import { Button } from "ui/components/Button";
import { RideDetail } from "components/RideDetail";
import { CancelRide } from "components/CancelRide";
import { useUser } from "hooks/useUser";
import { useTranslation } from "react-i18next";
import { rideStatus } from "constants/rideStatus";
import { RideStatusBadge } from "components/RideStatusBadge";
import { Trip } from "models/Trip";

interface NextTripDesktopProps {
  onReschedule: (trip: Trip) => void;
  trip: Trip;
}

const NextTripDesktop = ({ onReschedule, trip }: NextTripDesktopProps) => {
  const { data: user } = useUser();
  const { t } = useTranslation("home");

  return (
    <>
      {trip && (
        <div>
          <Box as="h2" mb="1x" fontSize="lg" color="muted">
            {t("NextRideHeader")}
          </Box>
          <Box
            display="flex"
            justifyContent={trip.tripNumber == 0 ? "flex-end" : "space-between"}
            mb="2x"
            alignItems="center"
            fontSize="xs"
            fontWeight="xbold"
            color="muted"
          >
            {trip.tripNumber !== 0 && <Box>Trip ID:{trip.tripNumber}</Box>}
            <RideStatusBadge
              priority={rideStatus[trip.rides[0].status][1]}
              status={rideStatus[trip.rides[0].status][0]}
            />
          </Box>
          <Box display="flex" gap="3x">
            <DateBadge
              dense
              day={trip.rides[0].pickupDayDisplay}
              dayOfWeek={trip.rides[0].pickupDayOfWeekDisplay}
              month={trip.rides[0].pickupMonthDisplay}
            />
            <Box style={{ width: "220px" }}>
              <RideDetail
                calendarView
                dense
                endAddress={trip.rides[0].endingLocationAddressDisplay}
                levelOfService={trip.levelOfService}
                pickupDay={trip.rides[0].pickupDayDisplay}
                pickupDayOfWeek={trip.rides[0].pickupDayOfWeekDisplay}
                pickupMonth={trip.rides[0].pickupMonthDisplay}
                pickupTime={trip.rides[0].pickupTimeDisplay}
                showPickupDetails
                startAddress={trip.rides[0].startingLocationAddressDisplay}
              />
            </Box>
          </Box>

          {user?.caregiverFullAccess && (
            <Box display="flex" gap="3x" mt="3x">
              <CancelRide
                endAddress={trip.rides[0].endingLocationAddressDisplay}
                pickupDay={trip.rides[0].pickupDayDisplay}
                pickupDayOfWeek={trip.rides[0].pickupDayOfWeekDisplay}
                pickupMonth={trip.rides[0].pickupMonthDisplay}
                pickupTime={trip.rides[0].pickupTimeDisplay}
                startAddress={trip.rides[0].startingLocationAddressDisplay}
                trigger={
                  <Button
                    data-automation-hook="next-ride-cancel-button"
                    priority={2}
                    size="sm"
                  >
                    {t("Cancel")}
                  </Button>
                }
                tripId={trip.id}
              />
              <Button
                data-automation-hook="next-ride-reschedule-ride-button"
                priority={2}
                size="sm"
                onClick={() => onReschedule(trip)}
              >
                {t("Reschedule")}
              </Button>
            </Box>
          )}
        </div>
      )}
    </>
  );
};

export { NextTripDesktop };
