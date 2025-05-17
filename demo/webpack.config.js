const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const PAGE_TITLE = "Floor Plan Builder";
const VENDORS_LIBRARIES = [
  "immutable",
  "react",
  "react-dom",
  "react-redux",
  "redux",
  "three",
];

module.exports = (env, self) => {
  let isProduction = self.hasOwnProperty("mode")
    ? self.mode === "production"
    : true;
  let port = self.hasOwnProperty("port") ? self.port : 8080;

  if (isProduction) console.info("Webpack: Production mode");
  else console.info("Webpack: Development mode");

  let config = {
    context: path.resolve(__dirname),
    entry: {
      app: "./src/renderer.jsx",
      vendor: VENDORS_LIBRARIES,
    },
    output: {
      path: path.join(__dirname, "dist"),
      // Use [contenthash] for production and simpler [name].js for development
      filename: isProduction ? "[contenthash].[name].js" : "[name].js",
      hashFunction: "sha256", // Keep this
    },
    performance: {
      hints: isProduction ? "warning" : false,
    },
    devtool: isProduction ? "source-map" : "eval",
    devServer: {
      open: true,
      port: port,
      contentBase: path.join(__dirname, "./dist"),
    },
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        "react-planner": path.join(__dirname, "../src/index"),
        "react/jsx-runtime": path.resolve(__dirname, "../src/jsx-runtime-shim.js")
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                compact: false,
                plugins: [
                  "transform-object-rest-spread", // Babel 6 plugin
                  // Correct JSX transform for Babel 6 and React < 17
                  ["transform-react-jsx", { "runtime": "classic" }]
                ],
                presets: ["env", "react"], // Babel 6 presets
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|mtl|obj)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                hash: "sha512",
                digest: "hex",
                name: "[path][name].[ext]",
                context: "demo/src",
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [{ loader: "style-loader/url" }, { loader: "file-loader" }],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: PAGE_TITLE,
        template: "./src/index.html.ejs",
        filename: "index.html",
        inject: "body",
        production: isProduction,
      }),
    ],
    optimization: {
      minimize: isProduction,
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
            minSize: 10000,
            reuseExistingChunk: true,
          },
        },
      },
    },
  };

  if (isProduction) {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production"),
        },
      })
    );
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      isProduction: JSON.stringify(isProduction),
    })
  );

  return config;
};