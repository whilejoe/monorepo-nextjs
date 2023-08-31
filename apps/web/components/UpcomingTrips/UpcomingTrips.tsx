import { MdMoreHoriz } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "ui/components/Popover";
import { Box } from "ui/components/Box";
import { Button } from "ui/components/Button";
import { RideDetail, RideDetailProps } from "components/RideDetail";
import { CancelRide } from "components/CancelRide";
import { RideListCard } from "components/RideListCard";
import { useUser } from "hooks/useUser";
import { Trip } from "models/Trip";

type UpcomingTripProps = Pick<RideDetailProps, "dense"> & {
  onReschedule: (trip: Trip) => void;
  trips: Trip[] | undefined;
  className?: string;
};

const UpcomingTrips = ({
  className,
  dense,
  trips,
  onReschedule,
}: UpcomingTripProps) => {
  const { data: user } = useUser();
  const { t } = useTranslation("home");

  return (
    <>
      {trips && trips.length > 0 && (
        <Box
          className={className}
          display="flex"
          flexDirection="column"
          gap="2x"
          py="3x"
        >
          {trips?.map((trip) => {
            return (
              <RideListCard
                key={trip.id}
                align="center"
                justify="space-between"
                dense={dense}
              >
                <RideDetail
                  dense={dense}
                  endAddress={trip.rides[0].endingLocationAddressDisplay}
                  pickupDay={trip.rides[0].pickupDayDisplay}
                  pickupDayOfWeek={trip.rides[0].pickupDayOfWeekDisplay}
                  pickupMonth={trip.rides[0].pickupMonthDisplay}
                  pickupTime={trip.rides[0].pickupTimeDisplay}
                  startAddress={trip.rides[0].startingLocationAddressDisplay}
                  truncate
                />
                {user?.caregiverFullAccess && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Box
                        as="button"
                        color="primary"
                        data-automation-hook="ride-options-toggle-menu"
                      >
                        <AccessibleIcon
                          label="Show ride options"
                          icon={<MdMoreHoriz size={dense ? 22 : 26} />}
                        />
                      </Box>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      sideOffset={10}
                      style={{ minWidth: 180 }}
                    >
                      <Box display="flex" flexDirection="column" gap="2x">
                        <CancelRide
                          endAddress={
                            trip.rides[0].endingLocationAddressDisplay
                          }
                          pickupDay={trip.rides[0].pickupDayDisplay}
                          pickupDayOfWeek={trip.rides[0].pickupDayOfWeekDisplay}
                          pickupMonth={trip.rides[0].pickupMonthDisplay}
                          pickupTime={trip.rides[0].pickupTimeDisplay}
                          startAddress={
                            trip.rides[0].startingLocationAddressDisplay
                          }
                          trigger={
                            <Button
                              data-automation-hook="upcoming-ride-cancel-button"
                              disableAnimations
                              full
                              priority={2}
                              size={dense ? "sm" : "md"}
                            >
                              {t("Cancel")}
                            </Button>
                          }
                          tripId={trip.id}
                        />
                        <PopoverClose asChild>
                          <Button
                            data-automation-hook="upcoming-ride-reschedule-button"
                            disableAnimations
                            full
                            onClick={() => onReschedule(trip)}
                            priority={2}
                            size={dense ? "sm" : "md"}
                          >
                            {t("Reschedule")}
                          </Button>
                        </PopoverClose>
                      </Box>
                    </PopoverContent>
                  </Popover>
                )}
              </RideListCard>
            );
          })}
        </Box>
      )}
    </>
  );
};

export { UpcomingTrips };
