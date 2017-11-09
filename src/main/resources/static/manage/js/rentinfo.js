var vm_client = new Vue({
    el: '#modal-client',
    data: {
        username: "",
        idCard: "",
        phone: ""
    }
});
var vm_car = new Vue({
    el: '#modal-car',
    data: {
        brand: "",
        color: "",
        licensePlate: "",
        price: "",
        status: ""
    }
});
$().ready(function () {
    var table = $("#order_table").DataTable({
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
        serverSide: true,
        bSort: false,
        ajax: {
            url: '/getRentingLog',
            type: 'post',
            datatype: 'json'
        },
        columns: [
            {data: 'id'},
            {data: 'client.id'},
            {data: 'car.id'},
            {
                data: function (obj) {
                    return new Date(obj.planingLendStartTime).toLocaleString();  //时间戳转换
                }
            },
            {
                data: function (obj) {
                    return new Date(obj.planingLendEndTime).toLocaleString();
                }
            },
            {
                data: function (obj) {
                    return new Date(obj.submitTime).toLocaleString();
                }
            },
            {data: 'status'}
        ]
    });
    $('#order_table tbody').on('click', 'td:nth-child(2)', function () {
        var rowdata = table.row(this).data();
        vm_client.username = rowdata.client.username;
        vm_client.idCard = rowdata.client.idCard;
        vm_client.phone = rowdata.client.phone;
        $("#modal-client").modal();
    });
    $('#order_table tbody').on('click', 'td:nth-child(3)', function () {
        var rowdata = table.row(this).data();
        vm_car.brand = rowdata.car.brand;
        vm_car.color = rowdata.car.color;
        vm_car.licensePlate = rowdata.car.licensePlate;
        vm_car.price = rowdata.car.price;
        vm_car.status = rowdata.car.status;
        $("#modal-car").modal();
    });
});
