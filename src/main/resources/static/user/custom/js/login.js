$(document).ready(function () {
    loginhtml();
    loginofenter();
    remember();
});

function loginhtml() {
    var login = "<div class=\"modal fade\" id=\"loginmodal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n" +
        "  <div class=\"container\">\n" +
        "    <div class=\"row\">\n" +
        "      <div class=\"col-md-offset-3 col-md-6\">\n" +
        "        <div class=\"form-horizontal\">\n" +
        "          <button type=\"button\" class=\"close\" data-dismiss=\"modal\"\n" +
        "                  aria-hidden=\"true\">\n" +
        "            &nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;\n" +
        "          </button>\n" +
        "          <span class=\"heading\">" +
        "            用户登录<br><br>" +
        "            <div><a href='../../user/pages/register.html' style='font-size: 15px'>没有账号？点击注册</a></div>" +
        "          </span>\n" +
        "          <div class=\"form-group\">\n" +
        "            <input type=\"text\" class=\"form-control\" id=\"inputUsername\" placeholder=\"用户名\">\n" +
        "            <i class=\"fa fa-user\"></i>\n" +
        "          </div>\n" +
        "          <div class=\"form-group help\">\n" +
        "            <input type=\"password\" class=\"form-control\" id=\"inputPassword\" placeholder=\"密　码\">\n" +
        "            <i class=\"fa fa-lock\"></i>\n" +
        "            <a href=\"#\" class=\"fa fa-question-circle\"></a>\n" +
        "          </div>\n" +
        "          <div class=\"form-group help\">\n" +
        "            <span class=\"text-danger\" id=\"loginmessage\"></span>\n" +
        "          </div>\n" +
        "          <div class=\"form-group\">\n" +
        "            <div class=\"main-checkbox\">\n" +
        "              <input type=\"checkbox\" value=\"None\" id=\"checkbox1\" name=\"check\"/>\n" +
        "              <label for=\"checkbox1\"></label>\n" +
        "            </div>\n" +
        "            <span class=\"text\">Remember me</span>\n" +
        "            <button class=\"btn btn-default\" onclick=\"loginin()\">登录</button>\n" +
        "          </div>\n" +
        "        </div>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "</div>";

    $(".loginhtml").html(login);
}

function remember() {
    $("#checkbox1").attr("checked", 'true');
    if ($.cookie("rmbUser") === "true") {
        $("#ck_rmbUser").attr("checked", true);
        $("#inputUsername").val($.cookie("username"));
        //$("#inputPassword").val($.cookie("password"));
    }
}

function loginofenter() {
    var modal_status = 0;//默认隐藏
    $('#loginmodal').on('show.bs.modal', function () {
        modal_status = 1;
    });
    $('#loginmodal').on('hidden.bs.modal', function () {
        modal_status = 0;
    });
    $(document).keydown(function (event) {
        if (event.keyCode === 13 && modal_status === 1) {
            loginin();
        }
    });
}

function loginin() {
    var logintime = new Date().getTime();
    //令牌
    var str_username = $("#inputUsername").val();
    $.cookie("Token", str_username + logintime, {expires: 7});
    // Remember Me
    if ($('#checkbox1').is(':checked')) {
        $.cookie("rmbUser", "true", {expires: 7});
        $.cookie("username", str_username, {expires: 7});
        // $.cookie("password", str_password, {expires: 7});
    } else {
        $.cookie("username", "", {expires: -1});
    }

    //登录验证
    if ($("#inputUsername").val() !== "" && $("#inputPassword").val() !== "") {
        $.post("/api/login/client",
            {
                username: $("#inputUsername").val(),
                passwd: md5($("#inputPassword").val())
            },
            function (data) {
                if (data.msg === "success") {
                    $(".myself").html($("#inputUsername").val());
                    $(".notlogin").hide();
                    $(".getlogin").show();
                    $("#loginmodal").modal("hide")
                } else {
                    $("#loginmessage").html("  账号或者密码错误");
                }
            }, "json"
        );
    }
}

function logout() {
    $(".notlogin").show();
    $(".getlogin").hide();
    $.cookie("Token", "");
}

//jquery.cookie.js
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {
        }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, {expires: -1}));
        return !$.cookie(key);
    };

}));

