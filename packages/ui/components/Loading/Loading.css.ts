import { keyframes, style } from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { atoms } from "../../styles/atoms.css";

const rotate = keyframes({
  "0%": {
    transformOrigin: "50% 50%",
  },
  "100%": {
    transform: "rotate3d(0,0,1,360deg)",
  },
});

const circularDash = keyframes({
  "0%": {
    strokeDasharray: "1px, 200px",
    strokeDashoffset: "0px",
  },
  "50%": {
    strokeDasharray: "100px, 200px",
    strokeDashoffset: "-15px",
  },
  "100%": {
    strokeDasharray: "100px, 200px",
    strokeDashoffset: "-125px",
  },
});

export const container = recipe({
  base: [
    atoms({
      position: "absolute",
      trbl: "0",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    }),
  ],
  variants: {
    color: {
      primary: atoms({
        color: "primary",
      }),
      text: atoms({
        color: "text",
      }),
      background: atoms({
        color: "background",
      }),
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export const rotator = style({
  animation: `${rotate} 1.4s linear infinite`,
  transformOrigin: "50% 50%",
});

export const circle = style({
  stroke: "currentColor",
  strokeDasharray: "80px, 200px",
  strokeDashoffset: "0px",
  animation: `${circularDash} 1.4s ease-in-out infinite`,
  transform: "translateZ(0)",
});

export type LoadingVariants = RecipeVariants<typeof container>;
