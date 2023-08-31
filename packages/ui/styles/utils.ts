import omit from "lodash/omit";
import isEqual from "lodash/isEqual";
import { StyleRule } from "@vanilla-extract/css";
import { Properties, SimplePseudos } from "csstype";
import mapValues from "lodash/mapValues";
import { breakpoints, Breakpoint } from "./breakpoints";

export const queries = mapValues(
  omit(breakpoints, "xs"),
  (bp) => `screen and (min-width: ${bp}px)`
);

const makeMediaQuery =
  (breakpoint: keyof typeof queries) => (styles: Properties<string | number>) =>
    !styles || Object.keys(styles).length === 0
      ? {}
      : { [queries[breakpoint]]: styles };

const mediaQuery = {
  sm: makeMediaQuery("sm"),
  md: makeMediaQuery("md"),
  lg: makeMediaQuery("lg"),
  xl: makeMediaQuery("xl"),
  xxl: makeMediaQuery("xxl"),
};

type CSSProps = Properties<string | number> & {
  [P in SimplePseudos]?: Properties<string | number>;
};

interface ResponsiveStyle {
  xs?: CSSProps;
  sm?: CSSProps;
  md?: CSSProps;
  lg?: CSSProps;
  xl?: CSSProps;
  xxl?: CSSProps;
}

// TODO: Make dynamic
export const responsiveStyle = ({
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
}: ResponsiveStyle): StyleRule => {
  const baseStyles = omit(xs, "@media");

  const smStyles = !sm || isEqual(sm, baseStyles) ? null : sm;

  const stylesBelowMd = smStyles || baseStyles;
  const mdStyles = !md || isEqual(md, stylesBelowMd) ? null : md;

  const stylesBelowLg = mdStyles || smStyles;
  const lgStyles = !lg || isEqual(lg, stylesBelowLg) ? null : lg;

  const stylesBelowXl = lgStyles || mdStyles;
  const xlStyles = !xl || isEqual(xl, stylesBelowXl) ? null : xl;

  const stylesBelowXxl = lgStyles || xlStyles;
  const xxlStyles = !xxl || isEqual(xxl, stylesBelowXxl) ? null : xxl;

  const hasMediaQueries =
    smStyles || mdStyles || lgStyles || xlStyles || xxlStyles;

  return {
    ...baseStyles,
    ...(hasMediaQueries
      ? {
          "@media": {
            ...(smStyles ? mediaQuery.sm(smStyles) : {}),
            ...(mdStyles ? mediaQuery.md(mdStyles) : {}),
            ...(lgStyles ? mediaQuery.lg(lgStyles) : {}),
            ...(xlStyles ? mediaQuery.xl(xlStyles) : {}),
            ...(xxlStyles ? mediaQuery.xxl(xxlStyles) : {}),
          },
        }
      : {}),
  };
};

export const mapToProperty =
  <Property extends keyof Properties<string | number>>(
    property: Property,
    breakpoint?: Breakpoint
  ) =>
  (value: string | number) => {
    const styleRule = { [property]: value };

    return breakpoint
      ? responsiveStyle({ [breakpoint]: styleRule })
      : styleRule;
  };

export const getVarName = (_value: string | null, path: string[]) =>
  path.join("-").replace(".", "_").replace("/", "__");
