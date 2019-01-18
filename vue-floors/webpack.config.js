const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ClearWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const webpack=require('webpack');
module.exports={
    entry:'',
    output:{

    },
    devServer:{

    },
    module:{
        rules:[
            {

            }
        ]
    },
    plugins:[
        new ClearWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: `[name]_[contenthash:8].css`,
			chunkFilename: '[name]_[contenthash:8].css'
        }),
        new ParallelUglifyPlugin({
			// 传递给 UglifyJS的参数如下：
			uglifyJS: {
				output: {
					/*
					 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
					 可以设置为false
					*/
					beautify: false,
					/*
					 是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
					*/
					comments: false
				},
				compress: {
					/*
					 是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
					 不大的警告
					*/
					warnings: false,

					/*
					 是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
					*/
					drop_console: true,

					/*
					 是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
					 转换，为了达到更好的压缩效果，可以设置为false
					*/
					collapse_vars: true,

					/*
					 是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
					 var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
					*/
					reduce_vars: true
				}
			}
        }),
        new HtmlWebpackPlugin({
			filename:'index.html',
			template: './index.html'
		}),
		new HappyPack({
			id: 'image',
			loaders: [{
				loader: require.resolve('url-loader'),
				options: {
					limit: 10000,
					name: '[name].[ext]'
				}
			}]
        }),
        new webpack.HotModuleReplacementPlugin()    //引入热更新插件
    ]
}