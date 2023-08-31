import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";
import { vars } from "ui/styles/vars.css";

export const dropdown = style([
  atoms({
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    px: "0x",
    py: "1x",
    m: "0x",
    mt: "2x",
    fontSize: { xs: "md", sm: "sm" },
    bg: "gray1",
    border: "globalInteractive",
    borderRadius: "sm",
    boxShadow: "card",
  }),
  {
    zIndex: "1",
    listStyle: "none",
  },
]);

export const option = style([
  atoms({
    px: "2.5x",
    py: "2x",
    lineHeight: "dense",
    cursor: "pointer",
  }),
  {
    selectors: {
      [`&[data-headlessui-state="active"]`]: {
        backgroundColor: vars.color.gray4,
      },
      [`&[data-headlessui-state="selected"]`]: {
        backgroundColor: vars.color.gray5,
      },
      [`&[data-headlessui-state="active selected"]`]: {
        backgroundColor: vars.color.gray6,
      },
    },
  },
]);

export const clearButton = style([
  atoms({
    position: "absolute",
    backgroundColor: "background",

    pr: "2x",
  }),
  {
    paddingLeft: 7,
    top: 10,
    right: 0,
  },
]);

export const locationIcon = style([
  atoms({
    lineHeight: "1",
    color: "primary",
    mr: "2.5x",
  }),
  {
    marginTop: 2,
  },
]);
