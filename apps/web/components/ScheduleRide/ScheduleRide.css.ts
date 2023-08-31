import { keyframes, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { atoms } from "ui/styles/atoms.css";
import { vars } from "ui/styles/vars.css";
import { responsiveStyle } from "ui/styles/utils";

export const form = atoms({
  display: "flex",
  flexDirection: "column",
  flex: "1",
});

const blinkInput = keyframes({
  "0%": { opacity: 0 },
  "100%": { height: 1 },
});

export const preventScroll = style({
  animation: `${blinkInput} .01s`,
});

export const footer = style([
  atoms({
    position: { md: "sticky" },
    mt: "auto",
    px: "containerX",
    py: "2.5x",
    bg: "background",
    borderTop: "global",
  }),
  responsiveStyle({
    md: {
      bottom: 0,
      boxShadow: vars.boxShadow.footer,
    },
  }),
  {
    // Break out of container spacing
    // TODO: Revisit
    marginLeft: `${calc(vars.contentSpace.containerX).negate()}`,
    marginRight: `${calc(vars.contentSpace.containerX).negate()}`,
  },
]);

export const inputGrid = style([
  atoms({
    display: "grid",
  }),
  {
    gridTemplateColumns: "1fr 40px",
  },
]);
