// language=HTML

$(document).ready(function () {
    $.get("/getAvailableCars",
        function (data) {
            for (var i = 0; i < data.length; i++) {
                var car = "    <tr class=\"clist_tr\" id=\"car" + data[i].id + "\">\n" +
                    "              <td class=\"pic\">\n" +
                    "                <img src=\"../custom/services/images/" + data[i].image + "\" alt=\"" + data[i].image + "\">\n" +
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
                    "                          <em>不计邮费，</em>\n" +
                    "                          <em>不计里程</em>\n" +
                    "                        </span>\n" +
                    "                        </div>\n" +
                    "                      </div>\n" +
                    "                    </div>\n" +
                    "                  </div>\n" +
                    "                  <a class=\"od_btn btn_yel zc_bbtn\" data-toggle=\"modal\" data-target=\"#carmodal" + data[i].id + "\">租 车</a>\n" +
                    "                </div>\n" +
                    "              </td>\n" +
                    "            </tr>\n";

                var carmodal = "<div class=\"modal fade\" id=\"carmodal" + data[i].id + "\" aria-hidden=\"true\">\n" +
                    "  <div class=\"modal-dialog\">\n" +
                    "    <div class=\"modal-content\">\n" +
                    "      <div class=\"modal-header\">\n" +
                    "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n" +
                    "          &times;\n" +
                    "        </button>\n" +
                    "        <h4 class=\"modal-title\">\n" +
                    "          我要租车\n" +
                    "        </h4>\n" +
                    "      </div>\n" +
                    "      <div class=\"modal-body\">\n" +
                    "        <p>" + data[i].brand + "</p>" +
                    "      </div>\n" +
                    "      <div class=\"modal-footer\">\n" +
                    "        <button type=\"button\" class=\"btn btn-success\">预定\n" +
                    "        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭\n" +
                    "        </button>\n" +
                    "      </div>\n" +
                    "    </div><!-- /.modal-content -->\n" +
                    "  </div><!-- /.modal -->\n" +
                    "</div>";


                $("#carttable").append(car);
                $("#carmodal").append(carmodal);
                // $("#carttable").children("tr").remove();
                // $("#carmodal").children("div").remove();
            }


        }
    );

    $(window).scroll(function () {
        var s = $("#filter").scrollTop();
        if (s <= 5) {
            $("#filter").addClass('filterabsolute');
        }
        else {
            $("#filter").addClass('filterafixed');
        }
    });
});




