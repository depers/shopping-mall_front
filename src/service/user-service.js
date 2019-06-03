/*
 * @Author: depers 
 * @Date: 2019-05-31 11:42:08 
 * @Last Modified by: depers
 * @Last Modified time: 2019-06-03 18:51:14
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
            url: _mm.getServerUrl('/user/getUserInfo.do'),
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
    },
    // 检查用户是否已注册
    checkUsername: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/checkValid.do'),
            data: {
                type: 'username',
                str: username,
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 用户注册
    register : function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
}

module.exports = _user;