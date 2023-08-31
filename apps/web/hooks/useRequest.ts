import { useCallback } from "react";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import { OAuthError } from "@auth0/auth0-react";
import { useAuth0User } from "./useAuth0User";
import axios from "lib/axios";
import env from "@beam-australia/react-env";

export type APIErrorResponse = {
  errorCode: string;
  message: string;
};

export function isAuth0Error(error: unknown): error is OAuthError {
  return (
    error instanceof OAuthError ||
    (error !== null &&
      typeof error === "object" &&
      "error" in error &&
      typeof error.error === "string")
  );
}

export const useRequest = () => {
  const { getAccessTokenSilently, logout } = useAuth0User();

  return useCallback(
    async <T, R = AxiosResponse<T>, D = any>(
      axiosConfig: AxiosRequestConfig<D>
    ) => {
      try {
        const token = await getAccessTokenSilently();

        return axios.request<T, R, D>({
          ...axiosConfig,
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        // Handle all auth0 errors by logging user out
        // Update to handle specific errors i.e. `e.error === "invalid_grant"`
        if (isAuth0Error(error)) {
          // Clears auth0 related cookies, etc. and redirects user to login
          logout({
            logoutParams: {
              returnTo: env("AUTH0_REDIRECT_URI"),
            },
          });
          // Rethrow as custom auth0 error
          throw new OAuthError("There was an unknown error");
        }

        // Rethrow all other errors as-is
        throw error;
      }
    },
    [getAccessTokenSilently, logout]
  );
};
