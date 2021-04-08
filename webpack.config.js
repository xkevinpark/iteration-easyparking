const path = require('path');

const rules = [
  {
    test: /\.(js|jsx|ts)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: ['@babel/react', '@babel/env']
    }
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      "style-loader",
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      "sass-loader",
    ],
  }
  // {
  //   test: /\.(gif|png|jpe?g|svg)$/i,
  //   use: [
  //     'file-loader',
  //     {
  //       loader: 'image-webpack-loader',
  //       options: {
  //         bypassOnDebug: true, // webpack@1.x
  //         disable: true, // webpack@2.x and newer
  //       },
  //     },
  //   ],
  // }
  // {
  //   test: /\.html$/,
  //   exclude: /node_modules/,
  //   loader: 'html-loader'
  // },
  // {
  //   test: /\.png$/,
  //   exclude: /node_modules/,
  //   loader: 'file-loader?name=images/[name].[ext]'
  // }
];



module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules
  },

  devServer: {
    publicPath: '/build',
    compress: true,
    port: 8080,
    proxy: {
      '/': 'http://localhost:3000/'
    },
  }
}