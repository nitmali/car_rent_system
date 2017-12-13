$(document).ready(function () {
    user();
    loginhtml();
    loginofenter();
    remember();
});

function user() {
    $.get("/getusername",
        function (data) {
            if (data.msg !== "error") {
                if ((data.usertype === "client") && (data.username === $.cookie("username")) && ($.cookie("Token") !== "")) {
                    $(".myself").html(data.username);
                    $(".notlogin").hide();
                    $(".getlogin").show();
                }
            }
            else {
                $.cookie("Token", "");
            }
        }, "json"
    );
}

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

