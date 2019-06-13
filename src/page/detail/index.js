/*
 * @Author: depers 
 * @Date: 2019-06-13 16:31:59 
 * @Last Modified by: depers
 * @Last Modified time: 2019-06-13 18:39:33
 */
'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var tempalteHtml = require('./index.string');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');


var page = {
    data : {
        listParam : {
           productId    : _mm.getUrlParam('productId') || '',
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 如果没有传productId，自动跳回首页
        if(!this.data.listParam.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        
    },
    // 加载商品详细信息
    loadDetail : function(){
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _product.getProductDetail(
            this.data.listParam.productId,
            function(res){
                _this.filter(res);
                html = _mm.renderHtml(tempalteHtml, res);
                $('.page-wrap').html(html);
            },
            function(errMsg){
                $('.page-wrap').html('<p class="err-tip">此商品太淘气，找不到了~</p>')
            })
    },
    // 数据匹配
    filter : function(data){
        data.subImg = data.subImg.split(',');
    }
};

$(function(){
    page.init();
})