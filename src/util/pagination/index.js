/*
 * @Author: depers 
 * @Date: 2019-06-11 14:39:50 
 * @Last Modified by: depers
 * @Last Modified time: 2019-06-11 15:15:32
 */
'use strict'

require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('util/mm.js');

// 定义类
var Pagination = function(){
    this.defaultOption = {
        container    : null,
        pageNum      : 1,
        pageRange    : 3,
        onSelectPage : null
    };
};

// 渲染分页组件
Pagination.prototype.render = function(userOption){
    // 合并选项
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否是合法的jquery对象
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    // 判断是否只有一页
    // if(this.option.pages <= 1){
    //     return;
    // }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
    
};

// 获取分页的html
// 效果：|上一页| 2 3 4 =5= 6 7 8|下一页| 5/10
Pagination.prototype.getPaginationHtml = function(){
    var html = '',
        option = this.option,
        pageArray = [],
        start = option.pageNum - option.pageRange > 0 
            ? option.pageNum - option.pageRange : 1,
        end = option.pageNum + option.pageRange < option.pages 
            ? option.pageNum + option.pageRange : option.pages;
    // 上一页按钮的数据
    pageArray.push({
        name : '上一页',
        value : this.option.prePage,
        disable : !this.option.hasPreviousPage
    });
    // 数组按钮的处理
    for(var i = start; i <= end; i++){
        pageArray.push({
            name : i,
            value : i,
            active : (i === option.pageNum)
        });
    }
    // 下一页按钮的数据
    pageArray.push({
        name : '下一页',
        value : this.option.nextPage,
        disable : !this.option.hasNextPage
    });
    // 
    html = _mm.renderHtml(templatePagination, {
        pageArray : pageArray,
        pageNum   : option.pageNum,
        pages     : option.pages
    }); 
    return html;  
};
module.exports = Pagination;