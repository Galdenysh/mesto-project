const path = require("path"); // Подключение утилиты, которая превращает относительный путь в абсолютный
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Плагин для работы с HTML
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // Плагин отчищающий dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Плагин для работы с CSS

module.exports = {
  entry: { main: "./src/components/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },

  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/images/favicon/logo-48.png",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
