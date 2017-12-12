$(document).ready(function () {

    $('[data-toggle="popover"]').popover();
    footerhtml();
    $(".getlogin").hide();
    user();
    focus();
});

function user() {
    $.get("/getusername",
        function (data) {
            if (data.msg !== "error") {
                if ((data.usertype === "client") && (data.username === $.cookie("username"))) {
                    $(".myself").html(data.username);
                    $(".notlogin").hide();
                    $(".getlogin").show();
                    $("#loginmodal").modal("hide")
                }
            }
        }, "json"
    );
}

function focus() {
    if ($("#inputUsername").val() === "") {
        $("#inputUsername").attr("autofocus", "true");
    } else {
        $("#inputPassword").attr("autofocus", "true");
    }
}

function footerhtml() {
    var footer = "<footer class=\"site-footer\">\n" +
        "  <section class=\"site-footer__top-panel\">\n" +
        "    <div class=\"container\">\n" +
        "      <div class=\"row\">\n" +
        "        <div class=\"col-xs-12 col-sm-4\">\n" +
        "          <div class=\"top-panel__info\">\n" +
        "            <i class=\"icon-Cancellation\"></i>\n" +
        "            <strong>免费取消</strong>\n" +
        "          </div>\n" +
        "        </div>\n" +
        "        <div class=\"col-xs-12 col-sm-4\">\n" +
        "          <div class=\"top-panel__info\">\n" +
        "            <i class=\"icon-commerce\"></i>\n" +
        "            <strong>线下信银行卡支付</strong>\n" +
        "          </div>\n" +
        "        </div>\n" +
        "        <div class=\"col-xs-12 col-sm-4\">\n" +
        "          <div class=\"top-panel__info\">\n" +
        "            <i class=\"icon-phone\"></i>\n" +
        "            <strong>24小时咨询服务</strong>\n" +
        "          </div>\n" +
        "        </div>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "  </section>\n" +
        "  <section class=\"box-elements\">\n" +
        "    <div class=\"container\">\n" +
        "      <div class=\"row\">\n" +
        "        <div class=\"col-xs-12 col-sm-6 col-md-12 col-lg-3\">\n" +
        "          <figure class=\"footer_logo\"><a href=\"#\"><img src=\"../assets/images/celebrating_icon.png\" alt=\"\"></a></figure>\n" +
        "        </div>\n" +
        "        <div class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3\">\n" +
        "          <h5>Company</h5>\n" +
        "          <ul class=\"footer-list\">\n" +
        "            <li><a href=\"about.html\">关于我们</a></li>\n" +
        "            <li><a href=\"http://news.sina.com.cn/\">新闻</a></li>\n" +
        "            <li><a href=\"contacts.html\">联系我们</a></li>\n" +
        "          </ul>\n" +
        "        </div>\n" +
        "        <div class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3\">\n" +
        "          <h5>客服服务</h5>\n" +
        "          <ul class=\"footer-list\">\n" +
        "            <li><a href=\"https://weibo.com/login.php\">博客</a></li>\n" +
        "            <li><a href=\"https://www.zhihu.com/\">FAQs</a></li>\n" +
        "            <li><a href=\"#\" data-toggle=\"modal\" data-target=\"#tk\">服务条款</a></li>\n" +
        "          </ul>\n" +
        "        </div>\n" +
        "        <div class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3\">\n" +
        "          <div class=\"contact-info\">\n" +
        "            <span class=\"phone_number\"><i class=\"icon-telephone\"></i> 173-4859-9821</span>\n" +
        "\n" +
        "            <span class=\"location_info\">\n" +
        "\t\t\t\t\t\t<i class=\"icon-placeholder-for-map\"></i>\n" +
        "\t\t\t\t\t\t<em>公司名称：NIT.</em>\n" +
        "\t\t\t\t\t\t<em>浙江省宁波市,</em>\n" +
        "\t\t\t\t\t\t<em>浙江大学宁波理工学院,<br/>数据学院.</em> </span>\n" +
        "          </div>\n" +
        "        </div>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "  </section>\n" +
        "  <section class=\"site-footer__bottom-panel\">\n" +
        "    <div class=\"container\">\n" +
        "      <div class=\"row\">\n" +
        "        <div class=\"col-xs-12 col-md-6\">\n" +
        "          <div class=\"copyright\">版权所有 &copy; 2017.混子大队\n" +
        "          </div>\n" +
        "        </div>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "  </section>\n" +
        "\n" +
        "  <a href=\"#\" class=\"scrollup\"><i class=\"icon-arrow-down-sign-to-navigate\"></i></a>\n" +
        "</footer>"

    $(".footerhtml").html(footer);
}