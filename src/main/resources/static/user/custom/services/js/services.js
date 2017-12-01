$(document).ready(function () {
    filter();
    gettime();
    getcar();
    price();
});

// 导航栏悬浮
function filter() {
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop <= 200) {
            $("#filter").removeClass("initialfilter");
            $("#filter").removeClass("filter");
            $("#filter").addClass("scrollfilter");
        } else {
            $("#filter").removeClass("scrollfilter");
            $("#filter").addClass("filter");
        }
    });

}

//实时监测
function price() {
    $("#lowestprice").bind("input propertychange", function () {
        getcar();
    });
    $("#highestprice").bind("input propertychange", function () {
        getcar();
    });
    $("#starttime").bind("input propertychange", function () {
        getcar();
        $("#endtime").attr("min", $("#starttime").val());
    });
    $("#endtime").bind("input propertychange", function () {
        getcar();
    });
}

function verifystart(time) {
    var thisday = time.substring(0, 10);
    var thistime = parseInt(time.substring(11, 13));
    if (thistime < 8) {
        $("#starttime").val(thisday + "T08:00");
    }
    if (thistime > 20) {
        $("#starttime").val(thisday + "T20:00");
    }
}

function verifyend(time) {
    var thisday = time.substring(0, 10);
    var thistime = parseInt(time.substring(11, 13));
    if (thistime < 8) {
        $("#endtime").val(thisday + "T08:00");
    }
    if (thistime > 20) {
        $("#endtime").val(thisday + "T20:00");
    }
}

// IE9以下
// function price() {
//     getcar();
// }

//初始化时间
function gettime() {
    var now = new Date();
    now.setDate(now.getDate() + 1);
    var day = ("0" + (now.getDate())).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var starttime = now.getFullYear() + "-" + (month) + "-" + (day) + "T08:00";
    $('#starttime').val(starttime);
    $('#starttime').attr("min", starttime);
    settime();
}

function settime() {
    $('#endtime').attr("min", $('#starttime').val());
}

//获取车辆信息ajax
function getcar() {
    var lowestprice = $("#lowestprice").val();
    var highestprice = $("#highestprice").val();
    var planingLendStartTime = $("#starttime").val();
    var planingLendEndTime = $("#endtime").val();

    planingLendStartTime = planingLendStartTime.replace(/T/i, " ") + ":00";

    if (planingLendEndTime === "") {
        planingLendEndTime = "9999-11-11 11:11:11"
    } else {
        planingLendEndTime = (planingLendEndTime.replace(/T/i, " ") + ":00");
    }
    if (lowestprice === "") {
        lowestprice = "0";
    }
    if (highestprice === "") {
        highestprice = "99999999";
    }

    $.get("/getAvailableCars",
        {
            planingLendStartTime: planingLendStartTime,
            planingLendEndTime: planingLendEndTime,
            lowestPrice: lowestprice,
            highestPrice: highestprice
        }, function (data) {
            removecar();
            displaycar(data);
        }
    );
}

// 车辆筛选,
function sorecar() {
    var lowestprice = $("#lowestprice").val();
    var highestprice = $("#highestprice").val();
    if (lowestprice === "") {
        lowestprice = 0;
    }
    if (highestprice === "") {
        highestprice = 10000000;
    }

    $.get("/getCarsByStatus?status=IDLE",
        function (data) {
            if ($("#sortcar").attr("src") === "../custom/services/images/other/down.png") {
                $("#sortcar").attr("src", "../custom/services/images/other/rise.png");
                data.sort(function (a, b) {
                    return a.price - b.price
                });
            } else {
                $("#sortcar").attr("src", "../custom/services/images/other/down.png");
                data.sort(function (a, b) {
                    return b.price - a.price
                });
            }
            removecar();
            displaycar(data, lowestprice, highestprice);
        }
    );
}

