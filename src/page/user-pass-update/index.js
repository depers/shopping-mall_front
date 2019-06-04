/*
 * @Author: depers 
 * @Date: 2019-06-04 18:50:07 
 * @Last Modified by: depers
 * @Last Modified time: 2019-06-04 22:05:01
 */
'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');


// page 逻辑部分
var page = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name : 'user-pass-update',
        });
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交后的动作
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                    password         : $.trim($('#password').val()),
                    passwordNew      : $.trim($('#password-new').val()),
                    passwordConfirm  : $.trim($('#password-confirm').val()),
                },
                validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户信息
                _user.updatePassword(
                    {
                        passwordOld : userInfo.password,
                        passwordNew : userInfo.passwordNew
                    },
                    function(res, msg){
                        _mm.successTips(msg);
                    },
                    function(errMsg){
                        _mm.errorTips(errMsg);
                    }
                );
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        })
    },
    validateForm : function(formData){
        var result = {
            status: false,
            msg: ''
        };
        // 验证原密码是否为空
        if (!_mm.validata(formData.password, 'require')) {
            result.msg = '原密码不能为空！';
            return result;
        }
        // 验证新密码长度
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '新密码长度不得少于6位！';
            return result;
        }
        // 验证密码提示问题是否为空
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的新密码不一致！';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function(){
    page.init();
});