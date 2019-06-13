/*
 * @Author: depers 
 * @Date: 2019-06-10 20:03:16 
 * @Last Modified by: depers
 * @Last Modified time: 2019-06-13 18:16:59
 */
'use strict';

var _mm = require('util/mm.js');

var _product = {
    // 获取商品列表
    getProductList : function (listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data : listParam,
            success: resolve,
            error: reject
        });
    },
    // 获取商品详情
    getProductDetail : function(productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/detail.do'),
            data : {
                productId : productId
            },
            success: resolve,
            error: reject
        });
    }
    
}

module.exports = _product;