var table;
$().ready(function () {
    table = $("#giveback_table").DataTable({
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        responsive: true,
        bAutoWidth: true,
        processing: true,
        ajax: {
            url: '/givebackLogs',
            type: 'get',
            datatype: 'json',
            dataSrc: ''
        },
        columns: [
            {data: 'id'},
            {data: 'client.username'},
            {data: 'car.licensePlate'},
            {data: null}
        ],
        columnDefs: [{
            targets: 3,
            render: function (row) {
                var id = row.id;
                return '<a type="button" class="btn btn-success" href="#" onclick="btn_action(' + id + ')">归还</a>';
            }
        },
            {"orderable": false, "targets": 3}
        ]
    });

});

function btn_action(id) {
    $.ajax({
        url: '/givebackCar',
        type: "POST",
        dataType: "json",
        data: {
            "id": id
        },
        success: function (data) {
            if (data.msg === "success") {
                table.ajax.reload(null, false);
            } else {
                console.log("error");
            }
        },
        error: function () {
            alert("System Error!");
        }
    });
}
