import { style } from "@vanilla-extract/css";
import { atoms } from "../../styles/atoms.css";
import { vars } from "../../styles/vars.css";

export const calendarButton = style([
  atoms({ height: "6.5x" }),
  {
    minHeight: "45px",
    boxShadow: `0 0 0px 1px ${vars.color.primary}`,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
]);

export const popoverContent = style([
  atoms({
    position: "relative",
    px: "2.5x",
    pt: "2.5x",
    pb: "2x",
  }),
]);
