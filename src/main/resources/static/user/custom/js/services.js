//<editor-fold desc="Vue">
let carmodal = new Vue({
    el: '#carmodal',
    data: {
        car: '',
        planingLendStartTime: '',
        planingLendEndTime: '',
        totalday: '',
        allprice: ''
    }
});

let carinfo = new Vue({
    el: '#carttable',
    data: {
        cars: '',
        openmodal: ''
    },
    methods: {
        sort() {
            this.datas.price.sort()
        },
        reverse() {
            this.datas.reverse()
        },
        setmodal: function (index) {
            carmodal.car = this.cars[index];
            let sarttime = new Date(filtervue.starttime);
            let endtime = new Date(filtervue.endtime);
            let differencetime = endtime.getTime() - sarttime.getTime();
            let totalday = (differencetime / (24 * 60 * 60 * 1000)).toFixed(2);
            let allprice = (totalday * this.cars[index].price).toFixed(2);

            if (filtervue.starttime === "" || filtervue.endtime === "") {
                infovue.setinfo = "请先选择租车日期!";
                $("#promptmodal").modal();
            }
            else {
                carmodal.planingLendStartTime = filtervue.starttime.replace(/T/i, " ");
                carmodal.planingLendEndTime = filtervue.endtime.replace(/T/i, " ");
                carmodal.totalday = totalday;
                carmodal.allprice = allprice;
                $("#carmodal").modal();
            }
        }

    }
});

let filtervue = new Vue({
    el: '#filter',
    data: {
        lowestprice: '',
        highestprice: '',
        starttime: '',
        endtime: '',
        sortimageurl: ['../custom/image/rise.png', '../custom/image/down.png']
    },
    created: function () {
        let now = new Date();
        now.setDate(now.getDate() + 1);
        let day = ("0" + (now.getDate())).slice(-2);
        let month = ("0" + (now.getMonth() + 1)).slice(-2);
        this.starttime = now.getFullYear() + "-" + (month) + "-" + (day) + "T08:00";
    },
    methods: {
        change: function () {
            getcar();
        },
        sortcar: function () {
            this.sortimageurl.reverse();
            carinfo.cars.reverse();
        }

    }
});

let infovue = new Vue({
    el: '#promptinfo',
    data: {
        setinfo: '',
        rawHtml: ''
    }
});
//</editor-fold>

$(document).ready(function () {
    filterdiv();
    getcar();
});

// 筛选栏悬浮
function filterdiv() {
    $(window).scroll(function () {
        let scrollTop = $(window).scrollTop();
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

function verifystart() {
    let thisday = filtervue.starttime.substring(0, 10);
    let thistime = parseInt(filtervue.starttime.substring(11, 13));
    if (thistime < 8) {
        filtervue.starttime = thisday + "T08:00";
    }
    if (thistime > 20) {
        filtervue.starttime = thisday + "T20:00";
    }
}

function verifyend() {
    let thisday = filtervue.endtime.substring(0, 10);
    let thistime = parseInt(filtervue.endtime.substring(11, 13));
    if (thistime < 8) {
        filtervue.endtime = thisday + "T08:00";
    }
    if (thistime > 20) {
        filtervue.endtime = thisday + "T20:00";
    }
}

//获取车辆信息ajax
function getcar() {
    let lowestprice = filtervue.lowestprice;
    let highestprice = filtervue.highestprice;
    let planingLendStartTime = filtervue.starttime;
    let planingLendEndTime = filtervue.endtime;

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
        },
        function (data) {
            data.sort(function (a, b) {
                return a.price - b.price;
            });
            if (filtervue.sortimageurl[0] === "../custom/image/down.png") {
                data.sort(function (a, b) {
                    return b.price - a.price;
                });
            }
            carinfo.cars = data;
            carmodal.datas = data;
        }, "json"
    );
}


//下单ajax
function preprogram(id) {

    let profile = "<a href=\"profile.html\">进入个人中心查看订单</a>";
    let planingLendStartTime = carmodal.planingLendStartTime;
    let planingLendEndTime = carmodal.planingLendEndTime;
    planingLendStartTime = planingLendStartTime.replace(/T/i, " ") + ":00";
    planingLendEndTime = planingLendEndTime.replace(/T/i, " ") + ":00";

    $.post("/makeRenting",
        {
            carid: id,
            planingLendStartTime: planingLendStartTime,
            planingLendEndTime: planingLendEndTime

        }, function (data) {
            if (data.msg === "success") {
                infovue.setinfo = "预订成功!";
                infovue.rawHtml = profile;
                $("#promptmodal").modal();
                getcar();
            }
            else if (data.msg === "usertype error") {
                infovue.setinfo = "请先登录！";
                $("#promptmodal").modal();
            } else if (data.msg === "plainning time error") {
                infovue.setinfo = "请选择正确的租车时间！";
                $("#promptmodal").modal();
            } else {
                infovue.setinfo = "车辆不可用！";
                $("#promptmodal").modal();
            }
        }, "json"
    );
}