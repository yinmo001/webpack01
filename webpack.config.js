// webpack 是node写出来的

let path = require('path')

let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let webpack = require('webpack')
let {CleanWebpackPlugin} = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')

console.log(path.resolve(__dirname, 'build'))
module.exports = {
  optimization: {// 优化项
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCss()
    ]
  },
  devServer: {// 开发服务器的配置
    port: 3000,
    // progress: true,
    contentBase: './dist',
    compress: true
  },
  mode: 'development',// production development
  entry: './src/index.js',
  // watch: true,// 實時打包
  // watchOptions: {
  //   poll: 1000,// 每秒詢問次數
  //   aggregateTimeout: 500,// 防抖
  //   ignored: /node_modules/
  // },
  output: {
    filename: 'bundle.[hash:8].js',// 打包后的文件名
    path: path.resolve(__dirname, 'dist'),// 路径必须是绝对路径
    // publicPath: 'http://www.zhufengpeixun.cn'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    new webpack.ProvidePlugin({// 在每个模块注入$
      $: 'jquery'
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new webpack.BannerPlugin('make 20200530 by wangkun'),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: './doc', to: 'dist'}
      ]
    })
  ],
  module:{// 模块
    rules:[
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
            outputPath: '/img/',
            esModule: false
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime'
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      // 规则  css-loader 处理@import语法
      // style-loader 把css插入html head 标签
      // loader 特点：功能单一，执行顺序从右向左，从下向上
      {
        test: /\.css$/, 
        use: [
          MiniCssExtractPlugin.loader,// 抽离文件，塞到link标签
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/, 
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'// less->css
        ]
      },
    ]
  }
}