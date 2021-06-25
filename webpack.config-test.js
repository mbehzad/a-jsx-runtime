// this file is used for bundling when mocha tests will run
const nodeExternals = require('webpack-node-externals');
const regularConfig = require("./webpack.config.js");


// @see https://github.com/zinserjan/mocha-webpack/blob/master/docs/installation/webpack-configuration.md
module.exports = {
  module: regularConfig.module,
  resolve: regularConfig.resolve,
  mode: "development",
  target: 'node', // webpack should compile node compatible code
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: "inline-cheap-module-source-map", // for better debugging
};
