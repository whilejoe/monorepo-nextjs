import { Ride } from "./Ride";
export interface AdditionalPassenger {
  firstName: string;
  lastName: string;
  passengerType: string;
  age: number | "";
}
export interface Trip {
  id: string;
  patientId: string;
  rides: Ride[];
  additionalPassengers: AdditionalPassenger[];
  tripReason: string;
  levelOfService: string;
  notes: string;
  tripNumber: number;
}

export interface TripOptions {
  id: string;
  name: string;
}

export interface TripResponse {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: Trip[];
}
export interface ServiceOptions {
  code: string;
  name: string;
}
