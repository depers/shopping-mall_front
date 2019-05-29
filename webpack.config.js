/*
 * @Author: depers(fengxiao) 
 * @Date: 2019-04-28 11:29:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-29 18:12:25
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

// 环境变量的配置, dev/ online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';


// 获取html-webpack-pugin参数的方法
var getHtmlConfig = function(name){
    return {
        template: './src/view/'+ name +'.html',
        filename: 'view/'+ name +'.html', 
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
}

// webpack config
var config = {
    entry: {
        // 配置输入文件
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
    },
    output: {
        // 存放文件的路径
        path: './dist',
        // webpack-dev-server配置，访问文件的路径
        publicPath: '/dist', 
        // 配置输出文件
        filename: 'js/[name].js'
    },
    externals: {
        // 模块化引用jquery
        'jquery': 'window.jQuery',
    },

    module: {
        loaders: [
            // 对css的loader
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            // 对图片、字体、icon的loader
            { 
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
                loader: 'url-loader?limit=100&name=resource/[name].[ext]' 
            },
        ],
    },

    plugins: [
        // 提取公共模块，独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            // 输出文件
            filename: 'js/base.js'
        }),
        // 配置css单独打包
        new ExtractTextPlugin("css/[name].css"),
        // 配置html模板
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;