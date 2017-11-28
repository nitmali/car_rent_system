$().ready(function () {
    const app = new Vue({
        el: 'div.panel-body',
        data: {
            name: '',
            deprt: '',
            nickname: '',
            passwd: ''
        }
    });
    $('#form').validator();
    $.get("/adminInfo",
        function (data) {
            app.name = data.username;
            app.deprt = data.deprt;
            app.nickname = data.nickname;
        });
    $("#submit").click(function () {
        if ($("#submit.disabled").length === 0) {
            $.post("/adminInfo",
                {
                    username: app.name,
                    password: md5(app.passwd),
                    nickname: app.nickname,
                    deprt: app.deprt
                }, function (data) {
                    if (data.msg === "success") {
                        window.location.href = "index.html";
                    }
                }, "json"
            );
        }
        return false;
    });
});