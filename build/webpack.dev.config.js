var path = require('path')
var webpack = require('webpack')
var HTMLWebpackPlugin = require('html-webpack-plugin')

var PORT = 2224
var HOST = 'http://localhost'
var URL = `${HOST}:${PORT}`

module.exports = {
  context: path.resolve(__dirname, '../src'),

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?${URL}`,
    'webpack/hot/only-dev-server',
    './index.tsx'
  ],

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: ''
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },

  module: {
    rules: [
      { test: /\.js$/, enforce: 'pre', use: ['source-map-loader'] },
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        use: [{
          loader: 'tslint-loader',
          options: {
            tsConfigFile: 'tsconfig.json'
          }
        }]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('precss'),
                  require('autoprefixer')
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff(?:2)?)(\?[a-z0-9]+)?$/,
        use: ['url-loader?limit=1000']
      },
      {
        test: /\.svg?(\?[a-z0-9]+)?$/,
        use: ['url-loader?limit=1000']
      },
      {
        test: /\.(jpe?g|png|gif|ogg|mp3)$/,
        use: ['url-loader?limit=1000']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HTMLWebpackPlugin({
      template: './app.html',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin() // prints more readable module names in the browser console on HMR updates
  ],

  devtool: 'source-map',

  devServer: {
    hot: true,
    compress: true,
    contentBase: path.resolve(__dirname, '../src'),
    port: PORT,
    publicPath: URL,
    historyApiFallback: true,
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }
  }
}