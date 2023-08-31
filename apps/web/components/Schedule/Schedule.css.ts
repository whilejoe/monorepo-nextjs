import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";
import { vars } from "ui/styles/vars.css";
import { responsiveStyle } from "ui/styles/utils";
import { COLOR_MODE_DARK } from "ui/styles/color";

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
  }),
  responsiveStyle({
    xs: {
      inset: 0,
      top: vars.content.headerHeight,
      overflowY: "auto",
    },
    md: {
      maxWidth: vars.content.containerWidth,
      inset: "auto",
      height: `calc(100vh - ${vars.content.headerHeight})`,
      overflowY: "hidden",
    },
  }),
]);

export const mapContainer = style([
  atoms({
    bg: "background",
    border: "globalInteractive",
    borderRadius: "sm",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: "3x",
  }),
  responsiveStyle({
    xs: {
      flex: `1 0 ${MAP_MIN_HEIGHT}`,
      height: MAP_MIN_HEIGHT,
      minHeight: MAP_MIN_HEIGHT,
      marginBottom: vars.space["3x"],
    },
    md: {
      height: "100%",
      position: "relative",
      flex: 1,
      marginRight: 0,
      marginLeft: 0,
      boxShadow: vars.boxShadow.card,
    },
  }),
]);

export const scheduleDrawerClose = style([
  atoms({
    bg: "gray1",
    border: "globalInteractive",
    boxShadow: "1x",
  }),
  {
    zIndex: 1,
  },
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
    pb: "3x",
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
    mb: "2x",
    fontSize: "xl",
  }),
]);

export const desktopBackground = style([
  atoms({
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "100%",
  }),
  {
    zIndex: -1,
    background: "linear-gradient(180deg, #F8FEFF 0%, #0078bd33 100%)",
    selectors: {
      [`.${COLOR_MODE_DARK} &`]: {
        background:
          "linear-gradient(180deg, hsl(0, 0%, 8.5%), hsl(0, 0%, 2.5%))",
      },
    },
  },
]);

export const footer = style([
  atoms({
    display: { xs: "flex", md: "none" },
    flexDirection: "column",
    px: "containerX",
    pb: "3x",
    minWidth: "0",
  }),
]);

export const footerStuck = style([
  atoms({
    position: "sticky",
    bottom: "0",
    flex: "none",
    mt: "auto",
    bg: "background",
    borderTop: "globalInteractive",
    boxShadow: "footer",
  }),
  {
    selectors: {
      "&:after": {
        content: "''",
        position: "absolute",
        top: 7,
        left: "50%",
        height: 3,
        width: 70,
        backgroundColor: vars.color.gray7,
        borderRadius: vars.borderRadius.xs,
        transform: "translateX(-50%)",
      },
    },
  },
]);

export const scheduleDrawer = style([
  {
    padding: 0,
    overflowY: "hidden",
  },
]);

export const scheduleRecentDrawer = style([
  {
    padding: vars.space["3x"],
    height: 350,
    top: "auto",
  },
]);

export const searchButton = style([
  atoms({
    position: "sticky",
    top: "0",
    gap: "1x",
    color: "text",
    fontWeight: "xbold",
    border: "global",
    borderRadius: "sm",
  }),
  {
    justifyContent: "left",
    paddingLeft: vars.space["2x"],
    backgroundColor: vars.color.blue3,
  },
]);

export const confirmModalHeading = style([
  atoms({
    mb: "2.5x",
    color: "muted",
    fontSize: "sm",
    fontWeight: "body",
    textTransform: "uppercase",
  }),
]);

export const buttonLink = style([
  {
    ":hover": {
      textDecoration: "none",
    },
  },
]);
