import { style } from "@vanilla-extract/css";
import { atoms } from "ui/styles/atoms.css";
import { vars } from "ui/styles/vars.css";
import { link } from "components/NavLink/NavLink.css";

export const menuLink = style([
  link,
  atoms({
    width: "100%",
    fontSize: "sm",
    textAlign: "left",
    py: "2x",
  }),
  {
    fontWeight: vars.fontWeight.body,
  },
]);

export const menuContainer = atoms({
  px: "2.5x",
});
