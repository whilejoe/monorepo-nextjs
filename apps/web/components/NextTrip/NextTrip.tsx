import { Box } from "ui/components/Box";
import { Button } from "ui/components/Button";
import { Card } from "components/Card";
import { RideDetail } from "components/RideDetail";
import { CancelRide } from "components/CancelRide";
import { useUser } from "hooks/useUser";
import { useTranslation } from "react-i18next";
import { DateBadge } from "components/DateBadge";
import { rideStatus } from "constants/rideStatus";
import { RideStatusBadge } from "components/RideStatusBadge";
import { Trip } from "models/Trip";

interface NextTripDesktopProps {
  onReschedule: (trip: Trip) => void;
  trip: Trip;
}

const NextTrip = ({ onReschedule, trip }: NextTripDesktopProps) => {
  const { data: user } = useUser();
  const { t } = useTranslation("home");

  return (
    <>
      {trip && (
        <Card
          dense
          p="0x"
          overflow="hidden"
          style={{ maxWidth: "350px" }}
          mx="auto"
        >
          <Box
            backgroundColor="primary"
            fontSize="xs"
            py="1x"
            px="2.5x"
            color="background"
          >
            {trip?.levelOfService}
          </Box>
          <Box
            pt="2x"
            mb="1x"
            fontSize="xs"
            fontWeight="xbold"
            color="muted"
            display="flex"
            justifyContent={trip.tripNumber == 0 ? "flex-end" : "space-between"}
            px="3x"
          >
            {trip.tripNumber !== 0 && <Box>Trip ID:{trip.tripNumber}</Box>}
            <RideStatusBadge
              priority={rideStatus[trip.rides[0].status][1]}
              status={rideStatus[trip.rides[0].status][0]}
            />
          </Box>
          <Box px="3x" pb="2.5x">
            <Box display="flex" gap="3x">
              <DateBadge
                day={trip.rides[0].pickupDayDisplay}
                dayOfWeek={trip.rides[0].pickupDayOfWeekDisplay}
                month={trip.rides[0].pickupMonthDisplay}
              />
              <Box>
                <RideDetail
                  calendarView
                  dense
                  endAddress={trip.rides[0].endingLocationAddressDisplay}
                  pickupDay={trip.rides[0].pickupDayDisplay}
                  pickupDayOfWeek={trip.rides[0].pickupDayOfWeekDisplay}
                  pickupMonth={trip.rides[0].pickupMonthDisplay}
                  pickupTime={trip.rides[0].pickupTimeDisplay}
                  showPickupDetails
                  startAddress={trip.rides[0].startingLocationAddressDisplay}
                />
              </Box>
            </Box>
          </Box>
          <Box border="global" mb="2.5x" mt="1x" mx="3x" />
          {user?.caregiverFullAccess && (
            <Box
              display="flex"
              gap="4x"
              pb="2.5x"
              px="3x"
              justifyContent="center"
            >
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
                  >
                    {t("Cancel")}
                  </Button>
                }
                tripId={trip.id}
              />
              <Button
                data-automation-hook="next-ride-reschedule-ride-button"
                priority={2}
                onClick={() => onReschedule(trip)}
              >
                {t("Reschedule")}
              </Button>
            </Box>
          )}
        </Card>
      )}
    </>
  );
};

export { NextTrip };
