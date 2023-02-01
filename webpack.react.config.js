const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'app', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist', 'renderer'),
    filename: '[name].[contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  },
  devtool: isDev ? 'source-map' : undefined,
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist', 'renderer')
    },
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'app', 'public', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
    })
  ]
}
