import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";
import { responsiveStyle } from "ui/styles/utils";
import { vars } from "ui/styles/vars.css";

export const activeTab = style([
  atoms({
    fontSize: "lg",
  }),
]);

export const inactiveTab = style([
  atoms({
    color: "primary",
    fontSize: "md",
  }),
]);

export const drawer = style([
  {
    padding: 0,
  },
]);

export const activeCard = style([
  {
    borderColor: vars.color.primary,
  },
]);

export const detailsContainer = style([
  atoms({
    display: "flex",
    gap: "3x",
    flexDirection: { xs: "column-reverse", lg: "row" },
  }),
]);

export const appointmentDetailsContainer = style([
  responsiveStyle({
    xs: {
      width: "100%",
    },
    lg: {
      width: "360px",
    },
  }),
]);
