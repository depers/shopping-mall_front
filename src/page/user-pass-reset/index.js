/*
 * @Author: depers 
 * @Date: 2019-06-04 15:29:03 
 * @Last Modified by: depers
 * @Last Modified time: 2019-06-04 16:44:53
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
    data: {
        username: '',
        question: '',
        answer: '',
        token: '',
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadStepUsername();
    },
    bindEvent: function () {
        var _this = this;
        // 输入用户名请求密码提示问题的按钮点击
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            // 用户名存在
            if (username) {
                _user.getQuestion(
                    username,
                    function (res) {
                        _this.data.username = username;
                        _this.data.question = res;
                        _this.loadStepQuestion();
                    },
                    function (errMsg) {
                        formError.show(errMsg);
                    }
                );
            }
            // 用户名不存在
            else {
                formError.show('请输入用户名！');
            }
        });
        // 输入密码提示问题答案的按钮点击
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            // 密码提示问题答案存在
            if (answer) {
                // 检查密码提示问题答案
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                    },
                    function (res) {
                        _this.data.answer = answer;
                        _this.data.token = res;
                        _this.loadStepPassword();
                    },
                    function (errMsg) {
                        formError.show(errMsg);
                    }
                );
            }
            // 密码提示问题答案不存在
            else {
                formError.show('请输入密码提示问题的答案！');
            }
        });
        // 输入新密码的按钮点击
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            // 密码不为空
            if (password && password.length >= 6) {
                // 密码提交
                _user.resetPassword({
                    username    : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.data.token
                    },
                    function (res) {
                        window.location.href = './result.html?type=pass-reset'
                    },
                    function (errMsg) {
                        formError.show(errMsg);
                    }
                );
            }
            // 密码为空
            else {
                formError.show('请输入不少于6位的新密码！');
            }
        });
    },
    // 显示提交用户名容器
    loadStepUsername: function () {
        $('.step-username').show();
    },
    // 显示提交密码提示问题答案容器
    loadStepQuestion: function () {
        // 清除错误提示
        formError.hide();
        // 做容器的切换
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    // 显示提交新密码容器
    loadStepPassword: function () {
        // 清除错误提示
        formError.hide();
        // 做容器的切换
        $('.step-question').hide().siblings('.step-password').show();
    },

};

$(function () {
    page.init();
});