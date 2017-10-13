const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        'app': [
            'react-hot-loader/patch',
            './src/index.js'
        ],
        'vendor': [
            'react',
            'react-dom',
            'react-bootstrap'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: [ 'react-hot-loader/webpack', 'babel-loader' ] },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(png|svg|jpg|gif)$/, loader: 'file-loader' }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Nuzlog',
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
            ]
        }),
        new CopyWebpackPlugin([
            { from: './src/bootstrap', to: 'bootstrap'}
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
        modules: ['node_modules', 'src/data']
    }
};