const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.ts'],

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
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // favicon: './src/favicon.ico',
    }),
  ],
};
