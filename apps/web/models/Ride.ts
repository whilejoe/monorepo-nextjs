import { Location } from "./Location";

export type RideStatus =
  | "ARRIVED"
  | "ARRIVING"
  | "CANCELED_BY_DRIVER"
  | "CANCELED_BY_RIDER"
  | "COMPLETE"
  | "CONFIRMED"
  | "IN_TRANSIT"
  | "MISSED"
  | "NO_SHOW"
  | "REJECTED"
  | "REQUESTED"
  | "REQUESTING";

export interface RideResponse {
  appointmentDateTime: string;
  endingLocation: Location;
  id: string;
  pickupDateTime: string;
  scheduledBy: string;
  startingLocation: Location;
  status: RideStatus;
  tripId: string;
  sequence: number;
}

export interface Ride extends RideResponse {
  pickupDayDisplay: string;
  pickupDayOfWeekDisplay: string;
  pickupMonthDisplay: string;
  pickupTimeDisplay: string;
  startingLocationAddressDisplay: string;
  endingLocationAddressDisplay: string;
}
