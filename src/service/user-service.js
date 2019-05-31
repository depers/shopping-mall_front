/*
 * @Author: depers 
 * @Date: 2019-05-31 11:42:08 
 * @Last Modified by: depers
 * @Last Modified time: 2019-05-31 11:59:51
 */
'use strict';

var _mm = require('util/mm.js');

var _user = {
    // 退出
    logout: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.html'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查登录状态
    checkLogin: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.html'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
}

module.exports = _user;