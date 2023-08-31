import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./vars.css";
import { COLOR_MODE_DARK } from "./color";

globalStyle("*, :before, :after", {
  boxSizing: "border-box",
});

globalStyle("*", {
  margin: 0,
});

globalStyle("html, body, #__next", {
  height: "100%",
});

globalStyle(`.${COLOR_MODE_DARK}`, {
  colorScheme: "dark",
});

globalStyle("html", {
  backgroundColor: vars.color.background,
  color: vars.color.text,
  textSizeAdjust: "100%",
});

globalStyle("body", {
  fontFamily: vars.fontFamily.body,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.body,
  lineHeight: vars.lineHeight.body,
  textSizeAdjust: "100%",
  WebkitFontSmoothing: "antialiased",
  WebkitTapHighlightColor: "transparent",
});

globalStyle("img, picture, video, canvas", {
  display: "block",
  maxWidth: "100%",
});

globalStyle("svg", {
  display: "inline-block",
  verticalAlign: "middle",
  overflow: "hidden",
});

globalStyle("input, button, textarea, select", {
  font: "inherit",
});

globalStyle("p, h1, h2, h3, h4, h5, h6", {
  marginTop: 0,
  overflowWrap: "break-word",
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  fontWeight: vars.fontWeight.heading,
  lineHeight: vars.lineHeight.heading,
});

globalStyle("h1", {
  fontSize: vars.fontSize.xxxl,
  marginBottom: vars.space["4x"],
});

globalStyle("h2", {
  fontSize: vars.fontSize.xxl,
  marginBottom: vars.space["3x"],
});

globalStyle("h3", {
  fontSize: vars.fontSize.xl,
  marginBottom: vars.space["2x"],
});

globalStyle("h4", {
  fontSize: vars.fontSize.lg,
  marginBottom: vars.space["2x"],
});

globalStyle("h5", {
  fontSize: vars.fontSize.md,
  marginBottom: vars.space["1x"],
});

globalStyle("h6", {
  fontSize: vars.fontSize.sm,
  marginBottom: vars.space["1x"],
});

globalStyle("p", {
  marginBottom: vars.space["3x"],
});

globalStyle("button", {
  appearance: "none",
  padding: 0,
  background: "transparent",
  color: "inherit",
  verticalAlign: "middle",
  lineHeight: 1,
  border: "none",
  cursor: "pointer",
  outline: "none",
});

globalStyle("a", {
  color: vars.color.primary,
  fontWeight: vars.fontWeight.bold,
  textDecoration: "none",
  cursor: "pointer",
  outline: "none",
});

globalStyle("a:hover", {
  textDecoration: "underline",
});

globalStyle("a:focus-visible, button:focus-visible", {
  outline: "auto",
  outlineColor: vars.color.primary,
  outlineOffset: 1,
  outlineWidth: 1,
});

globalStyle("#__next", {
  isolation: "isolate",
});

globalStyle("input::-webkit-date-and-time-value", {
  textAlign: "left",
});
