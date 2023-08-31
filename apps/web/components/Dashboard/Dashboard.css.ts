import { style } from "@vanilla-extract/css";
import { responsiveStyle } from "ui/styles/utils";
import { atoms } from "ui/styles/atoms.css";

export const searchContainer = style([
  responsiveStyle({
    md: {
      maxWidth: 315,
      flex: "0 0 30%",
    },
    lg: {
      flex: "0 0 25%",
    },
    xxl: {
      maxWidth: 325,
    },
  }),
]);

export const resetButton = atoms({
  position: "absolute",
  top: "0",
  right: "0",
  mt: "2.5x",
  mr: "2.5x",
});
