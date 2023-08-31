import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";
import { vars } from "ui/styles/vars.css";
import { inputFont } from "ui/components/Forms/Forms.css";

export const toggleLabel = style([
  inputFont,
  atoms({
    display: "block",
    pr: "2x",
    fontWeight: "bold",
    lineHeight: "1",
  }),
  {
    selectors: {
      [`&[data-disabled="true"]`]: {
        color: vars.color.muted,
        cursor: "not-allowed",
      },
    },
  },
]);

// TODO: Make sizing dynamic using calc
export const toggleBackground = style([
  atoms({
    position: "relative",
    bg: "gray7",
    borderRadius: "full",
  }),
  {
    width: 40,
    height: 24,
    outline: "none",
    selectors: {
      "&:focus-visible:not(:disabled)": {
        outline: "auto",
        outlineColor: vars.color.primary,
        outlineOffset: 2,
        outlineWidth: 1,
      },
      '&[data-state="checked"]': {
        backgroundColor: vars.color.primary,
      },
      "&:disabled": {
        backgroundColor: vars.color.gray7,
        cursor: "not-allowed",
      },
    },
  },
]);

export const toggle = style([
  atoms({
    display: "block",
    bg: "background",
    borderRadius: "full",
  }),
  {
    width: 20,
    height: 20,
    transition: "transform 100ms",
    transform: "translateX(2px)",
    willChange: "transform",
    selectors: {
      '&[data-state="checked"]': {
        transform: "translateX(18px)",
      },
    },
  },
]);
