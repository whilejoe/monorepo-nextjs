import { style } from "@vanilla-extract/css";
import { atoms } from "../../styles/atoms.css";

export const container = atoms({
  overflowX: "auto",
});

export const table = style([
  atoms({
    p: "0x",
    m: "0x",
    width: "100%",
    fontSize: "sm",
  }),
  {
    borderCollapse: "collapse",
    borderSpacing: 0,
  },
]);

// Offset increase in cell height from button
export const cellAction = style({
  marginTop: "-5px",
  marginBottom: "-5px",
});
