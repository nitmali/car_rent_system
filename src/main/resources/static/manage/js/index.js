$().ready(function () {
    $.ajax({
        url: "/countCarsByStatus",
        type: "get",
        dataType: "json",
        data: {
            "status": status
        },
        success: function (data) {
            Morris.Donut({
                element: 'morris-donut-chart',
                data: [{
                    label: "空闲",
                    value: data.IDLE
                }, {
                    label: "不可用",
                    value: data.UNAVAILABLE
                }, {
                    label: "已借出",
                    value: data.USING
                }],
                resize: true
            });
        },
        error: function () {
            alert("System Error!");
        }
    });

    $.get('/countCarLogs', function (data) {
        Morris.Bar({
            element: 'morris-bar-chart',
            data: data,
            xkey: 'licensePlate',
            ykeys: ['count'],
            labels: ['数量'],
            resize: true
        });
    });


});
