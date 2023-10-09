const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    plugins: [
      // Generates an HTML file from a template and injects bundles.
      new HtmlWebpackPlugin({
        template: "./index.html",
        filename: "index.html",
        favicon: "./src/images/flavicon.ico",
      }),

      // Uses custom service worker for Workbox.
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

      // Generates a manifest.json for PWA capabilities.
      new WebpackPwaManifest({
        name: "ScriptShift Text Editor",
        short_name: "ScriptShift",
        description: "A robust text editor for the modern web.",
        background_color: "#ffffff",
        theme_color: "#333333",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          // Handles CSS imports and injects them into the DOM.
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          // Transpiles ES6+ to ES5.
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "assets/[name].[hash:8].[ext]",
              },
            },
          ],
        },
      ],
    },
  };
};

// Starter Code:
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackPwaManifest = require('webpack-pwa-manifest');
// const path = require('path');
// const { InjectManifest } = require('workbox-webpack-plugin');
// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.
// module.exports = () => {
//   return {
//     mode: 'development',
//     entry: {
//       main: './src/js/index.js',
//       install: './src/js/install.js'
//     },
//     output: {
//       filename: '[name].bundle.js',
//       path: path.resolve(__dirname, 'dist'),
//     },
//     plugins: [
//     ],
//     module: {
//       rules: [
//       ],
//     },
//   };
// };
