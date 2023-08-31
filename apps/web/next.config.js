const path = require("path");
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const { i18n } = require("./i18n.json");

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: [
      "components",
      "constants",
      "hooks",
      "lib",
      "mocks",
      "models",
      "pages",
      "utils",
    ],
  },
  i18n,
  experimental: {
    newNextLinkBehavior: true,
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  images: {
    domains: ["maps.googleapis.com"],
  },
  transpilePackages: ["ui"],
  output: "standalone",
};

module.exports = withVanillaExtract(nextConfig);
