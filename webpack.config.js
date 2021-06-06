const currentTask = process.env.npm_lifecycle_event;
const path = require("path");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const mode = process.env.NODE_ENV || "development";
const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";

const entry = {
  app: "./src/app.js",
  about: "./src/js/about.js",
};

const VIEWS = [
  ["./src/index.html", ""],
  ["./src/dashboard.html", "dashboard"],
];

const htmlPages = [];

const getFileName = (str) => {
  return str.split("\\").pop().split("/").pop();
};

VIEWS.forEach((page) => {
  let chunks = ["app"];
  chunks.push(page[1]);
  htmlPages.push(
    new HtmlWebpackPlugin({
      template: page[0],
      filename: getFileName(page[0]),
      minify: false,
      xhtml: true,
      chunks,
    })
  );
});

const config = {
  mode,
  entry,
  target,
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: false,
            },
          },
        ],
      },
      {
        test: /\.(svg|webp|png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    ...htmlPages,
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.STATS || "disabled",
    }),
  ],
  devtool: "source-map",
  devServer: {
    port: 2222,
    contentBase: path.resolve(__dirname, "dist"),
  },
};

if (mode === "production") {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "main.[contenthash:8].css",
    }),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin()
  );
  config.module.rules[1].use[0] = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: "",
    },
  };
}

module.exports = config;
