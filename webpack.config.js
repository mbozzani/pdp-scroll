const path = require("path")

module.exports = {
  entry: path.resolve(__dirname, "src/scripts.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts_bundle.js",
    library: "$",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  mode: "development",
}