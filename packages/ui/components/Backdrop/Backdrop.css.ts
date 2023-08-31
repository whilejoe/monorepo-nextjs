import { style } from "@vanilla-extract/css";
import { atoms } from "../../styles/atoms.css";

export const backdrop = style([
  atoms({
    position: "fixed",
    trbl: "0",
    display: "grid",
    alignContent: "center",
    justifyItems: "center",
    p: "4x",
  }),
  style({
    background: "rgba(0, 0, 0, 0.7)",
  }),
]);
