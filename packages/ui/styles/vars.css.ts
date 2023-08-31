import {
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";
import merge from "lodash/merge";
import { getVarName } from "./utils";
import { COLOR_MODE_DARK } from "./color";
import {
  blue,
  blueDark,
  red,
  redDark,
  gray,
  grayDark,
  violet,
  violetDark,
  yellow,
  yellowDark,
  green,
  greenDark,
} from "@radix-ui/colors";

// https://utopia.fyi/space/calculator/?c=0,16,1.2,2000,18,1.25,5,2,&s=0.5|0.25,1.5|2|2.5|3|4|5|6,s-l
const space = {
  "0x": "0px",
  "1x": "clamp(0.25rem, calc(0.25rem + 0.05vw), 0.31rem)",
  "2x": "clamp(0.50rem, calc(0.50rem + 0.05vw), 0.56rem)",
  "2.5x": "clamp(0.75rem, calc(0.75rem + 0.1vw), 0.87rem)",
  "3x": "clamp(1.00rem, calc(1.00rem + 0.10vw), 1.13rem)",
  "4x": "clamp(1.50rem, calc(1.50rem + 0.15vw), 1.69rem)",
  "5x": "clamp(2.00rem, calc(2.00rem + 0.20vw), 2.25rem)",
  "6x": "clamp(2.50rem, calc(2.50rem + 0.25vw), 2.81rem)",
  "6.5x": "clamp(2.75rem, calc(2.75rem + 0.275vw), 3.1rem)",
  "7x": "clamp(3.00rem, calc(3.00rem + 0.30vw), 3.38rem)",
  "8x": "clamp(4.00rem, calc(4.00rem + 0.40vw), 4.50rem)",
  "9x": "clamp(5.00rem, calc(5.00rem + 0.50vw), 5.63rem)",
  "9.5x": "clamp(5.5rem, calc(5.5rem + 0.55vw), 6.19rem)",
  "10x": "clamp(6.00rem, calc(6.00rem + 0.60vw), 6.75rem)",
};

const baseTokens = {
  borderRadius: {
    none: "0px",
    xs: "4px",
    sm: "8px",
    md: "10px",
    lg: "12px",
    xl: "16px",
    xxl: "32px",
    circle: "50%",
    full: "99999px",
  },
  boxShadow: {
    "0x": "none",
    "1x": `0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)`,
    "2x": `0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)`,
    "3x": `0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)`,
    "4x": `0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)`,
    "5x": `0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)`,
    "6x": `0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)`,
    "7x": `0px 4px 5px -2px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 16px 1px rgba(0,0,0,0.12)`,
    "8x": `0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)`,
    "9x": `0px 5px 6px -3px rgba(0,0,0,0.2), 0px 9px 12px 1px rgba(0,0,0,0.14), 0px 3px 16px 2px rgba(0,0,0,0.12)`,
    "10x": `0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)`,
    card: "0px 0px 8px rgb(0 0 0 / 10%)", // Temp until box shadows can be revisited
    footer: "0 -5px 5px -5px rgb(0 0 0 / 20%)",
  },
  content: {
    headerHeight: space["8x"],
    containerWidth: "1440px",
  },
  contentSpace: {
    containerX: space["4x"],
  },
  fontFamily: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    heading: "inherit",
  },
  // https://utopia.fyi/type/calculator/?c=0,16,1.125,2000,18,1.125,4,3,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l
  fontSize: {
    xxs: "clamp(0.70rem, calc(0.70rem + 0.07vw), 0.79rem)",
    xs: "clamp(0.79rem, calc(0.79rem + 0.08vw), 0.89rem)",
    sm: "clamp(0.89rem, calc(0.89rem + 0.09vw), 1.00rem)",
    md: "clamp(1.00rem, calc(1.00rem + 0.10vw), 1.13rem)",
    lg: "clamp(1.13rem, calc(1.13rem + 0.11vw), 1.27rem)",
    xl: "clamp(1.27rem, calc(1.27rem + 0.13vw), 1.42rem)",
    xxl: "clamp(1.42rem, calc(1.42rem + 0.14vw), 1.60rem)",
    xxxl: "clamp(1.60rem, calc(1.60rem + 0.16vw), 1.80rem)",
  },
  fontWeight: {
    body: "400",
    bold: "500",
    heading: "500",
    xbold: "700",
  },
  letterSpacing: {
    dense: "-0.015em",
    roomy: "0.05em",
  },
  lineHeight: {
    body: "1.6",
    heading: "1.2",
    dense: "1.4",
    roomy: "1.8",
    "1": "1",
  },
  space,
  zIndex: {
    header: "2",
    toast: "3",
  },
};

const baseVars = createGlobalThemeContract(baseTokens, getVarName);
const colorModeVars = createGlobalThemeContract(
  {
    color: {
      primary: "",
      secondary: "",
      background: "",
      text: "",
      border: "",
      muted: "",
      danger: "",
      ...gray,
      ...blue,
      ...yellow,
      ...red,
      ...green,
    },
  },
  getVarName
);

// Base theme
createGlobalTheme(":root", baseVars, baseTokens);

// Light mode theme
createGlobalTheme(":root", colorModeVars, {
  color: {
    primary: "#0076bc",
    secondary: violet.violet11,
    background: gray.gray1,
    text: gray.gray12,
    border: gray.gray6,
    muted: gray.gray11,
    danger: red.red11,
    ...gray,
    ...blue,
    ...yellow,
    ...red,
    ...green,
  },
});

// Dark mode theme
createGlobalTheme(`.${COLOR_MODE_DARK}`, colorModeVars, {
  color: {
    primary: "#0096ef",
    secondary: violetDark.violet11,
    background: grayDark.gray1,
    text: grayDark.gray12,
    border: grayDark.gray6,
    muted: grayDark.gray11,
    danger: redDark.red11,
    ...grayDark,
    ...blueDark,
    ...yellowDark,
    ...redDark,
    ...greenDark,
  },
});

export type ThemeVars = typeof baseVars & typeof colorModeVars;
export const vars = merge({}, baseVars, colorModeVars) as ThemeVars;
