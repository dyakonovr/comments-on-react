const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "build.js",
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'build.css'
  })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ],
  },
}