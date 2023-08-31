import { LocationCoordinate } from "models/LocationCoordinate";
const zipcodes = require("zipcodes");

/**
 * Finds the latitude and longitude using a U.S. postal code
 */
export const getCoordinatesByZipcode = (
  postalCode: string | undefined
): LocationCoordinate => {
  //default to geographic center of the United States
  let coordinate = new LocationCoordinate(39.828175, -98.5795);
  if (postalCode != null) {
    let details = zipcodes.lookup(postalCode);
    coordinate.latitude = details.latitude;
    coordinate.longitude = details.longitude;
  }
  return coordinate;
};
