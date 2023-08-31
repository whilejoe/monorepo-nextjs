import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";
import { vars } from "ui/styles/vars.css";

export const link = style([
  atoms({
    display: "flex",
    alignItems: "center",
    gap: "2.5x",
    py: "1x",
    color: "text",
    fontWeight: "bold",
    lineHeight: "heading",
  }),
  {
    ":hover": {
      textDecoration: "none",
      color: vars.color.primary,
    },
  },
]);

export const active = style({
  color: vars.color.primary,
});
