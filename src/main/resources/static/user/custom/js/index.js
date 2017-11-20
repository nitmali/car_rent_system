$(document).ready(function () {

    $(".getlogin").hide();

    $.get("/getusername",
        function (data) {
            if (data.msg !== "error") {
                $(".myself").html(data.username);
                $(".notlogin").hide();
                $(".getlogin").show();
                $("#loginmodal").modal("hide")
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

