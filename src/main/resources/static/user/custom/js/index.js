$(document).ready(function () {

    $(".getlogin").hide();

    $.get("/getusername",
        function (data) {
            if (data.msg !== "error") {
                if ((data.usertype === "client") && (data.username === $.cookie("Token"))) {
                    $(".myself").html(data.username);
                    $(".notlogin").hide();
                    $(".getlogin").show();
                    $("#loginmodal").modal("hide")
                }
            }
        }, "json"
    );

    //光标
    if ($("#inputUsername").val() === "") {
        $("#inputUsername").attr("autofocus", "true");
    } else {
        $("#inputPassword").attr("autofocus", "true");
    }

});

