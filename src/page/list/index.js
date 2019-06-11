/*
 * @Author: depers 
 * @Date: 2019-06-10 18:24:56 
 * @Last Modified by: depers
 * @Last Modified time: 2019-06-11 13:54:53
 */
'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var tempalteHtml = require('./index.string');
var _product = require('service/product-service.js');

var page = {
    data : {
        listParam : {
            keyword     : _mm.getUrlParam('keyword') || '',
            categoryId  : _mm.getUrlParam('categoryId') || '',
            orderBy     :  _mm.getUrlParam('orderBy') || 'default',
            pageNum     :  _mm.getUrlParam('pageNum') || 1,
            pageSize    :  _mm.getUrlParam('pageSize') || 20
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function(){
            // 点击后页码变为1
            _this.data.listParam.pageNum = 1;
            var $this = $(this);
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经有active样式
                if($this.hasClass('active')){
                    return;
                }
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type') === 'price'){
                // active class的处理
                $this.addClass('active').siblings('.sort-item')
                    .removeClass('active asc desc');
                // 升序，降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }
                else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }                
            }
            // 重新加载列表
            _this.loadList();
        })
    },
    // 加载list数据
    loadList : function(){
        var _this = this,
            listHtml = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        // categoryId与keyword不能共存，删除参数中不必要的字段
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _product.getProductList(
            listParam,
            function(res){
                listHtml = _mm.renderHtml(tempalteHtml, {
                    list : res.list
                });
                $pListCon.html(listHtml);
                _this.loadPagination(res.pageNum, res.pages);
            },            
            function(errMsg){
                _mm.errorTips(errMsg);
            }
        )
    },
    // 加载分页信息
    loadPagination : function(pageNum, pages){
        
    }
};

$(function(){
    page.init();
})