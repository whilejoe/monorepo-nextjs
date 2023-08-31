import { keyframes, style } from "@vanilla-extract/css";
import { atoms } from "../../styles/atoms.css";

export const Root = style([atoms({ overflow: "hidden" })]);

const slideDown = keyframes({
  "0%": { height: 0 },
  "100%": { height: "var(--radix-accordion-content-height)" },
});

const slideUp = keyframes({
  "0%": { height: "var(--radix-accordion-content-height)" },
  "100%": { height: 0 },
});

export const Header = style([
  atoms({
    display: "flex",
    justifyContent: "space-between",
    fontSize: "md",
    fontWeight: "bold",
  }),
]);

export const Chevron = style([
  {
    transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
  },
  {
    selectors: {
      "&[data-state='open']": {
        transform: "rotate(180deg)",
      },
      "[data-state='open'] > &": {
        transform: "rotate(180deg)",
      },
    },
  },
]);

export const Trigger = style([
  atoms({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: "1",
    lineHeight: "dense",
    textAlign: "left",
  }),
]);

export const Content = style([
  atoms({ overflow: "hidden", marginTop: "2x", fontSize: "sm" }),
  {
    selectors: {
      "&[data-state='open']": {
        animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
      },
      "&[data-state='closed']": {
        animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
      },
    },
  },
]);
