import { Ride, RideResponse } from "models/Ride";

export const formatRideDateTime = (dateTimeString: string) => {
  return {
    day: new Date(dateTimeString).getDate().toLocaleString(),
    dayOfWeek: new Date(dateTimeString).toLocaleDateString("en-US", {
      weekday: "long",
    }),
    month: new Date(dateTimeString).toLocaleString("default", {
      month: "short",
    }),
    time: new Date(dateTimeString).toLocaleTimeString("default", {
      timeStyle: "short",
    }),
  };
};

export const shortenAddressSuffix = (address: string) => {
  return address
    .replace(new RegExp("\\bNorth\\b"), "N")
    .replace(new RegExp("\\bWest\\b"), "W")
    .replace(new RegExp("\\bSouth\\b"), "S")
    .replace(new RegExp("\\bEast\\b"), "E")
    .replace(new RegExp("\\Northwest\\b"), "NW")
    .replace(new RegExp("\\Northeast\\b"), "NE")
    .replace(new RegExp("\\Southwest\\b"), "SW")
    .replace(new RegExp("\\Southeast\\b"), "SE")
    .replace(new RegExp("\\bRoad\\b"), "Rd")
    .replace(new RegExp("\\bAvenue\\b"), "Ave")
    .replace(new RegExp("\\bBoulevard\\b"), "Blvd")
    .replace(new RegExp("\\bCourt\\b"), "Ct")
    .replace(new RegExp("\\bDrive\\b"), "Dr")
    .replace(new RegExp("\\bStreet\\b"), "St")
    .replace(new RegExp("\\bHighway\\b"), "Hwy");
};

/**
 * Formats ride data to simplify UI
 */
export const formatRide = (ride: RideResponse): Ride => {
  const formattedDateTime = formatRideDateTime(ride.pickupDateTime);
  const startingLocationAddressDisplay = shortenAddressSuffix(
    ride.startingLocation.address
  );
  const endingLocationAddressDisplay = shortenAddressSuffix(
    ride.endingLocation.address
  );

  return {
    ...ride,
    pickupDayDisplay: formattedDateTime.day,
    pickupDayOfWeekDisplay: formattedDateTime.dayOfWeek,
    pickupMonthDisplay: formattedDateTime.month,
    pickupTimeDisplay: formattedDateTime.time,
    startingLocationAddressDisplay: startingLocationAddressDisplay,
    endingLocationAddressDisplay: endingLocationAddressDisplay,
  };
};
