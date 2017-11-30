const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    'app': [
      'react-hot-loader/patch',
      './src/index'
    ],
    'vendor': [
      'react',
      'react-dom',
      'react-bootstrap'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader?name=./img/[name].[hash].[ext]' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./dist']),
    new HtmlWebpackPlugin({
      title: 'Nuzlog - The Pokémon Nuzlocking Journal',
      inject: false,
      template: require('html-webpack-template'),

      appMountId: 'root',
      lang: 'en-US',
      links: [
        {
          id: 'bootstrap',
          href: 'bootstrap/css/bootstrap.min.css',
          rel: 'stylesheet'
        }
      ],
      googleAnalytics: {
        trackingId: 'UA-88281978-1',
        pageViewOnLoad: true
      },
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0'}
      ]
    }),
    new CopyWebpackPlugin([
      { from: './src/bootstrap', to: 'bootstrap'},
      { from: './README.md' },
      { from: './CHANGELOG.md' }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ],
  resolve: {
    modules: ['node_modules', 'src']
  }
};