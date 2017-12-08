$().ready(function () {
    var vm_client = new Vue({
        el: '#modal-client',
        data: {
            username: "",
            idCard: "",
            phone: "",
            imgsrc: ""
        }
    });
    var vm_car = new Vue({
        el: '#modal-car',
        data: {
            brand: "",
            color: "",
            licensePlate: "",
            price: "",
            status: "",
            carimg: ""
        }
    });
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
        searching: false,
        bSort: false,
        ajax: {
            url: '/manage/getRentingLog',
            type: 'post',
            datatype: 'json'
        },
        columns: [
            {data: 'id'},
            {data: 'client.username'},
            {data: 'car.licensePlate'},
            // {data: 'planingLendStartTime'},
            // {data: 'planingLendEndTime'},
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
            {data: 'status'}
        ]
    });
    $('#order_table tbody').on('click', 'td:nth-child(2)', function () {
        var rowdata = table.row(this).data();
        vm_client.username = rowdata.client.username;
        vm_client.idCard = rowdata.client.idCard;
        vm_client.phone = rowdata.client.phone;
        vm_client.imgsrc = "/driverLicenseImage?id=" + rowdata.client.id + '&' + Math.random();
        $("#modal-client").modal();
    });
    $('#order_table tbody').on('click', 'td:nth-child(3)', function () {
        var rowdata = table.row(this).data();
        vm_car.brand = rowdata.car.brand;
        vm_car.color = rowdata.car.color;
        vm_car.licensePlate = rowdata.car.licensePlate;
        vm_car.price = rowdata.car.price;
        vm_car.status = rowdata.car.status;
        vm_car.carimg = "/carImage?id=" + rowdata.car.id + '&' + Math.random();
        $("#modal-car").modal();
    });
});
