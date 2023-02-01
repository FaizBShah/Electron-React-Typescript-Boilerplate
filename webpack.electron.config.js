const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  target: 'electron-main',
  entry: path.resolve(__dirname, 'src', 'main', 'main.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: isDev,
    assetModuleFilename: '[name][ext]'
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js', '.json']
  },
  devtool: isDev ? 'source-map' : undefined,
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  }
}
