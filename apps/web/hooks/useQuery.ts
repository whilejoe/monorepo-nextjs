import {
  useQuery as useReactQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useRequest } from "./useRequest";
import { AxiosRequestConfig } from "axios";

export type QueryConfig<T> = Omit<
  UseQueryOptions<T, Error, T, QueryKeyT>,
  "enabled" | "initialData"
>;

type QueryKeyT = [string, object | undefined];

export const useQuery = <T>(
  url: string | null,
  params?: object,
  queryConfig?: QueryConfig<T>,
  axiosConfig?: AxiosRequestConfig
) => {
  const request = useRequest();

  return useReactQuery({
    queryKey: [url!, params],
    queryFn: async ({ queryKey, pageParam, signal }) => {
      const [url, params] = queryKey;

      const { data } = await request<T>({
        method: "get",
        url,
        params: { ...params, pageParam },
        signal,
        ...axiosConfig,
      });

      return data;
    },
    ...queryConfig,
    enabled: !!url,
  });
};
