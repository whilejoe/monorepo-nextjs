import { Card } from "components/Card";
import {
  ProgressContainer,
  ProgressLine,
  ProgressStep,
} from "components/Progress";
import { Trip } from "models/Trip";
import React from "react";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";
import { formatRideDateTime } from "utils/formatRide";
import { FaCarSide } from "react-icons/fa";
import { RideStatusBadge } from "components/RideStatusBadge";
import { rideStatus } from "constants/rideStatus";
import { MdWarning } from "react-icons/md";
import { Trans, useTranslation } from "react-i18next";
import { Table, Td, Th } from "ui/components/Table";

interface AppointmentDetailsProps {
  trip: Trip;
}
const AppointmentDetails = ({ trip }: AppointmentDetailsProps) => {
  const { t } = useTranslation("rides");

  if (!trip) return <></>;
  return (
    <Box display="flex" flexDirection="column" gap="3x">
      <Card dense style={{ padding: "0" }}>
        <Box
          style={{ display: "grid", gridTemplateColumns: "1fr min-content" }}
        >
          <Box padding="3x">
            <Box mb="2x">{t("Appointment")}</Box>
            <Box fontWeight="bold" mb="2x">
              {trip.rides[0].endingLocation.address}
            </Box>
            <Box fontWeight="bold">
              {formatRideDateTime(trip.rides[0].pickupDateTime).dayOfWeek},{" "}
              {formatRideDateTime(trip.rides[0].pickupDateTime).month}{" "}
              {formatRideDateTime(trip.rides[0].pickupDateTime).day}
            </Box>

            <Box color="primary" fontSize="xs" fontWeight="bold">
              <Trans
                i18nKey="home:PickupAtTime"
                values={{
                  time: formatRideDateTime(
                    trip.rides[0].pickupDateTime
                  ).time.toLowerCase(),
                }}
              ></Trans>
            </Box>
          </Box>
          <Box
            backgroundColor="gray4"
            display="flex"
            flexDirection="column"
            align="center"
            justify="center"
            p="3x"
          >
            {rideStatus[trip.rides[0].status][1] === 1 ? (
              <Box color="green10">
                <AccessibleIcon icon={<FaCarSide size={40} />} />
              </Box>
            ) : (
              <Box color="gray10">
                <AccessibleIcon label="car" icon={<MdWarning size={40} />} />
              </Box>
            )}
            <RideStatusBadge
              priority={rideStatus[trip.rides[0].status][1]}
              status={rideStatus[trip.rides[0].status][0]}
            />
          </Box>
        </Box>
      </Card>
      <Card style={{ padding: 0 }}>
        <Box p="3x">
          <Box>{t("RouteInformation")}</Box>
          <Box display="flex" gap="2x" p="2x" px="4x">
            <ProgressContainer height="9x" mt="1x" pb={{ md: "1x" }} ml="-2x">
              <ProgressStep active />
              <ProgressLine active />
              <ProgressStep active />
            </ProgressContainer>
            <Box fontSize="sm">
              <Box fontSize="xs">{t("Pickup")}</Box>
              <Box mb="4x"> {trip.rides[0].startingLocation.address}</Box>
              <Box fontSize="xs">{t("Dropoff")}</Box>
              <Box> {trip.rides[0].endingLocation.address}</Box>
            </Box>
          </Box>
        </Box>
      </Card>
      <Card style={{ padding: 0 }}>
        <Box p="3x">
          <Box mb="2x">{t("AdditionalInformation")}</Box>
          <Box color="muted" fontSize="sm">
            {t("NoAdditionalInfo")}
          </Box>
        </Box>
        <Box
          backgroundColor="gray5"
          p="3x"
          display="flex"
          justifyContent="space-around"
          gap="4x"
          fontSize="sm"
          lineHeight="dense"
        >
          <Box textAlign="center">
            <Box fontSize="xxs">{trip.levelOfService}</Box>
            <Box fontWeight="bold">{t("LevelOfService")}</Box>
          </Box>
          <Box textAlign="center">
            <Box fontSize="xxs">{trip.tripReason}</Box>
            <Box fontWeight="bold">{t("ReasonForVisit")}</Box>
          </Box>
        </Box>
      </Card>
      <Card>
        <Box mb="2x">{t("PassengerInformation")}</Box>
        {trip.additionalPassengers && trip.additionalPassengers.length ? (
          <Table>
            <thead>
              <tr>
                <Th>{t("FirstName")}</Th>
                <Th>{t("LastName")}</Th>
                <Th>{t("Relationship")}</Th>
                <Th>{t("Age")}</Th>
              </tr>
            </thead>
            <tbody>
              {trip.additionalPassengers.map((p, i) => {
                return (
                  <tr key={i}>
                    <Td fontSize="sm">{p.firstName}</Td>
                    <Td fontSize="sm">{p.lastName}</Td>
                    <Td fontSize="sm">{p.passengerType}</Td>
                    <Td fontSize="sm">{p.age}</Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <Box fontSize="sm" color="muted">
            {t("NoPassengers")}
          </Box>
        )}
      </Card>
    </Box>
  );
};

export { AppointmentDetails };
