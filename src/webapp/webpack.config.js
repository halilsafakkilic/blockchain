const webpack = require('webpack');

const path = require('path');
const stripJsonComments = require('strip-json-comments');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// For tsconfig>paths support
const tsconfig = JSON.parse(stripJsonComments(require('fs').readFileSync('./tsconfig.json', 'utf8')));
const convertPathsToAliases = require("convert-tsconfig-paths-to-webpack-aliases").default;
const aliases = convertPathsToAliases(tsconfig);

// Read .env
const dotenv = require('dotenv');
dotenv.config();

module.exports = {

  // webpack will take the files from ./src/index
  entry: './src/index',

  // and output it into /dist as bundle.js
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },

  // 404s fallback
  devServer: {
    historyApiFallback: true
  },

  // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
  resolve: {
    alias: aliases,
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [

      // we use babel-loader to load our jsx and tsx files
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },

      // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // Pass Env Params
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV)
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};