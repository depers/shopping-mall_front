/*
 * @Author: depers(fengxiao) 
 * @Date: 2019-04-28 11:36:11 
 * @Last Modified by: depers
 * @Last Modified time: 2019-06-03 18:48:29
 */
require('page/common/nav-sample/index.js');
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 表单里的错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');;
    }
}
// page 逻辑部分
var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        // 验证usename
        $('#username').blur(function () {
            var username = $.trim($(this).val()); // 这里的 $(this)指的就是$('#username')这个对象
            // 如果用户名为空，我们不做验证
            if(!username){
                return;
            }
            // 异步验证用户名是否存在
            _user.checkUsername(username,
                function (res) {
                    formError.hide();
                },
                function (errMsg) {
                    formError.show(errMsg);
                });
        });
        // 注册按钮点击事件
        $('#submit').click(function () {
            _this.submit();
        });
        // 如果按下回车也进行提交
        $('.user-content').keyup(function (e) {
            // keycode为13表示回车键
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    // 提交表单
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val()),
        },
            // 表单验证结果
            validateResult = this.formValidata(formData);
        // 验证成功
        if (validateResult.status) {
            // 提交
            _user.register(formData,
                function (res) {
                    window.location.href = './result.html?type=register';
                },
                function (errMsg) {
                    formError.show(errMsg);
                })
        }
        // 验证失败
        else {
            // 错误提示
            formError.show(validateResult.msg);
        }
    },
    // 表单验证
    formValidata: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        // 验证用户名是否为空
        if (!_mm.validata(formData.username, 'require')) {
            result.msg = '用户名不能为空！';
            return result;
        }
        // 验证密码是否为空
        if (!_mm.validata(formData.password, 'require')) {
            result.msg = '密码不能为空！';
            return result;
        }
        // 验证密码长度
        if (formData.password.length < 6) {
            result.msg = '密码长度不能小于6位！';
            return result;
        }
        // 验证两次输入的密码是否一致
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致！';
            return result;
        }
        // 验证手机号
        if (!_mm.validata(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确！';
            return result;
        }
        // 验证邮箱
        if (!_mm.validata(formData.email, 'email')) {
            result.msg = '邮箱格式不正确！';
            return result;
        }
        // 验证密码提示问题是否为空
        if (!_mm.validata(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空！';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if (!_mm.validata(formData.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空！';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function () {
    page.init();
});