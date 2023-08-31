import { style, styleVariants } from "@vanilla-extract/css";
import { atoms, Atoms } from "ui/styles/atoms.css";

export type MarkerKind = "current" | "next";

export const kinds: Record<
  MarkerKind,
  Pick<Atoms, "color" | "backgroundColor" | "borderColor">
> = {
  current: {
    backgroundColor: "blue1",
    color: "blue11",
    borderColor: "blue7",
  },
  next: {
    backgroundColor: "green1",
    color: "green11",
    borderColor: "green7",
  },
};

const base = style([
  atoms({
    py: "1x",
    px: "2x",
    lineHeight: "dense",
    letterSpacing: "dense",
    borderRadius: "xs",
    boxShadow: "2x",
  }),
  { border: "1px solid" },
]);

export const markerLabelKinds = styleVariants(kinds, (k) => [base, atoms(k)]);
