import { Location } from "models/Location";
import { RideNew } from "hooks/useNewTrip";

export const destinationsToArray = (
  location1: Location,
  location2: Location,
  time: string
) => {
  let locationArr = [];
  location1 && locationArr.push(location1);
  location2 && locationArr.push(location2);

  let newRideArr: RideNew[] = [];

  for (let i = 0; i < locationArr.length - 1; i++) {
    newRideArr.push({
      appointmentDateTime: time,
      pickupDateTime: time,
      startingLocation: locationArr[i],
      endingLocation: locationArr[i + 1],
      sequence: i,
    });
  }

  return newRideArr;
};
