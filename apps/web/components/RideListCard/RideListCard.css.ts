import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";

export const detailContainer = style([
  atoms({
    border: "global",
    borderRadius: "sm",
    alignItems: "center",
    px: "2.5x",
    py: "2.5x",
  }),
]);
