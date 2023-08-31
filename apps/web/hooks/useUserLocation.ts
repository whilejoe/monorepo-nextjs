import { useQuery } from "@tanstack/react-query";
import env from "@beam-australia/react-env";
import axios from "axios";

type GoogleLocation = google.maps.LatLngLiteral;

type GoogleLocationResponse = {
  accuracy: number;
  location: GoogleLocation;
};

export const useUserLocation = () => {
  return useQuery({
    queryKey: ["https://www.googleapis.com/geolocation/v1/geolocate"],
    queryFn: async ({ signal }) => {
      const { data } = await axios.request<GoogleLocationResponse>({
        method: "post",
        url: ` https://www.googleapis.com/geolocation/v1/geolocate?key=${env(
          "GOOGLE_API_KEY"
        )}`,
        signal,
      });

      return data.location;
    },
    refetchOnWindowFocus: false,
  });
};
