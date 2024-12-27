const { defineConfig } = require("@vue/cli-service");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:
    process.env.NODE_ENV === "production" ? "/Ecardstore-tools/" : "/",
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "node_modules/@imgly/background-removal/dist/**/*",
            to: "background-removal/[name][ext]",
          },
          {
            from: "node_modules/onnxruntime-web/dist/**/*",
            to: "background-removal/[name][ext]",
          },
        ],
      }),
    ],
  },
});
