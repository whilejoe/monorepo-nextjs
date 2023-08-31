import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";

export const toggle = style([
  atoms({
    display: { md: "none" },
  }),
]);

export const sideNavLink = atoms({
  fontSize: "md",
  lineHeight: "dense",
});
