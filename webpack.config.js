import { lib } from "serverless-webpack";
import ESLintPlugin from "eslint-webpack-plugin";

export const target = "node";
export const entry = lib.entries;
export const mode = lib.webpack.isLocal ? "development" : "production";
export const node = false;
export const optimization = {
  minimize: false,
};
export const devtool = "inline-cheap-module-source-map";
export const plugins = [new ESLintPlugin()];
