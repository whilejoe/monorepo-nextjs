import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";
import { vars } from "ui/styles/vars.css";
import { responsiveStyle } from "ui/styles/utils";
import { container } from "ui/components/Layout/Layout.css";

const background = vars.color.yellow2;
const border = `1px solid ${vars.color.yellow7}`;

export const bannerContainer = style([
  container,
  atoms({
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "100%",
    right: 0,
    left: 0,
    px: "containerX",
  }),
  responsiveStyle({
    xs: {
      backgroundColor: background,
      borderTop: border,
      borderBottom: border,
    },
    md: {
      justifyContent: "flex-end",
      backgroundColor: "transparent",
      borderTop: "none",
      borderBottom: "none",
      marginTop: 1,
    },
  }),
]);

export const banner = style([
  atoms({
    px: "2.5x",
    py: "1x",
    color: "yellow11",
    fontSize: { xs: "sm", md: "xs" },
  }),
  responsiveStyle({
    md: {
      backgroundColor: background,
      borderRight: border,
      borderBottom: border,
      borderLeft: border,
      borderBottomRightRadius: vars.borderRadius.xs,
      borderBottomLeftRadius: vars.borderRadius.xs,
    },
  }),
]);
