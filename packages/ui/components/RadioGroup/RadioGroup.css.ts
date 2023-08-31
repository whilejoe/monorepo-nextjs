import { style } from "@vanilla-extract/css";
import { atoms } from "../../styles/atoms.css";
import { vars } from "../../styles/vars.css";

export const radioGroupRoot = atoms({
  display: "flex",
  flexDirection: "column",
  gap: "2x",
});

export const radioGroupItem = style([
  atoms({
    borderRadius: "circle",
    boxShadow: "1x",
    border: "globalInteractive",
  }),
  {
    width: "18px",
    height: "18px",
    selectors: {
      "&:hover": {
        backgroundColor: `${vars.color.blue3}`,
      },
    },
  },
]);

export const radioGroupIndicator = style([
  atoms({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "100%",
    width: "100%",
  }),
  {
    selectors: {
      "&:after": {
        content: "",
        display: "block",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: `${vars.color.primary}`,
      },
    },
  },
]);
