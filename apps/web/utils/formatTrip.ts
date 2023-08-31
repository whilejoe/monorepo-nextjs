import { Trip } from "models/Trip";
import { formatRide } from "./formatRide";

/**
 * Formats ride data within a trip to simplify UI
 */
export const formatTrip = (trip: Trip): Trip => {
  return {
    ...trip,
    rides: trip.rides.map(formatRide),
  };
};
