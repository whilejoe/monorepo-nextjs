import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { createVar } from "@vanilla-extract/css";
import { atoms, Space } from "../../styles/atoms.css";
import { vars } from "../../styles/vars.css";

const kindColor = createVar();
const boxShadow = vars.boxShadow["4x"];

const sizes: Record<"sm" | "md" | "lg", Space> = {
  sm: "4x",
  md: "5x",
  lg: "6x",
};

export const button = recipe({
  // Base
  base: [
    atoms({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
    }),
    {
      minWidth: 0,
      lineHeight: 0,
      outline: "none",
      transition: "box-shadow 180ms ease-out",

      selectors: {
        "&:hover:not(:disabled)": {
          boxShadow,
        },
        "&:disabled": {
          cursor: "not-allowed",
          opacity: 0.8,
          vars: {
            [kindColor]: vars.color.muted,
          },
        },
        "&:focus-visible": {
          outline: "auto",
          outlineColor: kindColor,
          outlineOffset: 2,
          outlineWidth: 1,
        },
      },
    },
  ],
  // Variants
  variants: {
    kind: {
      primary: {
        vars: {
          [kindColor]: vars.color.primary,
        },
      },
      secondary: {
        vars: {
          [kindColor]: vars.color.secondary,
        },
      },
      danger: {
        vars: {
          [kindColor]: vars.color.danger,
        },
      },
      text: {
        vars: {
          [kindColor]: vars.color.text,
        },
      },
      search: {
        vars: {
          [kindColor]: vars.color.blue9,
        },
      },
      muted: {
        vars: {
          [kindColor]: vars.color.muted,
        },
      },
    },
    size: {
      sm: [
        atoms({
          px: "2x",
          height: sizes["sm"],
          fontSize: "xs",
          borderRadius: "xs",
        }),
        { minHeight: 28 },
      ],
      md: [
        atoms({
          px: "3x",
          height: sizes["md"],
          fontSize: "sm",
          borderRadius: "xs",
        }),
        { minHeight: 34 },
      ],
      lg: [
        atoms({
          px: "4x",
          height: sizes["lg"],
          fontSize: "md",
          borderRadius: "xs",
        }),
      ],
    },
    priority: {
      1: [
        atoms({
          color: "background",
        }),
        {
          backgroundColor: kindColor,
        },
      ],
      2: {
        color: kindColor,
        boxShadow: `inset 0 0 0 1px ${kindColor}`,
        selectors: {
          "&:hover:not(:disabled)": {
            boxShadow: `${boxShadow}, inset 0 0 0 1px ${kindColor}`,
          },
        },
      },
      3: {
        color: kindColor,
      },
    },
    full: {
      true: atoms({ width: "100%" }),
    },
    round: {
      true: atoms({ borderRadius: "circle" }),
    },
  },

  // Compound Variants
  compoundVariants: [
    {
      variants: { round: true, size: "sm" },
      style: {
        width: vars.space[sizes["sm"]],
        padding: 0,
        minHeight: "auto",
      },
    },
    {
      variants: { round: true, size: "md" },
      style: {
        width: vars.space[sizes["md"]],
        padding: 0,
        minHeight: "auto",
      },
    },
    {
      variants: { round: true, size: "lg" },
      style: {
        width: vars.space[sizes["lg"]],
        padding: 0,
        minHeight: "auto",
      },
    },
  ],

  // Defaults
  defaultVariants: {
    full: false,
    kind: "primary",
    priority: 1,
    size: "md",
    round: false,
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
