const webpack = require('webpack');

var webpackBase = {
    context: __dirname,
    entry: {
        app: [
            './app/js/index.js'
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        publicPath: '/dist/'
    },
    devServer: {
        hot: true,
        inline:true
    },
    devtool: 'cheap-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0']
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            }
        ]
    }
}

module.exports = webpackBase;