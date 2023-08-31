module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "no-unused-vars": ["warn", { args: "none" }],
  },
};
