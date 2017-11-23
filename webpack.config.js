const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

const rv = (...a) => path.resolve(__dirname, ...a);

module.exports = {
  entry: "./src/xuanmiao.js",
  output: {
    path: rv("dist"),
    filename: "[hash]_app.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["react"],
              plugins: ["transform-object-rest-spread", ["transform-class-properties", { "spec": true }]]
            }
          }
        ],
        exclude: [
          rv('node_modules')
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png|gif|jpeg)/,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin(["dist"]),
    new webpack.ProvidePlugin({
      React: "react",
      Component: ["react", "Component"],
      ReactDOM: "react-dom"
    })
  ],
  devServer: {
    open: true,
    port: 666,
    historyApiFallback: true
  },
  devtool: "source-map"
};