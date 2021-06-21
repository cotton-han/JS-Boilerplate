const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['core-js/stable', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/env', {
              useBuiltIns: 'entry',
              corejs: 3,
              targets: {
                browsers: ['last 3 versions', 'ie >= 11'],
                node: 'current'
              }
            }]]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    open: true
  }
}
