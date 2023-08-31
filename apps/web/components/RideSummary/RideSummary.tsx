import { RideDetail } from "components/RideDetail";
import { drawer } from "components/Rides/Rides.css";
import { mapContainer, mobileContent } from "components/Schedule/Schedule.css";
import { Trip } from "models/Trip";
import { Suspense, useCallback, useState } from "react";
import { MdChevronRight, MdOutlineClose } from "react-icons/md";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";
import { Button } from "ui/components/Button";
import { Close, Drawer } from "ui/components/Drawer";
import { Loading } from "ui/components/Loading";
import { formatRideDateTime } from "utils/formatRide";
import { Map, Marker } from "components/Map";
import { useMediaQuery } from "ui/hooks/useMediaQuery";
import { detailContainer } from "components/RideListCard/RideListCard.css";
import { AppointmentDetails } from "components/AppointmentDetails";
import { useTranslation } from "react-i18next";

interface RideSummaryProps {
  trip: Trip;
}

const RideSummary = ({ trip }: RideSummaryProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lat, setLat] = useState(trip.rides[0].startingLocation.latitude);
  const [lng, setLng] = useState(trip.rides[0].startingLocation.longitude);
  const { t } = useTranslation("rides");

  const isDesktop = useMediaQuery("md");

  const handleOnOpenChange = useCallback(
    (open: boolean) => {
      setIsDrawerOpen(open);

      // Closing drawer - reset state
      if (!open) {
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Drawer
      align="bottom"
      className={drawer}
      hideCloseButton
      hideTitle
      onOpenChange={handleOnOpenChange}
      open={isDrawerOpen}
      title="Ride"
      trigger={
        <Box
          className={detailContainer}
          display="flex"
          gap="2.5x"
          fontSize="xs"
          mb="2x"
          justifyContent="space-between"
        >
          <RideDetail
            pickupDayOfWeek={
              formatRideDateTime(trip.rides[0].pickupDateTime).dayOfWeek
            }
            pickupDay={formatRideDateTime(trip.rides[0].pickupDateTime).day}
            pickupMonth={formatRideDateTime(trip.rides[0].pickupDateTime).month}
            pickupTime={formatRideDateTime(trip.rides[0].pickupDateTime).time}
            startAddress={trip.rides[0].startingLocation.address}
            endAddress={trip.rides[0].endingLocation.address}
          />
          <Button
            data-automation-hook="view-caregiver-details-button"
            priority={2}
            round
            size="sm"
          >
            <AccessibleIcon
              label={t("SelectRideLabel")}
              icon={<MdChevronRight size={18} />}
            />
          </Button>
        </Box>
      }
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="2x"
        my="2x"
        px="containerX"
        textTransform="uppercase"
      >
        {t("RideDetails")}
        <Close asChild>
          <Button
            data-automation-hook="schedule-ride-close-button"
            kind="text"
            round
            priority={3}
          >
            <AccessibleIcon
              label={t("CloseRideDetails")}
              icon={<MdOutlineClose size={17} />}
            />
          </Button>
        </Close>
      </Box>
      <div className={mobileContent}>
        <div className={mapContainer}>
          <Suspense fallback={<Loading show />}>
            <Map
              id="schedule-ride-map"
              offsetX={isDesktop ? -10 : undefined}
              offsetY={isDesktop ? 80 : -30}
              centerLatitude={lat}
              centerLongitude={lng}
            >
              <Marker
                kind="current"
                labelText={trip.rides[0].endingLocation.address}
                position={{
                  lat: lat,
                  lng: lng,
                }}
                zIndex={1}
              ></Marker>
            </Map>
          </Suspense>
        </div>

        <AppointmentDetails trip={trip} />
      </div>
    </Drawer>
  );
};

export { RideSummary };
