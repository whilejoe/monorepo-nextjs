import {
  useEffect,
  useRef,
  useState,
  Children,
  isValidElement,
  cloneElement,
  memo,
} from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { Loading } from "ui/components/Loading";
import { useColorMode } from "components/ColorMode";
import { useGoogleMaps } from "components/GoogleMapsProvider";
import { useUserLocation } from "hooks/useUserLocation";
import { MAP_STYLES, MAP_STYLES_DARK } from "constants/mapStyles";
import { vars } from "ui/styles/vars.css";

interface MapProps extends Omit<google.maps.MapOptions, "center" | "styles"> {
  centerLatitude?: google.maps.LatLngLiteral["lat"];
  centerLongitude?: google.maps.LatLngLiteral["lng"];
  children?: React.ReactNode;
  id: string;
  /** Offset by `x` number of pixels on the x axis */
  offsetX?: number;
  /** Offset by `x` number of pixels on the y axis */
  offsetY?: number;
  style?: React.CSSProperties;
}

const MapBase = ({
  centerLatitude,
  centerLongitude,
  children,
  id,
  offsetX = 0,
  offsetY = 0,
  style,
  // Google API Options
  clickableIcons = false,
  fullscreenControl = false,
  gestureHandling = "cooperative",
  mapTypeControl = false,
  streetViewControl = false,
  zoom = 14,
  ...options
}: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { colorMode } = useColorMode();
  const { isLoaded } = useGoogleMaps();
  const { data: userLocation } = useUserLocation();

  // Initialize map
  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          backgroundColor: vars.color.background,
          controlSize: 30,
        })
      );
    }
  }, [map, ref]);

  // Set styles based on color mode
  useEffect(() => {
    if (map) {
      map.setOptions({
        styles: colorMode === "dark" ? MAP_STYLES_DARK : MAP_STYLES,
      });
    }
  }, [map, colorMode]);

  // Set center and offsets
  useEffect(() => {
    if (map) {
      // User passed center
      if (centerLatitude && centerLongitude) {
        map.setCenter({ lat: centerLatitude, lng: centerLongitude });
        map.setZoom(zoom!);
        // Default to user's location
      } else if (userLocation) {
        map.setCenter(userLocation);
        map.setZoom(zoom!);
      }
      // Ensure offset is applied when center changes
      if (offsetX || offsetY) {
        map.panBy(offsetX, offsetY);
      }
    }
  }, [
    map,
    centerLatitude,
    centerLongitude,
    offsetX,
    offsetY,
    userLocation,
    zoom,
  ]);

  // Set known google api options
  useEffect(() => {
    if (map) {
      map.setOptions({
        clickableIcons,
        fullscreenControl,
        gestureHandling,
        mapTypeControl,
        streetViewControl,
      });
    }
  }, [
    map,
    clickableIcons,
    fullscreenControl,
    gestureHandling,
    mapTypeControl,
    streetViewControl,
  ]);

  // Set unknown google api options
  useDeepCompareEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  if (!isLoaded) return <Loading show />;

  return (
    <>
      <div
        id={id}
        ref={ref}
        style={{ height: "100%", width: "100%", ...style }}
      />
      {Children.map(children, (child) => {
        if (isValidElement<any>(child)) {
          // Set the map prop on the child component
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

export const Map = memo(MapBase);
