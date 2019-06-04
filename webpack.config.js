/*
 * @Author: depers(fengxiao) 
 * @Date: 2019-04-28 11:29:13 
 * @Last Modified by: depers
 * @Last Modified time: 2019-06-04 18:49:27
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

// 环境变量的配置, dev/ online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';


// 获取html-webpack-pugin参数的方法
var getHtmlConfig = function(name, title){
    return {
        template: './src/view/'+ name +'.html',
		filename: 'view/'+ name +'.html', 
		title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
}

// webpack config
var config = {
    entry: {
        // 配置输入文件，其中common必须和后面路径中的common文件夹对应
        'common'	            : ['./src/page/common/index.js'],
        'index' 	            : ['./src/page/index/index.js'],
        'user-login'	        : ['./src/page/user-login/index.js'],
        'user-register'	        : ['./src/page/user-register/index.js'],
        'user-pass-reset'	    : ['./src/page/user-pass-reset/index.js'],
        'user-center'	        : ['./src/page/user-center/index.js'],
        'user-center-update'	: ['./src/page/user-center-update/index.js'],
        'user-pass-update'  	: ['./src/page/user-pass-update/index.js'],
        'result'	            : ['./src/page/result/index.js'],
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
            { 
                test: /\.string$/, 
                loader: 'html-loader' 
            },
        ],
    },

    resolve: {
        // 别名配置，方便引用
        alias: {
            util         : __dirname + '/src/util',
            page         : __dirname + '/src/page',
            service      : __dirname + '/src/service',
            image        : __dirname + '/src/image',
            node_modules : __dirname + '/node_modules',
        }
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
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '用户密码重置')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '用户密码修改')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;