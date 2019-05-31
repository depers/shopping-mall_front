/*
 * @Author: depers 
 * @Date: 2019-05-31 11:58:46 
 * @Last Modified by: depers
 * @Last Modified time: 2019-05-31 12:00:49
 */
'use strict';

var _cart = {
    // 获取购物车数量
    getCartCount: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    },

}

module.exports = _cart;