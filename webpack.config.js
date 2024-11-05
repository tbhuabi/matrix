const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const ip = require('ip');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    index: path.resolve(__dirname, 'index.tsx')
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@tanbo/matrix': path.resolve('src/public-api.ts'),
      '@tanbo/': path.resolve('src'),
    }
  },
  devServer: {
    host: ip.address(),
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9027,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      //   {
      //   test: /\.ts$/,
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   loader: [{
      //     loader: 'eslint-loader'
      //   }]
      // },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            // loader: 'css-loader',
            loader: '@viewfly/devtools/scoped-css-webpack-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
      }
    ]
  },
  plugins: [
    // new EslintWebpackPlugin({
    //   extensions: ['.ts', '.tsx'],
    //   exclude: ['./index.tsx'],
    //   threads: os.cpus().length,
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
};
