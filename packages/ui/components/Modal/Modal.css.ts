import { style } from "@vanilla-extract/css";
import { atoms } from "../../styles/atoms.css";
import { responsiveStyle } from "../../styles/utils";

export const content = style([
  atoms({
    position: "relative",
    p: "4x",
    minWidth: "0",
    width: "100%",
    bg: "background",
    borderRadius: "sm",
    boxShadow: "7x",
    overflow: "hidden",
    overflowY: "auto",
  }),
  {
    maxHeight: "100%",
  },
  responsiveStyle({
    sm: { maxWidth: "80%" },
    md: { maxWidth: "70%" },
    lg: { maxWidth: "50%" },
    xl: { maxWidth: "40%" },
  }),
]);
