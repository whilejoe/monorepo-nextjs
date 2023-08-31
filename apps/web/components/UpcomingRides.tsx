import { MdMoreHoriz } from "react-icons/md";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Popover, PopoverContent, PopoverTrigger } from "ui/components/Popover";
import { Box } from "ui/components/Box";
import { Button } from "ui/components/Button";
import { RideDetail, RideDetailProps } from "components/RideDetail";
import { CancelRide, CancelRideProps } from "components/CancelRide";
import { RideListCard } from "components/RideListCard";
import { useUpcomingTrips } from "hooks/useUpcomingTrips";
import { useUser } from "hooks/useUser";
import { Trip } from "models/Trip";

type UpcomingRidesProps = Pick<RideDetailProps, "dense"> & {
  onReschedule: (trip: Trip) => void;
  className?: string;
};

interface DetailedRideProps extends Omit<CancelRideProps, "trigger"> {
  caregiverFullAccess?: boolean;
  className?: string;
}

const DetailedRide = ({
  caregiverFullAccess = false,
  className,
  dense,
  tripId,
  ...props
}: DetailedRideProps) => {
  return (
    <RideListCard flexDirection="column">
      <RideDetail {...props} dense={dense} />
      {caregiverFullAccess && (
        <Box display="flex" gap="3x">
          <CancelRide
            {...props}
            trigger={
              <Button
                data-automation-hook="next-ride-cancel-button"
                priority={2}
                size={dense ? "sm" : "md"}
              >
                Cancel
              </Button>
            }
            tripId={tripId}
          />
          <Button
            data-automation-hook="next-ride-reschedule-button"
            priority={3}
            size={dense ? "sm" : "md"}
          >
            Reschedule
          </Button>
        </Box>
      )}
    </RideListCard>
  );
};

const UpcomingRides = ({ dense }: UpcomingRidesProps) => {
  const { data: trips } = useUpcomingTrips();
  const { data: user } = useUser();

  return (
    <>
      {trips?.items && trips.items.length > 0 && (
        <Box display="flex" flexDirection="column" gap="3x">
          {trips.items?.map((trip, index) => {
            const ride = trip.rides[0];

            if (index === 0) {
              return (
                <DetailedRide
                  key={ride.id}
                  caregiverFullAccess={user?.caregiverFullAccess}
                  dense={dense}
                  endAddress={ride.endingLocation.address}
                  pickupDay={ride.pickupDayDisplay}
                  pickupDayOfWeek={ride.pickupDayOfWeekDisplay}
                  pickupMonth={ride.pickupMonthDisplay}
                  pickupTime={ride.pickupTimeDisplay}
                  startAddress={ride.startingLocation.address}
                  tripId={ride.tripId}
                />
              );
            }

            return (
              <RideListCard
                key={ride.id}
                align="center"
                justify="space-between"
              >
                <RideDetail
                  dense={dense}
                  endAddress={ride.endingLocation.address}
                  pickupDay={ride.pickupDayDisplay}
                  pickupDayOfWeek={ride.pickupDayOfWeekDisplay}
                  pickupMonth={ride.pickupMonthDisplay}
                  pickupTime={ride.pickupTimeDisplay}
                  startAddress={ride.startingLocation.address}
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
                      <CancelRide
                        endAddress={ride.endingLocation.address}
                        pickupDay={ride.pickupDayDisplay}
                        pickupDayOfWeek={ride.pickupDayOfWeekDisplay}
                        pickupMonth={ride.pickupMonthDisplay}
                        pickupTime={ride.pickupTimeDisplay}
                        startAddress={ride.startingLocation.address}
                        trigger={
                          <Button
                            data-automation-hook="upcoming-ride-cancel-button"
                            disableAnimations
                            full
                            priority={2}
                            size={dense ? "sm" : "md"}
                          >
                            Cancel
                          </Button>
                        }
                        tripId={ride.tripId}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </RideListCard>
            );
          })}
        </Box>
      )}

      {!trips?.items.length && (
        <Box
          as="p"
          mb="0x"
          fontSize={dense ? "xs" : "sm"}
          color="muted"
          lineHeight="dense"
        >
          You currently have no upcoming rides
        </Box>
      )}
    </>
  );
};

export { UpcomingRides };
