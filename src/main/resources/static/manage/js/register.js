$().ready(function () {
    var app = new Vue({
        el: '#app',
        data: {
            message: ''
        }
    });
    $("#submit").click(function () {
        if($("#submit.disabled").length===0){
            $.post("/adminRegister",
                {
                    username: $("#inputName").val(),
                    password: md5($("#inputPasswordConfirm").val()),
                    nickname: $("input[name='nickname']").val(),
                    deprt: $("input[name='deprt']").val()
                }, function (data) {
                    if (data.msg === "success") {
                        window.location.href = "index.html";
                    } else if(data.msg==="repeat username"){
                        app.message = "用户名重复";
                        $("#inputName").parent().attr("class","form-group has-error has-danger");
                    }
                }, "json"
            );
        }
        return false;
    });
});