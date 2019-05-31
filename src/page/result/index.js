/*
 * @Author: depers 
 * @Date: 2019-05-31 16:17:44 
 * @Last Modified by: depers
 * @Last Modified time: 2019-05-31 16:35:15
 */
'use strict';

require('page/common/nav-sample/index.js');
require('./index.css');
var _mm = require('util/mm.js');


$(function(){
    var type = _mm.getUrlParam('type') || 'defualt',
        $element = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})