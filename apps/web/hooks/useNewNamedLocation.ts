import { useMutation } from "@tanstack/react-query";
import { useRequest } from "./useRequest";
import { NamedLocation } from "models/NamedLocation";

/**
 * Creates a new trip
 */
export const useNewNamedLocation = () => {
  const request = useRequest();

  return useMutation(async (vars: NamedLocation) => {
    const { data } = await request<NamedLocation>({
      method: "post",
      url: "/ride/api/v1/NamedLocation",
      data: vars,
    });

    return data;
  });
};
