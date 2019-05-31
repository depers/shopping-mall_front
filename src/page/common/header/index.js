/*
 * @Author: depers 
 * @Date: 2019-05-31 12:21:16 
 * @Last Modified by: depers
 * @Last Modified time: 2019-05-31 14:45:16
 */
'use strict';
var _mm = require('util/mm.js');
require('./index.css');

// 通用页面头部导航
var header = {
    init : function(){
        this.bindEvent();
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        // 搜索input内容回填
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    bindEvent : function(){
        var _this = this;
        // 点击搜索按钮以后，进行搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        // 输入回车后，做搜索提交
        $('#search-input').keyup(function(e){
            // 13是回车键的keyword
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    // 搜索的提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        // 如果提交的时候有keyword，正常跳转到list页
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }
        // 如果keyword为空，直接返回首页
        else{
            _mm.goHome();
        }
    }
};

header.init();