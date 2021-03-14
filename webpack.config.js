const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['core-js', './src/index.ts'],

  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: '3000',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.min.js',
  },

  module: {
    rules: [
      {
        test: /\.ts/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },

      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: ['file-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'exports-loader?self.fetch!whatwg-fetch/dist/fetch.umd',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // favicon: './src/favicon.ico',
    }),
  ],
};
