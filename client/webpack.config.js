const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv')

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
    ],
  },
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    compress: true,
    port: 3000,
  },
  plugins: [ 
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }), 
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config({path: path.resolve(__dirname, '../.env')}).parsed) // it will automatically pick up key values from .env file
    })
  ],
}
