import { getGeocode, getLatLng, getZipCode } from "use-places-autocomplete";
import { Location } from "models/Location";

export const getLocation = async (
  args: google.maps.GeocoderRequest
): Promise<Location> => {
  const results = await getGeocode(args);
  const result = results[0];
  const { address_components } = result;

  // Zip
  const postalCode = getZipCode(result, true) ?? "";

  // City
  const cityObject = address_components.find((i) => {
    return i.types.includes("locality");
  });

  // State
  const stateObject = address_components.find((i) => {
    return i.types.includes("administrative_area_level_1");
  });

  // Address Number
  const addressNumberObject = address_components.find((i) => {
    return i.types.includes("street_number");
  });

  // Street
  const streetObject = address_components.find((i) => {
    return i.types.includes("route");
  });

  const { lat, lng } = getLatLng(result);

  const name = args.address?.substring(0, args.address?.indexOf(","));
  const address = `${addressNumberObject?.long_name} ${streetObject?.long_name}`;

  return {
    address: address,
    address2: "",
    city: cityObject?.long_name || "",
    state: stateObject?.short_name || "",
    postalCode,
    latitude: lat,
    longitude: lng,
    name: !address.includes(name!) ? name : "",
  };
};

export const formatAddressFromLocation = (l: Location) => {
  return `${l.address}, ${l.city}, ${l.state}, ${l.postalCode}`;
};
