$(document).ready(function () {
    $(".getlogin").hide();

    //光标
    if ($("#inputUsername").val() === "") {
        $("#inputUsername").attr("autofocus", "true");
    } else {
        $("#inputPassword").attr("autofocus", "true");
    }

});