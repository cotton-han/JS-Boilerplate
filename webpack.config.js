const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env) => ({
  mode: env.production ? 'production' : 'development',
  entry: ['core-js/stable', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ESLintPlugin()
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
})
