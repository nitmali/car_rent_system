var table;
var vm_client = new Vue({
    el: '#modal-client',
    data: {
        username: "",
        idCard: "",
        phone: "",
        imgsrc: ""
    }
});
$().ready(function () {
    table = $("#review_table").DataTable({
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
            url: '/manage/reviewLogs',
            type: 'get',
            datatype: 'json',
            dataSrc: ''
        },
        columns: [
            {data: 'id'},
            {data: 'client.username'},
            {data: 'car.licensePlate'},
            {data: 'planingLendStartTime'},
            {data: 'planingLendEndTime'},
            {data: 'submitTime'},
            {data: null}
        ],
        columnDefs: [{
            targets: 6,
            render: function (row) {
                return '<a type="button" class="btn btn-primary" href="#" onclick="btn_action(' + row.id + ',\'PASS\')">通过(取车)</a> <a type="button" class="btn btn-danger" onclick="btn_action(' + row.id + ',\'REJECT\')" href="#">拒绝</a>';
            }
        },
            {"orderable": false, "targets": 6}
        ]
    });
    $('#review_table tbody').on('click', 'td:nth-child(2)', function () {
        var rowdata = table.row(this).data();
        vm_client.username = rowdata.client.username;
        vm_client.idCard = rowdata.client.idCard;
        vm_client.phone = rowdata.client.phone;
        vm_client.imgsrc = "/driverLicenseImage?id=" + rowdata.client.id;
        $("#modal-client").modal();
    });
});

function btn_action(id, type) {
    $.ajax({
        url: '/manage/reviewLogs',
        type: "POST",
        dataType: "json",
        data: {
            "id": id,
            "type": type
        },
        success: function (data) {
            if (data.msg === "success") {
                table.ajax.reload(null, false);
            } else {
                console.log(data);
                alert("车辆不可用");
            }
        },
        error: function () {
            alert("System Error!");
        }
    });
}