//显示车辆信息
function displaycar(data) {

    for (var i = 0; i < data.length; i++) {
        var imgurl = "/carImage?id=" + data[i].id;
        var car = carhtml(data, i, imgurl);
        var carmodal = carmodalhtml(data, i, imgurl);

        $("#carttable").append(car);
        $("#carmodal").append(carmodal);
    }
}

function carhtml(data, i, imgurl) {
    // language=HTML
    return "    <tr class=\"clist_tr\" id=\"car" + data[i].id + "\">\n" +
        "              <td class=\"pic\">\n" +
        "                <img src=\"" + imgurl + "\" alt=\"" + data[i].brand + "\">\n" +
        "              </td>\n" +
        "              <td class=\"info\">\n" +
        "                <p class=\"name\">" + data[i].brand + "&nbsp;&nbsp;(" + data[i].color + ")</p>\n" +
        "                <div class=\"alltips\">\n" +
        "                  <p class=\"tip bh_cp\">车牌号</p>\n" +
        "                  <p class=\"tip bh_hm\">" + data[i].licensePlate + "</p>\n" +
        "                </div>\n" +
        "              </td>\n" +
        "              <td class=\"ord\">\n" +
        "                <div class=\"order_box\">\n" +
        "                  <div class=\"od_price\">\n" +
        "                    <div class=\"houfu \"></div>\n" +
        "                    <div class=\"car_price\">\n" +
        "                    <span class=\"pri_ye\">\n" +
        "                      <em class=\"rmb\">¥</em>\n" +
        "                      <em class=\"num\">" + data[i].price + "</em>\n" +
        "                      <em class=\"unit\">/日均</em>\n" +
        "                    </span>\n" +
        "                      <div class=\"sz_priceTotal\" style=\"cursor: pointer;\" data=\"normal\" modelevel=\"3\" modeid=\"842\">\n" +
        "                        <div class=\"fl clear\">\n" +
        "                        <span class=\"fl pri_all\">\n" +
        "                          <em>不计油费,</em>\n" +
        "                          <em>不计里程</em>\n" +
        "                        </span>\n" +
        "                        </div>\n" +
        "                      </div>\n" +
        "                    </div>\n" +
        "                  </div>\n" +
        "                  <a class=\"od_btn btn_yel zc_bbtn\"  id=\"" + data[i].id + "\"  onclick='carorder(this.id)'>租 车</a>\n" +
        "                </div>\n" +
        "              </td>\n" +
        "            </tr>\n";
}

