import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { createVar, style, fallbackVar } from "@vanilla-extract/css";
import { atoms } from "../../styles/atoms.css";
import { vars } from "../../styles/vars.css";
import { responsiveStyle } from "../../styles/utils";

export const stateColor = createVar();

const inputBg = vars.color.background;
const autofillShadow = `inset 0 0 0 1000px ${inputBg}`;

// Fix for ios zooming issue
export const inputFont = responsiveStyle({
  xs: { fontSize: "16px" },
  sm: { fontSize: vars.fontSize.sm },
});

export const inputGroup = atoms({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  verticalAlign: "top",
  mb: "4x",
});

export const inputState = recipe({
  base: [inputGroup],
  variants: {
    // Order matters - last one wins if multiple are true
    error: {
      true: {
        vars: {
          [stateColor]: vars.color.danger,
        },
      },
    },
    focused: {
      true: {
        vars: {
          [stateColor]: vars.color.primary,
        },
      },
    },
    disabled: {
      true: {
        vars: {
          [stateColor]: vars.color.border,
        },
      },
    },
  },
  // Defaults
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

export const inputBase = style([
  inputFont,
  atoms({
    display: "block",
    width: "100%",
    margin: "0x",
    pl: "2.5x",
    pr: "2x",
    pt: "2.5x",
    height: "6.5x",
    boxShadow: "0x",
    border: "none",
    color: "text",
  }),
  responsiveStyle({
    xs: {
      minHeight: 44,
    },
    sm: {
      minHeight: "auto",
    },
  }),
  {
    background: "none",
    lineHeight: "inherit",
    appearance: "none",

    selectors: {
      "&::placeholder": {
        color: vars.color.muted,
      },
      "&:focus": {
        outline: "none",
      },
      "&:disabled": {
        color: vars.color.muted,
        cursor: "not-allowed",
      },
      "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus":
        {
          WebkitTextFillColor: vars.color.text,
          WebkitBoxShadow: autofillShadow,
        },
      "&:autofill, &:autofill:hover, &:autofill:focus": {
        boxShadow: autofillShadow,
      },
    },
  },
]);

export const hideLabelInputBase = style([
  {
    height: vars.space["6x"],
    paddingTop: vars.space["2x"],
    paddingBottom: vars.space["2x"],
  },
]);

export const filled = style([
  {
    transform: "translate(0, 4px) scale(0.7) !important",
  },
]);

export const inputContainer = style([
  atoms({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bg: "background",
    borderRadius: "sm",
    overflow: "hidden",
    cursor: "text",
  }),
  {
    boxShadow: `0 0 0 1px ${fallbackVar(stateColor, vars.color.border)}`,
  },
]);

export const inputLabel = style([
  inputFont,
  atoms({
    position: "absolute",
    pointerEvents: "none",
    lineHeight: "1",
    color: { darkMode: "text" },
  }),
  {
    left: vars.space["2.5x"],
    transform: "translate(0, 15px) scale(1)",
    transformOrigin: "top left",
    transition: "200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    color: "#686868",
  },
  {
    selectors: {
      [`&[data-disabled="true"]`]: {
        color: vars.color.muted,
        cursor: "not-allowed",
      },
      [`${inputContainer}:focus-within &`]: {
        transform: "translate(0, 4px) scale(0.7)",
      },
    },
  },
]);

export const fieldLabel = style([
  atoms({
    display: "flex",
    pb: "1x",
    pl: "1x",
    fontSize: "sm",
    fontWeight: "bold",
    lineHeight: "1",
  }),
]);

export const inputError = style([
  atoms({
    position: "absolute",
    ml: "2x",
    color: "danger",
    fontSize: { xs: "xs", md: "xxs" },
    lineHeight: "1",
  }),
  { top: "108%" },
]);

export const inputHint = style([
  inputError,
  {
    color: vars.color.muted,
  },
]);

export const segmentField = style([
  atoms({
    borderRadius: "xs",
    lineHeight: "1",
    mt: "1x",
    pt: "1x",
    mb: "1x",
  }),
  {
    fontVariantNumeric: "tabular-nums",
    textAlign: "right",
    selectors: {
      "&:focus": {
        background: vars.color.gray6,
        outline: "none",
      },
    },
  },
]);

export const segmentPlaceholder = style([
  atoms({
    color: "muted",
  }),
]);

export const selectOption = style([
  atoms({
    backgroundColor: "background",
  }),
]);

export type InputStateVariants = RecipeVariants<typeof inputState>;
