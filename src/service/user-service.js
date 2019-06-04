/*
 * @Author: depers 
 * @Date: 2019-05-31 11:42:08 
 * @Last Modified by: depers
 * @Last Modified time: 2019-06-04 22:02:15
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
    // 获取用户密码提示问题
    getQuestion : function(username, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            data: {
                username : username,
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查密码提示问题答案
    checkAnswer : function(userInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 忘记密码重置新密码
    resetPassword : function(userInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 获取用户信息
    getUserInfo : function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 更新用户信息
    updateUserInfo : function(resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/update_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 登录状态下更改密码
    updatePassword : function(userInfo, resolve, reject){
        _mm.request({
            url: _mm.getServerUrl('/user/reset_password.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
}

module.exports = _user;