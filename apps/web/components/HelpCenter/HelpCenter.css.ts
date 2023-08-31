import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";

export const separator = style([
  atoms({
    bg: "gray7",
    mb: "4x",
  }),
  {
    height: 1,
  },
]);
