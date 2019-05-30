/*
 * @Author: depers(fengxiao) 
 * @Date: 2019-04-28 11:38:07 
 * @Last Modified by: depers
 * @Last Modified time: 2019-05-30 16:21:17
 */
'use strict';
var _mm = require("util/mm.js")

var html = "<div>{{data}}</div>";
var data = {
    data: 123
}

console.log(_mm.renderHtml(html, data));