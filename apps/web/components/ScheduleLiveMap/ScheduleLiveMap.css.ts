import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";
import { vars } from "ui/styles/vars.css";
import { responsiveStyle } from "ui/styles/utils";

const MAP_MIN_HEIGHT = "170px";

export const viewContainer = style([
  atoms({
    position: { xs: "fixed", md: "relative" },
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: { md: "3x" },
    justifyContent: { md: "space-between" },
    alignItems: { md: "flex-start" },
    mx: { md: "auto" },
    pt: { md: "6x" },
    pb: { md: "3x" },
    px: { md: "containerX" },
    overflow: "hidden",
  }),
  responsiveStyle({
    xs: {
      inset: 0,
      top: vars.content.headerHeight,
    },
    md: {
      maxWidth: vars.content.containerWidth,
      inset: "auto",
      height: `calc(100vh - ${vars.content.headerHeight})`,
    },
  }),
]);

export const mapContainer = style([
  atoms({
    position: { md: "fixed" },
    bg: "background",
  }),
  responsiveStyle({
    xs: {
      minHeight: MAP_MIN_HEIGHT,
      flex: `1 0 ${MAP_MIN_HEIGHT}`,
    },
    md: {
      top: vars.content.headerHeight,
      right: 0,
      bottom: 0,
      left: 0,
      minHeight: "auto",
    },
  }),
]);

export const mobileContentContainer = style([
  atoms({
    display: { md: "none" },
    borderTop: "global",
    overflowY: "auto",
  }),
]);

export const mobileContent = style([
  atoms({
    display: { md: "none" },
    px: "containerX",
    py: "4x",
    borderTop: "globalInteractive",
    overflowY: "auto",
  }),
]);

export const desktopCard = style([
  atoms({
    display: { xs: "none", md: "block" },
    overflowY: "auto",
  }),
  {
    maxHeight: "100%",
    zIndex: 1,
  },
]);

export const desktopHeading = style([
  atoms({
    mb: "3.5x",
    fontSize: "xl",
  }),
]);

export const footer = style([
  atoms({
    position: "sticky",
    bottom: "0",
    display: { xs: "flex", md: "none" },
    flexDirection: "column",
    gap: "3x",
    mt: "auto",
    px: "3x",
    py: "2.5x",
    minWidth: "0",
    bg: "gray2",
    borderTop: "globalInteractive",
    boxShadow: "footer",
  }),
]);

export const scheduleDrawer = style([
  {
    padding: 0,
  },
]);

export const scheduleDrawerClose = style([
  atoms({
    position: "absolute",
    top: "0",
    left: "0",
    mt: "3x",
    ml: "3x",
    bg: "gray1",
    border: "globalInteractive",
    boxShadow: "1x",
  }),
  {
    zIndex: 1,
  },
]);
