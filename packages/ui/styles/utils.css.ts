import { style } from "@vanilla-extract/css";
import { atoms } from "./atoms.css";

export const srOnly = style([
  atoms({
    position: "absolute",
    padding: "0x",
    overflow: "hidden",
    border: "none",
  }),
  {
    width: "1px",
    height: "1px",
    margin: "-1px",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  },
]);

export const truncate = style([
  atoms({
    overflow: "hidden",
    whiteSpace: "nowrap",
  }),
  {
    textOverflow: "ellipsis",
  },
]);

export const clampLine = style([
  atoms({
    overflow: "hidden",
  }),
  {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
  },
]);

export const ulReset = style([
  atoms({
    p: "0x",
    m: "0x",
  }),
  {
    listStyle: "none",
  },
]);
