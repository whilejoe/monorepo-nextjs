import { style } from "@vanilla-extract/css";
import { atoms } from "../../styles/atoms.css";
import { vars } from "../../styles/vars.css";

export const calendarHeading = style([
  atoms({
    mb: "2x",
    textAlign: "center",
    fontSize: "md",
    fontWeight: "heading",
  }),
]);

export const calendarCell = style([
  atoms({
    borderRadius: "sm",
    textAlign: "center",
    p: { xs: "2x", md: "1x" },
    cursor: "pointer",
    fontSize: "sm",
    lineHeight: "heading",
  }),
  {
    selectors: {
      "&:hover": {
        background: `${vars.color.blue5}`,
      },
    },
  },
]);

export const selectedCell = style([
  atoms({ backgroundColor: "primary", color: "background" }),
  {
    selectors: {
      "&:hover": {
        background: `${vars.color.primary}`,
      },
    },
  },
]);

export const disabledCell = style([
  atoms({ color: "muted", cursor: "not-allowed" }),
  {
    selectors: {
      "&:hover": {
        background: "transparent",
      },
    },
  },
]);

export const monthButton = atoms({ position: "absolute", top: "0" });

export const monthButtonPrev = style([
  monthButton,
  atoms({ left: "0", ml: "1x" }),
]);

export const monthButtonNext = style([
  monthButton,
  atoms({ right: "0", mr: "1x" }),
]);
