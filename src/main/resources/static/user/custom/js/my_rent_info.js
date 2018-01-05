// $('iframe').hover(
//     function () {
//         SetCwinHeight();
//     }
// );
//
// function SetCwinHeight() {
//     var iframeid = document.getElementById("iframeid"); //iframe id
//     if (document.getElementById) {
//         if (iframeid && !window.opera) {
//             if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight) {
//                 iframeid.height = iframeid.contentDocument.body.offsetHeight;
//             } else if (iframeid.Document && iframeid.Document.body.scrollHeight) {
//                 iframeid.height = iframeid.Document.body.scrollHeight;
//             }
//         }
//     }
// }
let table;

$(document).ready(function () {
    new_table('');
});

function new_table(status) {
    $("#order_table").dataTable().fnDestroy();
    table = $("#order_table").DataTable({
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
        searching: false,
        bSort: true,
        aaSorting: [[0, "desc"]],
        ajax: {
            url: '/historyRenting',
            data: {
                status: status
            },
            type: 'get',
            datatype: 'json',
            dataSrc: ''
        },
        columns: [
            {data: 'id'},
            {data: 'car.licensePlate'},
            {
                data: function (obj) {
                    if (obj.lendStartTime === null) return null;
                    return obj.lendStartTime;
                }
            },
            {
                data: function (obj) {
                    if (obj.lendEndTime === null) return null;
                    return obj.lendEndTime;
                }
            },
            {data: 'submitTime'},
            {
                data: function (obj) {
                    if (obj.approvalTime === null) return null;
                    return obj.approvalTime;
                }
            },
            {
                data: function (obj) {
                    if (obj.admin === null) return null;
                    return obj.admin.username;
                }
            },
            {data: 'amount'},
            {data: 'status'},
            {data: null}
        ],
        columnDefs: [{
            targets: 9,
            render: function (row) {
                return '<a type="button" class="btn btn-danger"  href="#" onclick="btn_action(' + row.id + ')">取消</a>';
            }
        },
            {"orderable": false, "targets": 9}
        ]

    });
}


function btn_action(id) {
    $.ajax({
        url: '/cancelRenting',
        type: "POST",
        dataType: "json",
        data: {
            "id": id
        },
        success: function (data) {
            if (data.msg === "success") {
                table.ajax.reload(null, false);
            } else {
                alert("订单不可取消");
            }
        },
        error: function () {
            alert("System Error!");
        }
    });
}