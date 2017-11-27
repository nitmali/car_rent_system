var flag = [[false], [false], [false], [false], [false]];
// 协议：0 用户名：1 密码：2 身份证：3 手机号码：4

//post
function register() {

    if ($('#checkbox').is(':checked')) {
        $("#registerspan").html("");
        flag[0] = true;
    }
    if (flag[0] === true && flag[1] === true && flag[2] === true && flag[3] === true && flag[4] === true) {
        $.post("/clientRegister",
            {
                username: $("#inputUsernameRegister").val(),
                password: md5($("#inputPasswordConfirm").val()),
                idCard: $("#inpuId").val(),
                phone: $("#inputPhone").val()
            }, function (data) {
                if (data.msg === "success") {
                    window.location.href = "index.html";
                } else {
                    nameorid(data.msg)
                }
            }, "json"
        );
    }
    else if (flag[1] === true && flag[2] === true && flag[3] === true && flag[4] === true) {
        $("#registerspan").html("请阅读本网站服务条款")
    }
    else {
        $("#registerspan").html("请填写完整有效的注册信息")
    }
}

//协议

//username
function Inputusername() {
    $("#UsernameSpan").html("");
}

function nameorid(ERROR) {
    if (ERROR === "nameerror") {
        $("#UsernameSpan").html("用户名已存在");
    }
    if (ERROR === "iderror") {
        $("#IdSpan").html("身份证信息已被注册");
    }
}

function compareusername() {
    if ($("#inputName").val() !== "") {
        flag[1] = true;
    }
}
//password
function comparepassword() {
    $("#registerspan").html("");
    if ($("#inputPasswordRegister").val().length < 6 && $("#inputPasswordRegister").val() !== "") {
        $("#PasswordSpan").html("请输入至少6位数的密码");
    }
    if ($("#inputPasswordConfirm").val() !== $("#inputPasswordRegister").val() && $("#inputPasswordConfirm").val() !== "") {
        $("#PasswordConfirmSpan").html("两次密码输入不一致");
    }
    if ($("#inputPasswordConfirm").val() === $("#inputPasswordRegister").val() && $("#inputPasswordConfirm").val() !== "") {
        flag[2] = true;
    }
}

function InputPassword() {
    $("#registerspan").html("");
    $("#PasswordConfirmSpan").html("");
    $("#PasswordSpan").html("");
}

function InputPasswordConfirm() {
    $("#registerspan").html("");
    $("#PasswordConfirmSpan").html("");
}
//idcard
function compareid() {
    $("#registerspan").html("");
    var id = $("#inpuId").val();
    if (id.length !== 18 && $("#inpuId").val() !== "") {
        $("#IdSpan").html("请输入18位有效身份证号码");
    }
    else {
        flag[3] = true;
    }
}

function Inputid() {
    $("#registerspan").html("");
    $("#IdSpan").html("");
}
//phone
function comparephone() {
    $("#registerspan").html("");
    var phone = $("#inputPhone").val();
    if (phone.length !== 11 && $("#inputPhone").val() !== "") {
        $("#PhoneSpan").html("请输入11位有效手机号码");
    }
    else {
        flag[4] = true;
    }
}

function Inputphone() {
    $("#registerspan").html("");
    $("#PhoneSpan").html("");
}

$(document).ready(function () {
    $("#inputUsernameRegister")[0].focus();
});

