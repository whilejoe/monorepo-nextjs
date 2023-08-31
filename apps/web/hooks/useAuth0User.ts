import { useAuth0 } from "@auth0/auth0-react";
import { Auth0User } from "models/User";

export const useAuth0User = () => {
  return useAuth0<Auth0User>();
};
