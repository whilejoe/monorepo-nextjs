import { style } from "@vanilla-extract/css";
import { atoms } from "../../styles/atoms.css";
import { vars } from "../../styles/vars.css";

export const viewport = style([
  atoms({
    position: "fixed",
    right: 0,
    display: "flex",
    flexDirection: "column",
    gap: "2x",
    my: "3x",
    px: "containerX",
  }),
  {
    top: vars.content.headerHeight,
    width: 380,
    maxWidth: "100vw",
    zIndex: vars.zIndex.toast,
  },
]);
