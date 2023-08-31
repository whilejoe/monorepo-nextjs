import { createContext, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { UseLoadScriptOptions } from "@react-google-maps/api/dist/useJsApiLoader";

export type GoogleMapsState = {
  isLoaded: boolean;
  loadError?: Error;
};

export type GoogleMapsProviderProps = {
  children: React.ReactNode;
} & UseLoadScriptOptions;

const GoogleMapsContext = createContext<GoogleMapsState>({ isLoaded: false });

export const GoogleMapsProvider = ({
  children,
  ...loadScriptOptions
}: GoogleMapsProviderProps) => {
  const { isLoaded, loadError } = useJsApiLoader(loadScriptOptions);

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);
