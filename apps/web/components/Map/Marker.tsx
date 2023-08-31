import { useEffect, useState, memo } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { vars } from "ui/styles/vars.css";
import { useColorMode } from "components/ColorMode";
import { cssVar } from "polished";
import { kinds, markerLabelKinds, MarkerKind } from "./Marker.css";

type MarkerProps = google.maps.MarkerOptions & {
  kind?: MarkerKind;
  labelText?: string;
};

const MarkerBase = ({ kind = "current", labelText, ...props }: MarkerProps) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // Remove marker from map on unmount
    return () => {
      if (marker) marker.setMap(null);
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      const matchedKind = kinds[kind];
      const color = cssVar(
        `--color-${matchedKind.color}`,
        "hsl(192, 85.0%, 31.0%)"
      ) as string;

      if (labelText) {
        marker.setLabel({
          className: markerLabelKinds[kind],
          text: labelText,
          color: color,
          fontSize: "13px",
          fontWeight: vars.fontWeight.bold,
          fontFamily: vars.fontFamily.body,
        });
      }

      marker.setIcon({
        path: "m12,0c-3.87,0 -7,3.13 -7,7c0,1.74 0.5,3.37 1.41,4.84c0.95,1.54 2.2,2.86 3.16,4.4c0.47,0.75 0.81,1.45 1.17,2.26c0.26,0.55 0.47,1.5 1.26,1.5s1,-0.95 1.25,-1.5c0.37,-0.81 0.7,-1.51 1.17,-2.26c0.96,-1.53 2.21,-2.85 3.16,-4.4c0.92,-1.47 1.42,-3.1 1.42,-4.84c0,-3.87 -3.13,-7 -7,-7zm0,9.75a2.5,2.5 0 0 1 0,-5a2.5,2.5 0 0 1 0,5z",
        fillColor: color,
        fillOpacity: 1,
        strokeColor: color,
        strokeWeight: 0,
        strokeOpacity: 0,
        rotation: 0,
        scale: 1.5,
        anchor: new google.maps.Point(12, 19),
        labelOrigin: new google.maps.Point(12, -14),
      });
    }
  }, [colorMode, kind, marker, labelText]);

  useDeepCompareEffect(() => {
    if (marker) {
      marker.setOptions(props);
    }
  }, [marker, props]);

  return null;
};

export const Marker = memo(MarkerBase);
