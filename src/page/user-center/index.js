/*
 * @Author: depers 
 * @Date: 2019-06-04 16:59:39 
 * @Last Modified by: depers
 * @Last Modified time: 2019-06-04 18:12:10
 */
'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var tempalteHtml = require('./index.string');
var _user = require('service/user-service.js');


// page 逻辑部分
var page = {
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name : 'user-center',
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(
            function(res){
                userHtml = _mm.renderHtml(tempalteHtml, res);
                $('.panel-body').html(userHtml);
            },
            function(errMsg){
                _mm.errorTips(errMsg);
            }
        );
    }
};

$(function(){
    page.init();
});