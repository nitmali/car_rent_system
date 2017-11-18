function loginin() {
    if ($("#inputUsername").val() !== "" && $("#inputPassword").val() !== "") {
        $.post("/api/login/client",
            {
                username: $("#inputUsername").val(),
                passwd: md5($("#inputPassword").val()),
            },
            function (data) {
                if (data.msg === "success") {
                    //window.location.href = "index.html";
                    $("#notlogin").hide();
                    $("#getlogin").show();
                    $('#loginmodal').modal('hide')
                } else if (data.msg === "wid") {
                    alert("账号或者密码错误!");
                }
            }, "json"
        );
    }
}
