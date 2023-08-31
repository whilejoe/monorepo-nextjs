import { RideDetail } from "components/RideDetail";
import { RideListCard } from "components/RideListCard";
import { RideSummary } from "components/RideSummary";
import { useTrips } from "hooks/useTrips";
import React, { Suspense, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";
import { Button } from "ui/components/Button";
import { Loading } from "ui/components/Loading";
import { useMediaQuery } from "ui/hooks/useMediaQuery";
import { formatRideDateTime } from "utils/formatRide";
import {
  activeCard,
  activeTab,
  appointmentDetailsContainer,
  detailsContainer,
  inactiveTab,
} from "./Rides.css";
import { Card } from "components/Card";
import { AppointmentDetails } from "components/AppointmentDetails";
import { mapContainer, viewContainer } from "components/Schedule/Schedule.css";
import { Map, Marker } from "components/Map";
import { useTranslation } from "react-i18next";
import { Trip } from "models/Trip";
import { useUser } from "hooks/useUser";

const startDate = new Date().toISOString();
const endDate = new Date().toISOString();

const Rides = () => {
  const [isPastTrips, setIsPastTrips] = useState(false);
  const { t } = useTranslation("rides");
  const { data: user } = useUser();

  const { data, hasNextPage, fetchNextPage } = useTrips({
    startDate: !isPastTrips ? startDate : undefined,
    endDate: isPastTrips ? endDate : undefined,
  });
  const isDesktop = useMediaQuery("md");
  const isLarge = useMediaQuery("lg");

  const [selectedRide, setSelectedRide] = useState<Trip>();

  return (
    <Box className={viewContainer}>
      <Card
        pt={user?.actingAsPatient ? "6x" : undefined}
        style={{
          width: isDesktop ? "380px" : "100%",
          height: "calc(100%)",
          overflowY: "auto",
        }}
      >
        <Box display="flex" gap="4x" mb="3x">
          <button
            role="tab"
            onClick={() => setIsPastTrips(false)}
            className={!isPastTrips ? activeTab : inactiveTab}
          >
            {t("Upcoming")}
          </button>
          <button
            role="tab"
            onClick={() => setIsPastTrips(true)}
            className={isPastTrips ? activeTab : inactiveTab}
          >
            {t("Past")}
          </button>
        </Box>

        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.items.length === 0 && (
              <Box color="muted" mt="4x" display="flex" justifyContent="center">
                {isPastTrips ? t("NoPastRides") : t("NoUpcomingRides")}
              </Box>
            )}
            {page.items.map((trip) => (
              <Box key={trip.id}>
                {!isDesktop && <RideSummary trip={trip} />}
                {isDesktop && (
                  <Box
                    onClick={() => {
                      setSelectedRide(trip);
                    }}
                  >
                    <RideListCard
                      className={selectedRide?.id === trip.id ? activeCard : ""}
                      key={trip.rides[0].id}
                      fontSize="xs"
                      mb="2x"
                      justifyContent="space-between"
                    >
                      <RideDetail
                        dense
                        pickupDayOfWeek={
                          formatRideDateTime(trip.rides[0].pickupDateTime)
                            .dayOfWeek
                        }
                        pickupDay={
                          formatRideDateTime(trip.rides[0].pickupDateTime).day
                        }
                        pickupMonth={
                          formatRideDateTime(trip.rides[0].pickupDateTime).month
                        }
                        pickupTime={
                          formatRideDateTime(trip.rides[0].pickupDateTime).time
                        }
                        startAddress={trip.rides[0].startingLocation.address}
                        endAddress={trip.rides[0].endingLocation.address}
                      />
                      <Button
                        data-automation-hook="view-ride-details-button"
                        priority={2}
                        round
                        size="sm"
                      >
                        <AccessibleIcon
                          label={t("SelectRideLabel")}
                          icon={<MdChevronRight size={18} />}
                        />
                      </Button>
                    </RideListCard>
                  </Box>
                )}
              </Box>
            ))}
          </React.Fragment>
        ))}

        {hasNextPage && (
          <Box display="flex" justifyContent="center">
            <Button priority={3} onClick={() => fetchNextPage()}>
              {t("ShowMore")}
            </Button>
          </Box>
        )}
      </Card>
      {isDesktop && (
        <Card flex="1" style={{ height: "calc(100%)", overflowY: "auto" }}>
          {selectedRide && (
            <Box className={detailsContainer}>
              <Box className={appointmentDetailsContainer}>
                <AppointmentDetails trip={selectedRide!} />
              </Box>
              <Box flex="1">
                <Box className={mapContainer} style={{ marginBottom: 0 }}>
                  <Suspense fallback={<Loading show />}>
                    <Map
                      style={{ minHeight: "200px" }}
                      id="schedule-ride-map"
                      offsetX={isLarge ? -10 : undefined}
                      offsetY={isLarge ? 80 : -20}
                      centerLatitude={
                        selectedRide?.rides[0].endingLocation.latitude
                      }
                      centerLongitude={
                        selectedRide?.rides[0].endingLocation.longitude
                      }
                    >
                      {selectedRide && (
                        <Marker
                          kind="current"
                          position={{
                            lat: selectedRide.rides[0].endingLocation.latitude,
                            lng: selectedRide!.rides[0].endingLocation
                              .longitude,
                          }}
                          labelText={
                            selectedRide.rides[0].endingLocation.address
                          }
                          zIndex={1}
                        />
                      )}
                    </Map>
                  </Suspense>
                </Box>
              </Box>
            </Box>
          )}
          {!selectedRide && (
            <Box
              style={{ width: "100%", height: "100%" }}
              color="muted"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box style={{ width: "300px" }}>{t("NoRideSelectionText")}</Box>
            </Box>
          )}
        </Card>
      )}
    </Box>
  );
};

export { Rides };
