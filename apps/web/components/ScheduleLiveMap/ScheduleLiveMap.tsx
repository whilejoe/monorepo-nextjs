import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation, Trans } from "react-i18next";
import { MdArrowBack, MdOutlineClose } from "react-icons/md";
import { toCalendarDate, parseAbsoluteToLocal } from "@internationalized/date";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";
import { Loading } from "ui/components/Loading";
import { Button } from "ui/components/Button";
import { Drawer, Close } from "ui/components/Drawer";
import { Toast } from "ui/components/Toast";
import { UpcomingRides } from "components/UpcomingRides";
import { ScheduleRide, TripForm } from "components/ScheduleRide";
import { Map, Marker } from "components/Map";
import { Card } from "components/Card";
import { LocationSearchValue } from "components/LocationSearch";
import { useMediaQuery } from "ui/hooks/useMediaQuery";
import { useUser } from "hooks/useUser";
import { useNextRide } from "hooks/useUpcomingRides";
import { useNewTrip } from "hooks/useNewTrip";
import { useDeleteOrUpdateTrip } from "hooks/useDeleteTrip";
import { getLocation, formatAddressFromLocation } from "utils/getLocation";
import { destinationsToArray } from "utils/destinationsToArray";
import { joinAppointmentDateTime } from "utils/joinAppointmentDateTime";
import { Location } from "models/Location";
import { Trip } from "models/Trip";
import { useTripReasons } from "hooks/useTripReasons";
import { useLevelsOfService } from "hooks/useLevelsOfService";

import {
  desktopCard,
  desktopHeading,
  footer,
  mapContainer,
  mobileContent,
  scheduleDrawer,
  scheduleDrawerClose,
  viewContainer,
} from "./ScheduleLiveMap.css";

