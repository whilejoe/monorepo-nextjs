import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";
import { vars } from "ui/styles/vars.css";

export const recentDestinationCard = style([
  atoms({
    px: "2.5x",
    py: "2x",
    borderRadius: "sm",
    boxShadow: "card",
    border: "globalInteractive",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    textAlign: "left",
    lineHeight: "body",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  {
    ":hover": {
      borderColor: vars.color.primary,
    },
  },
]);
