/*
 * @Author: depers 
 * @Date: 2019-05-31 11:42:08 
 * @Last Modified by: depers
 * @Last Modified time: 2019-06-03 16:59:38
 */
'use strict';

var _mm = require('util/mm.js');

var _user = {
    // 退出
    logout: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查登录状态
    checkLogin: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 用户登录
    login: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
}

module.exports = _user;