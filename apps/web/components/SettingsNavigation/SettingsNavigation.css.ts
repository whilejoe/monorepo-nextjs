import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";
import { responsiveStyle } from "ui/styles/utils";
import { vars } from "ui/styles/vars.css";

export const settingsNavigation = style([
  atoms({
    borderRight: "global",
    px: "4x",
    py: "3x",
    width: "100%",
  }),
  responsiveStyle({
    md: {
      width: "250px",
    },
  }),
  {
    height: `calc(100vh - ${vars.content.headerHeight})`,
  },
]);

export const settingsBack = style([
  atoms({
    display: "flex",
    alignItems: "center",
    gap: "1x",
    color: "text",
    fontSize: "sm",
    mb: "1x",
  }),
  {
    ":hover": {
      textDecoration: "none",
      color: vars.color.primary,
    },
  },
]);

export const settingsLink = style([
  atoms({
    gap: "2.5x",
    py: "2x",
    mt: "3x",
    color: "text",
    fontWeight: "bold",
    lineHeight: "heading",
    display: "block",
    textAlign: "left",
    fontSize: "sm",
  }),
  {
    borderBottom: `1px solid ${vars.color.gray6}`,
    ":hover": {
      textDecoration: "none",
      color: vars.color.primary,
    },
  },
]);

export const active = style({
  color: vars.color.primary,
  borderBottom: `1px solid ${vars.color.primary}`,
});
