const slsw = require("serverless-webpack");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  target: "node",
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  node: false,
  optimization: {
    minimize: false,
  },
  devtool: "inline-cheap-module-source-map",
  plugins: [new ESLintPlugin()],
};
