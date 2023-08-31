import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";

export const imageContainer = style([
  atoms({
    position: "relative",
    overflow: "hidden",
    borderRadius: "sm",
    border: "global",
  }),
  { width: "100%", minHeight: "160px" },
]);
