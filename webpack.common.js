const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  entry: {
    game: './src/client/index.js'
  },
  // 将打包文件输入到dist文件
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // 使用babel解析js
      {
        test: /\.js$/,
        exclude: /node_moules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // 将js 中的css 抽出来
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    // 将处理后的js 以及css 置于html 中
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/client/html/index.html'
    })
  ]
}