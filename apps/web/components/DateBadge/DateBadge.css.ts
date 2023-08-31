import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";

export const calendar = style([
  atoms({
    display: "flex",
    flexDirection: "column",
    align: "center",
    borderRadius: "xs",
    boxShadow: "2x",
    border: "globalInteractive",
    overflow: "hidden",
  }),
  {
    alignSelf: "flex-start",
    minWidth: "max-content",
  },
]);

export const calendarHeader = style([
  atoms({
    backgroundColor: "primary",
    color: "background",
  }),
  {
    paddingTop: "1px",
    paddingBottom: "1px",
  },
]);
