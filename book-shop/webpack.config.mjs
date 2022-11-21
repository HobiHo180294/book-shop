import path from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const header = fs.readFileSync(__dirname + "\\src\\html\\modules\\header.html");
const footer = fs.readFileSync(__dirname + "\\src\\html\\modules\\footer.html");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
console.log("ISDEV: ", isDev);

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: "single",
  };

  if (isProd) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];
  }

  return config;
};

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    "css-loader",
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: ["@babel/preset-env"],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: babelOptions(),
    },
  ];

  return loaders;
};

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      template: "./pages/main/index.html",
      header: header,
      footer: footer,
      minify: {
        collapseWhitespace: isProd,
      },
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/order/index.html",
      header: header,
      footer: footer,
      filename: "order.html",
      minify: {
        collapseWhitespace: isProd,
      },
      chunks: ["order"],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/images/header"),
          to: path.resolve(__dirname, "dist/assets/images/header"),
        },
        {
          from: path.resolve(__dirname, "src/assets/json"),
          to: path.resolve(__dirname, "dist/assets/json"),
        },
        {
          from: path.resolve(__dirname, "src/assets/images/footer"),
          to: path.resolve(__dirname, "dist/assets/images/footer"),
        },
      ],
    }),
  ];

  if (isProd) {
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
};

export default {
  context: path.resolve(__dirname, "src"),

  mode: "development",

  target: "web",

  entry: {
    main: ["@babel/polyfill", "@main/script.mjs"],
    donate: ["@babel/polyfill", "@order/script.mjs"],
  },

  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@main": path.resolve(__dirname, "src/pages/main"),
      "@order": path.resolve(__dirname, "src/pages/order"),
      "@html-modules": path.resolve(__dirname, "src/html/modules"),
      "@scss-modules": path.resolve(__dirname, "src/scss/modules"),
      "@js-modules": path.resolve(__dirname, "src/js/modules"),
      "@images": path.resolve(__dirname, "src/assets/images"),
    },
  },

  optimization: optimization(),

  devtool: isDev ? "source-map" : "eval",

  devServer: {
    port: 4900,
    hot: isDev,
    open: true,
  },

  plugins: plugins(),

  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },

      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("sass-loader"),
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: isDev
            ? "assets/images/css-backgrounds/[name].[contenthash][ext]"
            : "assets/images/css-backgrounds/[name][ext]",
        },
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
