import {
  defineProperties,
  createSprinkles,
  createMapValueFn,
  createNormalizeValueFn,
  ConditionalValue,
} from "@vanilla-extract/sprinkles";
import mapValues from "lodash/mapValues";
import { calc } from "@vanilla-extract/css-utils";
import { breakpoints } from "./breakpoints";
import { vars } from "./vars.css";
import { COLOR_MODE_DARK } from "./color";

const space = vars.space;
export type Space = keyof typeof space;

const negativeSpace = {
  ["-1x"]: `${calc(space["1x"]).negate()}`,
  ["-2x"]: `${calc(space["2x"]).negate()}`,
  ["-3x"]: `${calc(space["3x"]).negate()}`,
  ["-4x"]: `${calc(space["4x"]).negate()}`,
  ["-5x"]: `${calc(space["5x"]).negate()}`,
  ["-6x"]: `${calc(space["6x"]).negate()}`,
  ["-7x"]: `${calc(space["7x"]).negate()}`,
  ["-8x"]: `${calc(space["8x"]).negate()}`,
  ["-9x"]: `${calc(space["9x"]).negate()}`,
  ["-10x"]: `${calc(space["10x"]).negate()}`,
};

const halfSpace = {
  ["2.5x"]: `${calc(vars.space["2x"]).add(vars.space["1x"])}`,
  ["3.5x"]: `${calc(vars.space["3x"]).add(vars.space["1x"])}`,
};

const positionSpace = [0, "auto", "100%"];

const margin = {
  ...space,
  ...negativeSpace,
  ...halfSpace,
  auto: "auto",
};

const padding = {
  ...space,
  ...vars.contentSpace,
  ...halfSpace,
};

const gap = {
  ...space,
  ...halfSpace,
};

const heights = {
  ...space,
  "100%": "100%",
};

const responsiveProperties = defineProperties({
  conditions: mapValues(breakpoints, (bp) =>
    bp === 0 ? {} : { "@media": `screen and (min-width: ${bp}px)` }
  ),
  defaultCondition: "xs",
  responsiveArray: ["xs", "sm", "md", "lg", "xl"],
  properties: {
    position: ["absolute", "relative", "sticky", "fixed"],
    display: [
      "none",
      "flex",
      "inline-flex",
      "block",
      "inline",
      "inline-block",
      "grid",
    ],
    flex: ["initial", "auto", "none", "0 1 auto", "1"],
    flexGrow: ["1", "2"],
    flexShrink: ["1", "2"],
    flexDirection: ["row", "column", "row-reverse", "column-reverse"],
    alignContent: ["center"],
    alignItems: ["baseline", "flex-start", "center", "flex-end"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
      "space-evenly",
    ],
    justifyItems: ["center"],
    gap: gap,
    order: ["-1", "0", "1"],
    paddingTop: padding,
    paddingRight: padding,
    paddingBottom: padding,
    paddingLeft: padding,
    marginTop: margin,
    marginRight: margin,
    marginBottom: margin,
    marginLeft: margin,
    width: ["auto", "100%"],
    fontSize: vars.fontSize,
    textAlign: ["left", "center", "right"],
  },
  shorthands: {
    align: ["alignItems"],
    justify: ["justifyContent"],
    padding: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
    p: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    pt: ["paddingTop"],
    pb: ["paddingBottom"],
    pl: ["paddingLeft"],
    pr: ["paddingRight"],
    margin: ["marginTop", "marginRight", "marginBottom", "marginLeft"],
    m: ["marginTop", "marginRight", "marginBottom", "marginLeft"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    mt: ["marginTop"],
    mb: ["marginBottom"],
    ml: ["marginLeft"],
    mr: ["marginRight"],
  },
});

export const mapResponsiveValue = createMapValueFn(responsiveProperties);
export const normalizeResponsiveValue =
  createNormalizeValueFn(responsiveProperties);

export type ResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof responsiveProperties,
  Value
>;

const colorProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: {
      selector: `.${COLOR_MODE_DARK} &`,
    },
  },
  defaultCondition: "lightMode",
  properties: {
    backgroundColor: vars.color,
    color: vars.color,
    borderColor: vars.color,
  },
  shorthands: {
    bg: ["backgroundColor"],
  },
});

const borders = {
  global: `1px solid ${vars.color.border}`,
  globalInteractive: `1px solid ${vars.color.gray7}`,
  none: 0,
};

const unconditionalProperties = defineProperties({
  properties: {
    borderTop: borders,
    borderRight: borders,
    borderBottom: borders,
    borderLeft: borders,
    borderRadius: vars.borderRadius,
    boxShadow: vars.boxShadow,
    fontFamily: vars.fontFamily,
    fontWeight: vars.fontWeight,
    height: heights,
    top: positionSpace,
    right: positionSpace,
    bottom: positionSpace,
    left: positionSpace,
    textTransform: ["capitalize", "lowercase", "uppercase"],
    letterSpacing: vars.letterSpacing,
    lineHeight: vars.lineHeight,
    verticalAlign: ["baseline", "middle", "top"],
    cursor: ["text", "pointer", "not-allowed"],
    overflow: ["hidden"],
    overflowX: ["auto"],
    overflowY: ["auto"],
    minWidth: ["0"],
    whiteSpace: ["nowrap"],
    pointerEvents: ["none"],
  },
  shorthands: {
    border: ["borderTop", "borderRight", "borderBottom", "borderLeft"],
    trbl: ["top", "right", "bottom", "left"],
  },
});

export const atoms = createSprinkles(
  responsiveProperties,
  unconditionalProperties,
  colorProperties
);

export type Atoms = Parameters<typeof atoms>[0];