const ScheduleLiveMap = () => {
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
  const [endingLocation, setEndingLocation] = useState<Location | null>(null);
  const [reschedulingTrip, setReschedulingTrip] = useState<Trip | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [scheduleError, setScheduleError] = useState(false);
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false);
  const [rescheduleError, setRescheduleError] = useState(false);
  const [amPm, setAmPm] = useState("AM");
  const { data: user } = useUser();
  const { data: nextRide } = useNextRide();
  const newTripMutation = useNewTrip();
  const updateTripMutation = useDeleteOrUpdateTrip();
  const { t } = useTranslation("home");
  const { t: common } = useTranslation("common");
  const isDesktop = useMediaQuery("md");
  const isRescheduleMode = reschedulingTrip !== null;

  const { data: tripReasons } = useTripReasons();
  const { data: levelsOfService } = useLevelsOfService();

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

  const handleOnOpenChange = useCallback(
    (open: boolean) => {
      setIsDrawerOpen(open);
      // Closing drawer - reset state
      if (!open) {
        formReturn.reset();
        setReschedulingTrip(null);
        setStartingLocation(null);
        setEndingLocation(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formReturn.formState.isDirty, formReturn.reset]
  );

  const resetAllFormData = useCallback(() => {
    formReturn.reset();

    setAmPm("AM");
    setReschedulingTrip(null);
    setStartingLocation(null);
    setEndingLocation(null);
  }, [formReturn]);

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
            resetAllFormData();
          },
          onError: (error) => setScheduleError(true),
        }
      );
    },
    [amPm, resetAllFormData, newTripMutation, startingLocation, endingLocation]
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

  const handleSubmitReschedule = () => {
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
          resetAllFormData();
        },
        onError: () => setRescheduleError(true),
      }
    );
  };

  useEffect(() => {
    // Close mobile form
    if (isDesktop && isDrawerOpen) {
      handleOnOpenChange(false);
    }
  }, [isDesktop, isDrawerOpen, handleOnOpenChange]);

  // Use patient name when acting as a caregiver, otherwise user name
  const name = user?.actingAsPatient
    ? user.actingAsPatient.firstName
    : user?.firstName;

  return (
    <>
      <div className={viewContainer}>
        <div className={mapContainer}>
          <Map
            id="schedule-ride-map"
            offsetX={isDesktop ? -10 : undefined}
            offsetY={isDesktop ? 80 : -20}
            centerLatitude={
              endingLocation?.latitude || nextRide?.endingLocation.latitude
            }
            centerLongitude={
              endingLocation?.longitude || nextRide?.endingLocation.longitude
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
                    location: endingLocation.address,
                  }
                )}
                position={{
                  lat: endingLocation.latitude,
                  lng: endingLocation.longitude,
                }}
                zIndex={1}
              />
            )}
            {nextRide && (
              <Marker
                kind="next"
                labelText={t("NextRideMarker", {
                  location: nextRide.endingLocation.address,
                })}
                position={{
                  lat: nextRide.endingLocation.latitude,
                  lng: nextRide.endingLocation.longitude,
                }}
                zIndex={0}
              />
            )}
          </Map>
        </div>
        {/* Desktop Only */}
        {isDesktop && (
          <>
            <Card
              className={desktopCard}
              pb="0x"
              style={{
                flexBasis: "clamp(32ch, 33.333%, 425px)",
              }}
            >
              <Box display="flex" gap="2x" justify="space-between">
                <h2 className={desktopHeading}>
                  <Trans
                    i18nKey="home:WhereToName"
                    values={{
                      name,
                    }}
                  />
                </h2>
                {(isRescheduleMode || formReturn.formState.isDirty) && (
                  <Button
                    data-automation-hook="schedule-ride-reset-form"
                    kind="muted"
                    onClick={() => {
                      formReturn.reset();
                      setReschedulingTrip(null);
                      setStartingLocation(null);
                      setEndingLocation(null);
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
                amPm={amPm}
                onSelectAmPm={setAmPm}
                caregiverFullAccess={user?.caregiverFullAccess}
                closeDrawer={handleOnOpenChange}
                isDesktop
                isRescheduleMode={isRescheduleMode}
                onSelectStart={handleOnSelectStart}
                onSelectEnd={handleOnSelectEnd}
                onSubmit={
                  isRescheduleMode
                    ? handleSubmitReschedule
                    : handleSubmitSchedule
                }
              />
            </Card>
            <Card
              className={desktopCard}
              style={{
                flexBasis: "clamp(31ch, 33.333%, 380px)",
              }}
            >
              <h2 className={desktopHeading}>{t("UpcomingRidesHeader")}</h2>
              <UpcomingRides dense onReschedule={handleReschedule} />
            </Card>
            <Loading
              show={newTripMutation.isLoading || updateTripMutation.isLoading}
            />
          </>
        )}
        {/* Mobile Only */}
        {!isDesktop && (
          <>
            <div className={mobileContent} style={{ minHeight: 280 }}>
              <h2>{t("UpcomingRidesHeader")}</h2>
              <UpcomingRides onReschedule={handleReschedule} />
            </div>
            <div className={footer}>
              <Drawer
                align="bottom"
                className={scheduleDrawer}
                hideCloseButton
                hideTitle
                onOpenChange={handleOnOpenChange}
                open={isDrawerOpen}
                title={t("ScheduleRide")}
                trigger={
                  <Button disabled={!user?.caregiverFullAccess} full size="lg">
                    {t("ScheduleRide")}
                  </Button>
                }
              >
                <Close asChild>
                  <Button
                    className={scheduleDrawerClose}
                    data-automation-hook="schedule-ride-close-button"
                    kind="text"
                    priority={3}
                    round
                    size="lg"
                  >
                    <AccessibleIcon
                      label={t("CloseScheduleRide")}
                      icon={<MdArrowBack size={24} />}
                    />
                  </Button>
                </Close>
                <div className={mapContainer}>
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
                            location: endingLocation.address,
                          }
                        )}
                        position={{
                          lat: endingLocation.latitude,
                          lng: endingLocation.longitude,
                        }}
                      />
                    )}
                  </Map>
                </div>
                <div className={mobileContent} style={{ paddingBottom: 0 }}>
                  <ScheduleRide
                    amPm={amPm}
                    onSelectAmPm={setAmPm}
                    {...formReturn}
                    caregiverFullAccess={user?.caregiverFullAccess}
                    closeDrawer={handleOnOpenChange}
                    isRescheduleMode={isRescheduleMode}
                    onSelectStart={handleOnSelectStart}
                    onSelectEnd={handleOnSelectEnd}
                    onSubmit={
                      isRescheduleMode
                        ? handleSubmitReschedule
                        : handleSubmitSchedule
                    }
                  />
                </div>
                <Loading
                  show={
                    newTripMutation.isLoading || updateTripMutation.isLoading
                  }
                />
              </Drawer>
            </div>
          </>
        )}
      </div>
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

export { ScheduleLiveMap };
