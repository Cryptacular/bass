const path = require("path");

module.exports = {
  entry: {
    bass: "./src/index.ts",
    "examples/text": "./src/examples/text",
    "examples/class": "./src/examples/class",
    "examples/computed": "./src/examples/computed",
    "examples/input": "./src/examples/input",
    "examples/visible": "./src/examples/visible",
    "examples/invisible": "./src/examples/invisible"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: "pre",
        loader: "tslint-loader",
        exclude: /src\/polyfills/,
        options: {
          tsConfigFile: "tsconfig.json"
        }
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  }
};
