import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { atoms } from "../../styles/atoms.css";
import { vars } from "../../styles/vars.css";

export const container = style([
  atoms({
    mx: "auto",
    px: "containerX",
  }),
  {
    maxWidth: vars.content.containerWidth,
  },
]);

export const header = style([
  atoms({
    position: "sticky",
    top: 0,
    display: "flex",
    alignItems: "center",
    minWidth: "0",
    bg: "background",
    borderBottom: "global",
  }),
  {
    gridArea: "header",
    height: vars.content.headerHeight,
    borderTop: "1px solid transparent",
    zIndex: vars.zIndex.header,
  },
]);

export const headerContainer = style([
  container,
  atoms({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: "1",
    minWidth: "0",
  }),
]);

export const main = style([
  atoms({
    position: "relative",
    minWidth: "0",
  }),
  {
    gridArea: "main",
  },
]);

export const mainWithContainer = style([
  main,
  container,
  atoms({ width: "100%", pb: "6x" }),
  {
    paddingTop: `${calc(vars.space["6x"]).add(vars.space["1x"])}`,
  },
]);

export const shell = style([
  atoms({
    display: "grid",
  }),
  {
    minHeight: "100vh",
    gridAutoRows: "auto 1fr",
    gridTemplateAreas: `"header" "main"`,
  },
]);
