const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

const SRC_PATH = path.resolve(ROOT_PATH, 'scripts');
const BUILD_PATH = path.resolve(ROOT_PATH, 'scripts-build');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: 'production',
    entry: {
        'pagea': SRC_PATH+'/floors/indexMain.js'
    },
    devtool: 'cheap-eval-source-map',
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader'
                ]
            },{
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([BUILD_PATH]),
        // new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({ //提取为外部css代码
            filename: '[name].css?v=[contenthash]'
        }),
        new HtmlWebpackPlugin({
            filename: ROOT_PATH + '/floors/index.html',
            chunks: ['pagea'],
            template: path.resolve(__dirname, './template/floors/index.html')
        }),
    ]
};