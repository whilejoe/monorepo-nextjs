import { style } from "@vanilla-extract/css";
import {
  inputBase,
  inputContainer,
  inputGroup,
} from "ui/components/Forms/Forms.css";
import { atoms } from "ui/styles/atoms.css";
import { vars } from "ui/styles/vars.css";

export const languageSelectContainer = style([
  inputContainer,
  {
    display: "inline-flex",
    backgroundColor: "inherit",
    flexDirection: "row",
    alignItems: "center",
    selectors: {
      "&:focus-within": {
        boxShadow: `0 0 0 1px ${vars.color.primary}`,
      },
    },
  },
]);

export const languageSelectGroup = style([
  inputGroup,
  atoms({ flex: "1" }),
  style({ marginBottom: 0 }),
]);

export const languageSelectInput = style([
  inputBase,
  style({
    height: vars.space["5x"],
    minHeight: "auto",
    fontSize: vars.fontSize.sm,
    paddingTop: 0,
    paddingBottom: 0,
  }),
]);
