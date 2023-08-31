import { style } from "@vanilla-extract/css";
import { atoms } from "../../styles/atoms.css";
import { vars } from "../../styles/vars.css";

export const checkboxRoot = style([
  {
    height: "25px",
    width: "25px",
  },
  {
    ":hover": {
      backgroundColor: vars.color.blue3,
    },
  },
  atoms({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "sm",
    backgroundColor: "background",
    border: "globalInteractive",
    boxShadow: "1x",
  }),
]);

export const checkboxIndicator = atoms({
  color: "primary",
});
