import { keyframes, style } from "@vanilla-extract/css";
import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { atoms } from "../../styles/atoms.css";
import { vars } from "../../styles/vars.css";

const hide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const slideIn = keyframes({
  from: {
    transform: `translateX(calc(100% + ${vars.contentSpace.containerX}))`,
  },
  to: { transform: "translateX(0)" },
});

const swipeOut = keyframes({
  from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  to: {
    transform: `translateX(calc(100% + ${vars.contentSpace.containerX}))`,
  },
});

export const toastStyle = recipe({
  base: [
    atoms({
      display: "grid",
      alignItems: "center",
      px: "3x",
      py: "2.5x",
      bg: "background",
      borderRadius: "sm",
      boxShadow: "4x",
    }),
    {
      gridTemplateAreas: '"title action" "description action"',
      gridTemplateColumns: "auto max-content",
      columnGap: vars.space["2x"],
      wordBreak: "break-word",
      selectors: {
        '&[data-state="open"]': {
          animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
        },
        '&[data-state="closed"]': {
          animation: `${hide} 100ms ease-in forwards`,
        },
        '&[data-swipe="move"]': {
          transform: "translateX(var(--radix-toast-swipe-move-x))",
        },
        '&[data-swipe="cancel"]': {
          transform: "translateX(0)",
          transition: "transform 200ms ease-out",
        },
        '&[data-swipe="end"]': {
          animation: `${swipeOut} 100ms ease-out forwards`,
        },
      },
    },
  ],
  variants: {
    kind: {
      success: {
        color: vars.color.green11,
        border: `1px solid ${vars.color.green8}`,
      },
      info: {
        color: vars.color.yellow11,
        border: `1px solid ${vars.color.yellow8}`,
      },
      danger: {
        color: vars.color.red11,
        border: `1px solid ${vars.color.red8}`,
      },
    },
  },
  defaultVariants: {
    kind: "success",
  },
});

export const toastTitle = style([
  atoms({
    fontSize: "sm",
    fontWeight: "bold",
    lineHeight: "heading",
    mb: "1x",
  }),
  {
    gridArea: "title",
  },
]);

export const toastDescription = style([
  atoms({
    fontSize: "sm",
    lineHeight: "heading",
    fontWeight: "xbold",
    color: "background",
  }),
  {
    gridArea: "description",
  },
]);

export type ToastVariants = RecipeVariants<typeof toastStyle>;
