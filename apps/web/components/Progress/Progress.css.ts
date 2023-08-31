import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";
import { vars } from "ui/styles/vars.css";

export const progressLine = style([
  atoms({
    flex: "1",
    backgroundColor: "gray8",
  }),
  {
    width: 3,
    opacity: 0.8,
    transition: "background-color 180ms ease-out",
  },
]);

export const progressStep = style([
  atoms({
    flex: "none",
    borderRadius: "circle",
    backgroundColor: "gray8",
  }),
  {
    transition: "background-color 180ms ease-out",
  },
]);

export const progressActive = style({
  backgroundColor: vars.color.primary,
});
