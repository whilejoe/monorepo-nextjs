import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toCalendarDate, parseAbsoluteToLocal } from "@internationalized/date";
import { MdOutlineClose, MdSearch } from "react-icons/md";
import { clsx } from "clsx";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";
import { Loading } from "ui/components/Loading";
import { Button } from "ui/components/Button";
import { Drawer, Close } from "ui/components/Drawer";
import { Modal } from "ui/components/Modal";
import { Toast } from "ui/components/Toast";
import { UpcomingTrips } from "components/UpcomingTrips";
import { ScheduleRide, TripForm } from "components/ScheduleRide";
import { Map, Marker } from "components/Map";
import { Card } from "components/Card";
import { LocationSearchValue } from "components/LocationSearch";
import { NextTripDesktop } from "components/NextTripDesktop";
import { NextTrip } from "components/NextTrip";
import { RecentDestinations } from "components/RecentDestinations";
import { RideDetail } from "components/RideDetail";
import { RideListCard } from "components/RideListCard";
import {
  ProgressContainer,
  ProgressLine,
  ProgressStep,
} from "components/Progress";
import { useMediaQuery } from "ui/hooks/useMediaQuery";
import { useUser } from "hooks/useUser";
import { useRecentDestinations } from "hooks/useRecentDestinations";
import { useNewTrip } from "hooks/useNewTrip";
import { useDeleteOrUpdateTrip } from "hooks/useDeleteTrip";
import { getLocation, formatAddressFromLocation } from "utils/getLocation";
import { formatRideDateTime, shortenAddressSuffix } from "utils/formatRide";
import { joinAppointmentDateTime } from "utils/joinAppointmentDateTime";
import { Location } from "models/Location";
import {
  confirmModalHeading,
  desktopCard,
  desktopHeading,
  footer,
  footerStuck,
  mapContainer,
  mobileContent,
  scheduleDrawer,
  scheduleDrawerClose,
  scheduleRecentDrawer,
  searchButton,
  viewContainer,
} from "./Schedule.css";

import { useReturnTrip } from "hooks/useReturnTrip";
import { destinationsToArray } from "utils/destinationsToArray";
import { useUpcomingTrips } from "hooks/useUpcomingTrips";
import { Trip } from "models/Trip";
import { useTripReasons } from "hooks/useTripReasons";
import { useLevelsOfService } from "hooks/useLevelsOfService";

