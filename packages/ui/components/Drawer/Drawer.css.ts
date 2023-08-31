import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { atoms } from "../../styles/atoms.css";

export const drawerContent = recipe({
  base: [
    atoms({
      position: "fixed",
      top: "0",
      bottom: "0",
      display: "flex",
      flexDirection: "column",
      p: "4x",
      bg: "background",
      boxShadow: "6x",
      overflow: "hidden",
      overflowY: "auto",
    }),
    {
      maxHeight: "100%",
    },
  ],
  variants: {
    align: {
      left: {
        width: "320px",
      },
      right: {
        width: "320px",
      },
      bottom: atoms({
        width: "100%",
      }),
    },
  },
  defaultVariants: {
    align: "left",
  },
});

export type DrawerAlignmentVariants = RecipeVariants<typeof drawerContent>;
