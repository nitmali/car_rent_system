$().ready(function () {
    //welcome();
    getCarInfo();
    modifyCarInfo();
});

function welcome() {
    $.get("/getusername", function (data) {
        $("a.navbar-brand").html("Welcome " + data.username);
    });
}

var table;

function getCarInfo() {
    // $.getJSON("/getCarInfoList", function (data) {
    //     console.log(data);
    //     $("#car_table").DataTable({
    //         destroy: true,
    //         responsive:true,
    //         data: data,
    //         columns: [
    //             {data: 'id'},
    //             {data: 'brand'},
    //             {data: 'color'},
    //             {data: 'licensePlate'},
    //             {data: 'price'},
    //             {data: 'status'}
    //         ]
    //     });
    // });

    table = $("#car_table").DataTable({
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
        processing:true,
        ajax: {
            url: '/getAllCars',
            type: 'get',
            datatype: 'json',
            dataSrc: ''
        },
        columns: [
            {data: 'id'},
            {data: 'brand'},
            {data: 'color'},
            {data: 'licensePlate'},
            {data: 'price'},
            {data: 'status'}
        ]
    });
}

function modifyCarInfo() {
    $("#add_car").click(function () {
        $("#delete").hide();
        $("input[name='brand']").val("");
        $("input[name='color']").val("");
        $("input[name='licensePlate']").val("");
        $("input[name='price']").val("");
        $("select[name='status']").val(0);
        var modal = $("#modal").modal();

        $("#save").unbind("click").click(function () {
            $.post("/saveCarInfo",
                {
                    brand: $("input[name='brand']").val(),
                    color: $("input[name='color']").val(),
                    licensePlate: $("input[name='licensePlate']").val(),
                    price: $("input[name='price']").val(),
                    status: $("select[name='status']").val()
                }, function (data) {
                    if (data.msg === "success") {
                        modal.modal("hide");
                        //window.location.reload();
                        table.ajax.reload(null,false); //Ajax刷新,分页不重置
                    } else if (data.msg === "lp_repeat") {
                        alert("车牌号重复");
                    }else{
                        alert("输入错误");
                    }
                },"json");
        });
    });

    $("#car_table").on("click", "td",
        function () {
            var rowdata = table.row(this).data();
            var modal = $("#modal").modal();
            $("#delete").show();
            $("input[name='brand']").val(rowdata.brand);
            $("input[name='color']").val(rowdata.color);
            $("input[name='licensePlate']").val(rowdata.licensePlate);
            $("input[name='price']").val(rowdata.price);
            if (rowdata.status === "BOOKING") {
                $("select[name='status']").val(1);
            } else if (rowdata.status === "USING") {
                $("select[name='status']").val(2);
            } else if (rowdata.status === "IDLE") {
                $("select[name='status']").val(0);
            }

            $("#delete").unbind("click").click(function () {
                $.post("/deleteCarInfo", {id: rowdata.id}, function (data) {
                    if (data.msg !== "error") {
                        modal.modal("hide");
                        table.ajax.reload(null,false);
                    }
                },"json");
            });

            $("#save").unbind("click").click(function () {
                $.post("/saveCarInfo",
                    {
                        id: rowdata.id,
                        brand: $("input[name='brand']").val(),
                        color: $("input[name='color']").val(),
                        licensePlate: $("input[name='licensePlate']").val(),
                        price: $("input[name='price']").val(),
                        status: $("select[name='status']").val()
                    }, function (data) {
                        if (data.msg === "success") {
                            modal.modal("hide");
                            //window.location.reload();
                            table.ajax.reload(null,false);
                        }else if (data.msg === "lp_repeat") {
                            alert("车牌号重复");
                        }else {
                            alert("输入错误");
                        }
                    },"json");
            })
        });
}