const Schedule = () => {
  const formReturn = useForm<TripForm>({
    defaultValues: {
      pickupDate: null,
      pickupHour: "8",
      pickupMinute: "00",
      levelOfService: "",
      tripReason: "",
      start: null,
      end: null,
    },
  });

  const [startingLocation, setStartingLocation] = useState<Location | null>(
    null
  );

  const [amPm, setAmPm] = useState("AM");
  const [endingLocation, setEndingLocation] = useState<Location | null>(null);
  const [reschedulingTrip, setReschedulingTrip] = useState<Trip | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRecentDrawerOpen, setIsRecentDrawerOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [scheduleError, setScheduleError] = useState(false);
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false);
  const [rescheduleError, setRescheduleError] = useState(false);
  const [nextTrip, setNextTrip] = useState<Trip | undefined>();
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>();

  const { data: user } = useUser();
  const { data: upcomingTripReq } = useUpcomingTrips();
  const { data: recentDestinations } = useRecentDestinations();
  const { data: returnTrip } = useReturnTrip();
  const { data: tripReasons } = useTripReasons();
  const { data: levelsOfService } = useLevelsOfService();

  const newTripMutation = useNewTrip();
  const updateTripMutation = useDeleteOrUpdateTrip();

  const { t } = useTranslation("home");
  const { t: common } = useTranslation("common");

  const isDesktop = useMediaQuery("md");
  const isRescheduleMode = reschedulingTrip !== null;

  useMemo(() => {
    setNextTrip(upcomingTripReq?.items[0]);
    setUpcomingTrips(
      upcomingTripReq?.items.slice(1, upcomingTripReq?.items.length)
    );
  }, [upcomingTripReq?.items]);

  const getRescheduleRideDateTime = () => {
    return formatRideDateTime(
      joinAppointmentDateTime(
        formReturn.getValues("pickupDate"),
        Number(formReturn.getValues("pickupHour")),
        Number(formReturn.getValues("pickupMinute")),
        amPm
      )
    );
  };

  const rescheduleRideDateTime = getRescheduleRideDateTime();

  const handleOnSelectStart = useCallback(
    async (val: LocationSearchValue) => {
      if (val) {
        const location = await getLocation({ address: val });
        setStartingLocation(location);
      } else {
        setStartingLocation(null);
      }
    },
    [setStartingLocation]
  );

  const handleOnSelectEnd = useCallback(
    async (val: LocationSearchValue) => {
      if (val) {
        const location = await getLocation({ address: val });
        setEndingLocation(location);
      } else {
        setEndingLocation(null);
      }
    },
    [setEndingLocation]
  );

  const resetAllFormData = useCallback(() => {
    formReturn.reset();

    setAmPm("AM");
    setReschedulingTrip(null);
    setStartingLocation(null);
    setEndingLocation(null);
  }, [formReturn]);

  const handleOnOpenChange = useCallback(
    (open: boolean) => {
      setIsDrawerOpen(open);

      // Closing drawer - reset state
      if (!open) {
        resetAllFormData();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formReturn.formState.isDirty, formReturn.reset]
  );
  //TODO: Add back once we have default locations
  // const handleSchedule = useCallback(() => {
  //   namedLocations &&
  //     formReturn.setValue(
  //       "start",
  //       formatAddressFromLocation(namedLocations[0])
  //     );
  //   namedLocations && setStartingLocation(namedLocations[0]);
  // }, [formReturn, namedLocations]);

  const handleSubmitSchedule = useCallback(
    (formData: TripForm) => {
      if (!startingLocation || !endingLocation || !formData.pickupDate) return;

      let appointmentTime = "";
      appointmentTime = joinAppointmentDateTime(
        formData.pickupDate,
        Number(formData.pickupHour),
        Number(formData.pickupMinute),
        amPm
      );

      newTripMutation.mutate(
        {
          additionalPassengers: [],
          tripReason: formData.tripReason,
          levelOfService: formData.levelOfService,
          isRoundTrip: true,
          notes: "none",
          rides: destinationsToArray(
            startingLocation,
            endingLocation,
            appointmentTime
          ),
        },
        {
          onSuccess: () => {
            setScheduleSuccess(true);
            setIsDrawerOpen(false);
            setIsRecentDrawerOpen(false);
            resetAllFormData();
          },
          onError: () => setScheduleError(true),
        }
      );
    },
    [amPm, resetAllFormData, newTripMutation, startingLocation, endingLocation]
  );

  const handleSubmitReschedule = useCallback(
    () => setIsConfirmModalOpen(true),
    []
  );

  const handleReschedule = (trip: Trip) => {
    const { startingLocation, endingLocation } = trip.rides[0];

    const date = new Date(trip.rides[0].appointmentDateTime);
    date.setHours(new Date(trip.rides[0].appointmentDateTime).getHours());

    // Ensure clean form state
    formReturn.reset();
    let hour = new Date(trip.rides[0].appointmentDateTime).getHours();

    if (hour >= 12) {
      setAmPm("PM");
      hour = hour - 12;
    } else {
      setAmPm("AM");
    }
    hour = hour === 12 ? 0 : hour;

    const minute = new Date(trip.rides[0].appointmentDateTime).getMinutes();
    date.setMinutes(minute);
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

    const reasonCode = tripReasons?.find(
      (i) => i.name === trip?.tripReason!
    )?.id;

    const los = levelsOfService?.find(
      (i) => i.name === trip?.levelOfService!
    )?.code;

    // Set required fields
    formReturn.setValue(
      "pickupDate",
      toCalendarDate(parseAbsoluteToLocal(trip.rides[0].appointmentDateTime))
    );
    los && formReturn.setValue("levelOfService", los);
    reasonCode && formReturn.setValue("tripReason", reasonCode);
    formReturn.setValue("pickupHour", hour.toString());
    formReturn.setValue("pickupMinute", minute.toString());
    formReturn.setValue("start", formatAddressFromLocation(startingLocation));
    formReturn.setValue("end", formatAddressFromLocation(endingLocation));

    // Set state
    setReschedulingTrip(trip);
    setStartingLocation(startingLocation);
    setEndingLocation(endingLocation);

    if (!isDesktop) setIsDrawerOpen(true);
  };

  const handleRescheduleConfirm = () => {
    const formData = formReturn.getValues();

    if (
      !startingLocation ||
      !endingLocation ||
      !formData.pickupDate ||
      !reschedulingTrip?.id
    ) {
      return;
    }

    let appointmentTime = joinAppointmentDateTime(
      formData.pickupDate,
      Number(formData.pickupHour),
      Number(formData.pickupMinute),
      amPm
    );

    updateTripMutation.mutate(
      {
        additionalPassengers: undefined,
        tripReason: formData.tripReason,
        levelOfService: formData.levelOfService,
        isRoundTrip: true,
        notes: "none",
        id: reschedulingTrip.id,
        rides: destinationsToArray(
          startingLocation,
          endingLocation,
          appointmentTime
        ),
      },
      {
        onSuccess: () => {
          setRescheduleSuccess(true);
          setIsDrawerOpen(false);
          setIsRecentDrawerOpen(false);
          setIsConfirmModalOpen(false);
          resetAllFormData();
        },
        onError: () => setRescheduleError(true),
      }
    );
  };

  const handleScheduleAgain = (location: Location) => {
    // Ensure clean form state
    resetAllFormData();

    // Set required fields
    formReturn.setValue("end", formatAddressFromLocation(location));
    //TODO: replace with default
    // namedLocations &&
    //   formReturn.setValue(
    //     "start",
    //     formatAddressFromLocation(namedLocations[0])
    //   );

    // Set state
    setEndingLocation(location);
    //TODO: add this back if we have a default set
    //namedLocations && setStartingLocation(namedLocations[0]);

    if (!isDesktop) setIsDrawerOpen(true);
  };

  useEffect(() => {
    // Close mobile form
    if (isDesktop && isDrawerOpen) {
      handleOnOpenChange(false);
      setIsConfirmModalOpen(false);
    }
    if (isDesktop && isRecentDrawerOpen) {
      setIsRecentDrawerOpen(false);
    }
  }, [isDesktop, isDrawerOpen, isRecentDrawerOpen, handleOnOpenChange]);

  return (
    <>
      <div className={viewContainer}>
        {!isDesktop && (
          <Box
            position="relative"
            style={{ flex: "0 0 350px" }}
            pt={user?.actingAsPatient ? "5x" : undefined} // Make room for acting as patient banner
          >
            {!returnTrip?.isReturnRideAvailable && (
              <Box
                fontSize="xl"
                fontWeight="xbold"
                textAlign="center"
                pb="1x"
                pt="1x"
              >
                {nextTrip && upcomingTrips?.length == 0 && t("UPCOMINGRIDE")}
                {!nextTrip && upcomingTrips?.length == 0 && t("SCHEDULEARIDE")}
                {upcomingTrips &&
                  upcomingTrips?.length > 0 &&
                  t("UPCOMINGRIDES")}
              </Box>
            )}

            {nextTrip && (
              <Box px="containerX" py="3x">
                <NextTrip trip={nextTrip} onReschedule={handleReschedule} />
              </Box>
            )}
          </Box>
        )}
        {isDesktop && (
          <>
            <Card
              className={desktopCard}
              pt="3x"
              pb="0x"
              style={{
                flexBasis: "clamp(32ch, 33.333%, 425px)",
              }}
            >
              <Box display="flex" gap="2x" justify="space-between">
                <h2 className={desktopHeading}>
                  {isRescheduleMode ? t("Reschedule") : t("Schedule")}
                </h2>
                {(isRescheduleMode || formReturn.formState.isDirty) && (
                  <Button
                    data-automation-hook="schedule-ride-reset-form"
                    kind="muted"
                    onClick={() => {
                      resetAllFormData();
                    }}
                    priority={3}
                    round
                    size="sm"
                  >
                    <AccessibleIcon
                      label={t("Reset")}
                      icon={<MdOutlineClose size={20} />}
                    />
                  </Button>
                )}
              </Box>

              <ScheduleRide
                {...formReturn}
                caregiverFullAccess={user?.caregiverFullAccess}
                closeDrawer={handleOnOpenChange}
                endingLocation={endingLocation}
                isDesktop={isDesktop}
                isRescheduleMode={isRescheduleMode}
                onSelectStart={handleOnSelectStart}
                onSelectEnd={handleOnSelectEnd}
                amPm={amPm}
                onSelectAmPm={setAmPm}
                onSubmit={
                  isRescheduleMode
                    ? handleSubmitReschedule
                    : handleSubmitSchedule
                }
                startingLocation={startingLocation}
              />
              <Loading show={newTripMutation.isLoading} />
            </Card>

            <div className={mapContainer}>
              <Suspense fallback={<Loading show />}>
                <Map
                  id="schedule-ride-map"
                  offsetX={isDesktop ? -10 : undefined}
                  offsetY={isDesktop ? 80 : -20}
                  centerLatitude={
                    endingLocation?.latitude ||
                    nextTrip?.rides[0].endingLocation.latitude
                  }
                  centerLongitude={
                    endingLocation?.longitude ||
                    nextTrip?.rides[0]?.endingLocation.longitude
                  }
                >
                  {endingLocation && (
                    <Marker
                      kind="current"
                      labelText={t(
                        isRescheduleMode
                          ? "RecheduleRideMarker"
                          : "ScheduleRideMarker",
                        {
                          location: shortenAddressSuffix(
                            endingLocation.address
                          ),
                        }
                      )}
                      position={{
                        lat: endingLocation.latitude,
                        lng: endingLocation.longitude,
                      }}
                      zIndex={1}
                    />
                  )}
                  {nextTrip && (
                    <Marker
                      kind="next"
                      labelText={t("NextRideMarker", {
                        location:
                          nextTrip!.rides[0].endingLocationAddressDisplay,
                      })}
                      position={{
                        lat: nextTrip!.rides[0].endingLocation.latitude,
                        lng: nextTrip!.rides[0].endingLocation.longitude,
                      }}
                      zIndex={0}
                    />
                  )}
                </Map>
                {nextTrip && (
                  <Card
                    m="3x"
                    display="flex"
                    flexDirection="column"
                    gap="4x"
                    style={{
                      flexBasis: "clamp(31ch, 33.333%, 380px)",
                      position: "absolute",
                      zIndex: "1",
                      top: 0,
                      right: 0,
                      maxHeight: "85%",
                      overflowY: "auto",
                    }}
                  >
                    <NextTripDesktop
                      trip={nextTrip}
                      onReschedule={handleReschedule}
                    />
                    <UpcomingTrips
                      trips={upcomingTrips}
                      dense
                      onReschedule={handleReschedule}
                    />
                  </Card>
                )}
              </Suspense>
            </div>
          </>
        )}

        {/* Mobile Only */}
        {!isDesktop && (
          <>
            <Box>
              <UpcomingTrips
                className={mobileContent}
                onReschedule={handleReschedule}
                trips={upcomingTrips}
              />
            </Box>
            {user?.caregiverFullAccess && (
              <div
                className={clsx(footer, {
                  [footerStuck]: upcomingTrips && upcomingTrips.length,
                })}
              >
                {nextTrip &&
                  upcomingTrips &&
                  !upcomingTrips.length &&
                  recentDestinations &&
                  !recentDestinations.length && (
                    <Box pt="2.5x" mb="-1x" fontWeight="xbold">
                      {t("SCHEDULEANOTHER")}
                    </Box>
                  )}

                <Box
                  backgroundColor="background"
                  position="sticky"
                  top="0"
                  paddingTop="3x"
                >
                  {upcomingTrips &&
                  upcomingTrips.length > 0 &&
                  recentDestinations &&
                  recentDestinations.length ? (
                    <Drawer
                      align="bottom"
                      className={scheduleRecentDrawer}
                      hideCloseButton
                      hideTitle
                      onOpenChange={setIsRecentDrawerOpen}
                      open={isRecentDrawerOpen}
                      title="Schedule Recent"
                      trigger={
                        <Button
                          disabled={!user?.caregiverFullAccess}
                          full
                          size="lg"
                          className={searchButton}
                          disableAnimations
                        >
                          <Box as="span" color="blue9">
                            <AccessibleIcon icon={<MdSearch size={25} />} />
                          </Box>
                          {t("WhereTo")}
                        </Button>
                      }
                    >
                      <Button
                        disabled={!user?.caregiverFullAccess}
                        full
                        size="lg"
                        className={searchButton}
                        disableAnimations
                        onClick={() => {
                          setIsDrawerOpen(true);
                          // handleSchedule();
                        }}
                      >
                        <Box as="span" color="blue9">
                          <AccessibleIcon icon={<MdSearch size={25} />} />
                        </Box>
                        {t("WhereTo")}
                      </Button>
                      <RecentDestinations
                        onScheduleAgain={handleScheduleAgain}
                      />
                    </Drawer>
                  ) : (
                    !!upcomingTrips?.length && (
                      <Button
                        disabled={!user?.caregiverFullAccess}
                        full
                        size="lg"
                        className={searchButton}
                        disableAnimations
                        onClick={() => setIsDrawerOpen(true)}
                      >
                        <Box as="span" color="blue9">
                          <AccessibleIcon icon={<MdSearch size={25} />} />
                        </Box>
                        {t("WhereTo")}
                      </Button>
                    )
                  )}

                  <Drawer
                    align="bottom"
                    className={scheduleDrawer}
                    hideCloseButton
                    hideTitle
                    onOpenChange={handleOnOpenChange}
                    open={isDrawerOpen}
                    title={t("ScheduleRide")}
                    style={{ overflow: "hidden" }}
                    trigger={
                      upcomingTrips?.length === 0 && (
                        <Button
                          disabled={!user?.caregiverFullAccess}
                          full
                          size="lg"
                          className={searchButton}
                          disableAnimations
                        >
                          <Box as="span" color="blue9">
                            <AccessibleIcon icon={<MdSearch size={25} />} />
                          </Box>
                          {t("WhereTo")}
                        </Button>
                      )
                    }
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      my="2x"
                      px="containerX"
                      textTransform="uppercase"
                    >
                      {isRescheduleMode ? t("Reschedule") : t("SCHEDULE")}
                      <Close asChild>
                        <Button
                          className={scheduleDrawerClose}
                          data-automation-hook="schedule-ride-close-button"
                          kind="text"
                          priority={3}
                          round
                        >
                          <AccessibleIcon
                            label={t("CloseScheduleRide")}
                            icon={<MdOutlineClose size={17} />}
                          />
                        </Button>
                      </Close>
                    </Box>

                    <div className={mobileContent} style={{ paddingBottom: 0 }}>
                      <Box className={mapContainer}>
                        <Suspense fallback={<Loading show />}>
                          <Map
                            id="schedule-ride-map-mobile"
                            offsetY={-20}
                            centerLatitude={endingLocation?.latitude}
                            centerLongitude={endingLocation?.longitude}
                          >
                            {endingLocation && (
                              <Marker
                                kind="current"
                                labelText={t(
                                  isRescheduleMode
                                    ? "RecheduleRideMarker"
                                    : "ScheduleRideMarker",
                                  {
                                    location: shortenAddressSuffix(
                                      endingLocation.address
                                    ),
                                  }
                                )}
                                position={{
                                  lat: endingLocation.latitude,
                                  lng: endingLocation.longitude,
                                }}
                              />
                            )}
                          </Map>
                        </Suspense>
                      </Box>
                      <ScheduleRide
                        amPm={amPm}
                        {...formReturn}
                        caregiverFullAccess={user?.caregiverFullAccess}
                        closeDrawer={() => handleOnOpenChange(false)}
                        endingLocation={endingLocation}
                        isRescheduleMode={isRescheduleMode}
                        onSelectAmPm={setAmPm}
                        onSelectStart={handleOnSelectStart}
                        onSelectEnd={handleOnSelectEnd}
                        onSubmit={
                          isRescheduleMode
                            ? handleSubmitReschedule
                            : handleSubmitSchedule
                        }
                        startingLocation={startingLocation}
                      />
                    </div>
                    <Loading show={newTripMutation.isLoading} />
                  </Drawer>
                </Box>
                {upcomingTrips?.length === 0 && (
                  <RecentDestinations onScheduleAgain={handleScheduleAgain} />
                )}
              </div>
            )}
          </>
        )}
      </div>

      {reschedulingTrip && (
        <Modal
          maxWidth={415}
          onOpenChange={setIsConfirmModalOpen}
          open={isConfirmModalOpen}
          title={t("Reschedule")}
        >
          <>
            <p>{t("ConfirmReschedule")}</p>
            <h2 className={confirmModalHeading}>{t("Old")}</h2>
            <RideListCard style={{ opacity: 0.5 }}>
              <RideDetail
                dense
                endAddress={reschedulingTrip?.rides[0].endingLocation.address}
                pickupDay={reschedulingTrip?.rides[0].pickupDayDisplay}
                pickupDayOfWeek={
                  reschedulingTrip?.rides[0].pickupDayOfWeekDisplay
                }
                pickupMonth={reschedulingTrip?.rides[0].pickupMonthDisplay}
                pickupTime={reschedulingTrip?.rides[0].pickupTimeDisplay}
                showPickupDetails
                startAddress={
                  reschedulingTrip?.rides[0].startingLocation.address
                }
              />
            </RideListCard>

            <ProgressContainer height="7x" mt="1x">
              <ProgressLine active />
              <ProgressStep active size="sm" />
            </ProgressContainer>

            {endingLocation && startingLocation && (
              <Box mt="-4x">
                <h2 className={confirmModalHeading}>{t("New")}</h2>
                <RideListCard>
                  <RideDetail
                    dense
                    endAddress={endingLocation?.address}
                    pickupDay={rescheduleRideDateTime?.day}
                    pickupDayOfWeek={
                      reschedulingTrip?.rides[0].pickupDayOfWeekDisplay
                    }
                    pickupMonth={rescheduleRideDateTime?.month}
                    pickupTime={rescheduleRideDateTime?.time}
                    showPickupDetails
                    startAddress={startingLocation?.address}
                  />
                </RideListCard>
              </Box>
            )}

            <Box
              display="flex"
              flexDirection="column"
              gap="2.5x"
              mt="5x"
              mx="auto"
              style={{ maxWidth: "90%" }}
            >
              <Button onClick={handleRescheduleConfirm} priority={2}>
                {t("ConfirmRescheduleYes")}
              </Button>
              <Button onClick={() => setIsConfirmModalOpen(false)} priority={3}>
                {t("ConfirmRescheduleNo")}
              </Button>
            </Box>
          </>
          <Loading show={updateTripMutation.isLoading} />
        </Modal>
      )}

      <Toast
        description={t("ScheduleRideSuccess")}
        kind="success"
        open={scheduleSuccess}
        setOpen={setScheduleSuccess}
        title={common("Success")}
      />
      <Toast
        description={t("ScheduleRideError")}
        kind="danger"
        open={scheduleError}
        setOpen={setScheduleError}
        title={common("Error")}
      />

      <Toast
        description={t("RescheduleRideSuccess")}
        kind="success"
        open={rescheduleSuccess}
        setOpen={setRescheduleSuccess}
        title={common("Success")}
      />
      <Toast
        description={t("RescheduleRideError")}
        kind="danger"
        open={rescheduleError}
        setOpen={setRescheduleError}
        title={common("Error")}
      />
    </>
  );
};

export { Schedule };