function carmodalhtml(data, i, imgurl) {
    // language=HTML
    return "<div class=\"modal fade carmodal\" id=\"carmodal" + data[i].id + "\">\n" +
        "  <div class=\"modal-dialog\">\n" +
        "    <div class=\"modal-content\">\n" +
        "      <div class=\"modal-header\">\n" +
        "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n" +
        "          &times;\n" +
        "        </button>\n" +
        "        <h4 class=\"modal-title\">\n" +
        "          确认订单\n" +
        "        </h4>\n" +
        "      </div>\n" +
        "      <div class=\"ord\">\n" +
        "        <label><br/>\n" +
        "          <p class=\"zc_left_title\">&nbsp;&nbsp;预定时间&nbsp;:&nbsp;&nbsp;" +
        "<span class='starttime_order'></span>（请在预定时间内到门店提车）</p>\n" +
        "          <p class=\"zc_left_title\">&nbsp;&nbsp;换车时间&nbsp;:&nbsp;&nbsp;" +
        "<span class='endtime_order'></span>（以实际还车时间为准）</p>\n" +
        "        <br/></label>\n" +
        "      </div>\n" +
        "      <div class='zc_boxshd minhght clist_ct'> " +
        "       <img src=\"" + imgurl + "\" alt=\"" + data[i].brand + "\">\n" +
        "    <table>" +
        "    <tr class=\"clist_tr\" id=\"car" + data[i].id + "\">\n" +
        "              <td class=\"info\">\n" +
        "                <p style='font-size: 10px'>" + data[i].brand + "&nbsp;&nbsp;(" + data[i].color + ")</p>\n" +
        "                <div class=\"alltips\">\n" +
        "                  <p class=\"tip bh_cp\">车牌号</p>\n" +
        "                  <p class=\"tip bh_hm\">" + data[i].licensePlate + "</p>\n" +
        "                </div>\n" +
        "              </td>\n" +
        "              <td class=\"ord\">\n" +
        "                <div class=\"order_box\">\n" +
        "                  <div class=\"od_price\">\n" +
        "                    <div class=\"houfu \"></div>\n" +
        "                    <div class=\"car_price\">\n" +
        "                    <span class=\"pri_ye\">\n" +
        "                      <em class=\"rmb\">¥</em>\n" +
        "                      <em class=\"num\">" + data[i].price + "</em>\n" +
        "                      <em class=\"unit\">/日均</em>\n" +
        "                    </span>\n" +
        "                      <div class=\"sz_priceTotal\" style=\"cursor: pointer;\" data=\"normal\" modelevel=\"3\" modeid=\"842\">\n" +
        "                        <div class=\"fl clear\">\n" +
        "                        <span class=\"fl pri_all\">\n" +
        "                          <em class=\"unit\">油费自理（赠送1L）</em>\n" +
        "                        </span>\n" +
        "                        </div>\n" +
        "                      </div>\n" +
        "                      <div class=\"sz_priceTotal\" style=\"cursor: pointer;\" data=\"normal\" modelevel=\"3\" modeid=\"842\">\n" +
        "                        <div class=\"fl clear\">\n" +
        "                        </div>\n" +
        "                      </div>\n" +
        "                    </div>\n" +
        "                  </div>\n" +
        "                </div>\n" +
        "              </td>\n" +
        "            </tr>\n" +
        "         </table>" +
        "        </div>" +
        "        <div class=\"modal-footer\">\n" +
        "        <button type=\"button\" id=\"" + data[i].id + "\" class=\"btn btn-success\" onclick='preprogram(this.id)' data-dismiss=\"modal\">预定\n" +
        "        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭\n" +
        "        </button>\n" +
        "      </div>\n" +
        "    </div><!-- /.modal-content -->\n" +
        "  </div><!-- /.modal -->\n" +
        "</div>";
}

//删除过时信息
function removecar() {
    $("#carttable").children("tr").remove();
    $("#carmodal").children("div").remove();
}

//预定模态框
function carorder(id) {
    var planingLendStartTime = $("#starttime").val();
    var planingLendEndTime = $("#endtime").val();
    planingLendStartTime = planingLendStartTime.replace(/T/i, " ");
    planingLendEndTime = planingLendEndTime.replace(/T/i, " ");

    if ($("#endtime").val() === "") {
        $("#prompt").html("请先选择租车日期");
        $("#promptmodal").modal();

    }
    else {
        $("#carmodal" + id).modal();
        $(".starttime_order").html(planingLendStartTime);
        $(".endtime_order").html(planingLendEndTime);
    }
}

//下单ajax
function preprogram(id) {
    var planingLendStartTime = $("#starttime").val();
    var planingLendEndTime = $("#endtime").val();
    planingLendStartTime = planingLendStartTime.replace(/T/i, " ") + ":00";
    planingLendEndTime = planingLendEndTime.replace(/T/i, " ") + ":00";


    $.post("/makeRenting",
        {
            carid: id,
            planingLendStartTime: planingLendStartTime,
            planingLendEndTime: planingLendEndTime

        }, function (data) {
            if (data.msg === "success") {
                $("#prompt").html("预订成功！");
                $("#promptmodal").modal();
                $("#carttable").children("#car" + id).remove();
            }
            else if (data.msg === "usertype error") {
                $("#prompt").html("请先登录！");
                $("#promptmodal").modal();
            } else if (data.msg === "plainning time error") {
                $("#prompt").html("请选择正确的租车时间！");
                $("#promptmodal").modal();
            } else {
                $("#prompt").html("车辆不可用！");
                $("#promptmodal").modal();
            }
        }, "json"
    );

}