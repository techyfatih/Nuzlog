const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: ["react-hot-loader/patch", "./src/index"],
    vendor: ["react", "react-dom"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist")
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader?name=./img/[name].[hash].[ext]"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["./dist"]),
    new HtmlWebpackPlugin({
      title: "Nuzlog - The Pokémon Nuzlocking Journal",
      inject: false,
      template: require("html-webpack-template"),

      appMountId: "root",
      lang: "en-US",
      googleAnalytics: {
        trackingId: "UA-88281978-1",
        pageViewOnLoad: true
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1.0" }
      ]
    }),
    new CopyWebpackPlugin([{ from: "./README.md" }, { from: "./CHANGELOG.md" }])
  ],
  resolve: {
    modules: ["node_modules", "src"]
  }
};
