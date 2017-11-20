!function (a) {
    var b = function (b, c) {
        var d = a.extend({}, a.fn.nivoSlider.defaults, c), e = {
            currentSlide: 0,
            currentImage: "",
            totalSlides: 0,
            running: !1,
            paused: !1,
            stop: !1,
            controlNavEl: !1
        }, f = a(b);
        f.data("nivo:vars", e).addClass("nivoSlider");
        var g = f.children();
        g.each(function () {
            var b = a(this), c = "";
            b.is("img") || (b.is("a") && (b.addClass("nivo-imageLink"), c = b), b = b.find("img:first"));
            var d = 0 === d ? b.attr("width") : b.width(), f = 0 === f ? b.attr("height") : b.height();
            "" !== c && c.css("display", "none"), b.css("display", "none"), e.totalSlides++
        }), d.randomStart && (d.startSlide = Math.floor(Math.random() * e.totalSlides)), d.startSlide > 0 && (d.startSlide >= e.totalSlides && (d.startSlide = e.totalSlides - 1), e.currentSlide = d.startSlide), a(g[e.currentSlide]).is("img") ? e.currentImage = a(g[e.currentSlide]) : e.currentImage = a(g[e.currentSlide]).find("img:first"), a(g[e.currentSlide]).is("a") && a(g[e.currentSlide]).css("display", "block");
        var h = a("<img/>").addClass("nivo-main-image");
        h.attr("src", e.currentImage.attr("src")).show(), f.append(h), a(window).resize(function () {
            f.children("img").width(f.width()), h.attr("src", e.currentImage.attr("src")), h.stop().height("auto"), a(".nivo-slice").remove(), a(".nivo-box").remove()
        }), f.append(a('<div class="nivo-caption"></div>'));
        var i = function (b) {
            var c = a(".nivo-caption", f);
            if ("" != e.currentImage.attr("title") && void 0 != e.currentImage.attr("title")) {
                var d = e.currentImage.attr("title");
                "#" == d.substr(0, 1) && (d = a(d).html()), "block" == c.css("display") ? setTimeout(function () {
                    c.html(d)
                }, b.animSpeed) : (c.html(d), c.stop().fadeIn(b.animSpeed))
            } else c.stop().fadeOut(b.animSpeed)
        };
        i(d);
        var j = 0;
        if (!d.manualAdvance && g.length > 1 && (j = setInterval(function () {
                o(f, g, d, !1)
            }, d.pauseTime)), d.directionNav && (f.append('<div class="nivo-directionNav"><a class="nivo-prevNav">' + d.prevText + '</a><a class="nivo-nextNav">' + d.nextText + "</a></div>"), a(f).on("click", "a.nivo-prevNav", function () {
                if (e.running) return !1;
                clearInterval(j), j = "", e.currentSlide -= 2, o(f, g, d, "prev")
            }), a(f).on("click", "a.nivo-nextNav", function () {
                if (e.running) return !1;
                clearInterval(j), j = "", o(f, g, d, "next")
            })), d.controlNav) {
            e.controlNavEl = a('<div class="nivo-controlNav"></div>'), f.after(e.controlNavEl);
            for (var k = 0; k < g.length; k++) if (d.controlNavThumbs) {
                e.controlNavEl.addClass("nivo-thumbs-enabled");
                var l = g.eq(k);
                l.is("img") || (l = l.find("img:first")), l.attr("data-thumb") && e.controlNavEl.append('<a class="nivo-control" rel="' + k + '"><img src="' + l.attr("data-thumb") + '" alt="" /></a>')
            } else e.controlNavEl.append('<a class="nivo-control" rel="' + k + '">' + (k + 1) + "</a>");
            a("a:eq(" + e.currentSlide + ")", e.controlNavEl).addClass("active"), a("a", e.controlNavEl).bind("click", function () {
                return !e.running && (!a(this).hasClass("active") && (clearInterval(j), j = "", h.attr("src", e.currentImage.attr("src")), e.currentSlide = a(this).attr("rel") - 1, void o(f, g, d, "control")))
            })
        }
        d.pauseOnHover && f.hover(function () {
            e.paused = !0, clearInterval(j), j = ""
        }, function () {
            e.paused = !1, "" !== j || d.manualAdvance || (j = setInterval(function () {
                o(f, g, d, !1)
            }, d.pauseTime))
        }), f.bind("nivo:animFinished", function () {
            h.attr("src", e.currentImage.attr("src")), e.running = !1, a(g).each(function () {
                a(this).is("a") && a(this).css("display", "none")
            }), a(g[e.currentSlide]).is("a") && a(g[e.currentSlide]).css("display", "block"), "" !== j || e.paused || d.manualAdvance || (j = setInterval(function () {
                o(f, g, d, !1)
            }, d.pauseTime)), d.afterChange.call(this)
        });
        var m = function (b, c, d) {
            a(d.currentImage).parent().is("a") && a(d.currentImage).parent().css("display", "block"), a('img[src="' + d.currentImage.attr("src") + '"]', b).not(".nivo-main-image,.nivo-control img").width(b.width()).css("visibility", "hidden").show();
            for (var e = a('img[src="' + d.currentImage.attr("src") + '"]', b).not(".nivo-main-image,.nivo-control img").parent().is("a") ? a('img[src="' + d.currentImage.attr("src") + '"]', b).not(".nivo-main-image,.nivo-control img").parent().height() : a('img[src="' + d.currentImage.attr("src") + '"]', b).not(".nivo-main-image,.nivo-control img").height(), f = 0; f < c.slices; f++) {
                var g = Math.round(b.width() / c.slices);
                f === c.slices - 1 ? b.append(a('<div class="nivo-slice" name="' + f + '"><img src="' + d.currentImage.attr("src") + '" style="position:absolute; width:' + b.width() + "px; height:auto; display:block !important; top:0; left:-" + (g + f * g - g) + 'px;" /></div>').css({
                    left: g * f + "px",
                    width: b.width() - g * f + "px",
                    height: e + "px",
                    opacity: "0",
                    overflow: "hidden"
                })) : b.append(a('<div class="nivo-slice" name="' + f + '"><img src="' + d.currentImage.attr("src") + '" style="position:absolute; width:' + b.width() + "px; height:auto; display:block !important; top:0; left:-" + (g + f * g - g) + 'px;" /></div>').css({
                    left: g * f + "px",
                    width: g + "px",
                    height: e + "px",
                    opacity: "0",
                    overflow: "hidden"
                }))
            }
            a(".nivo-slice", b).height(e), h.stop().animate({height: a(d.currentImage).height()}, c.animSpeed)
        }, n = function (b, c, d) {
            a(d.currentImage).parent().is("a") && a(d.currentImage).parent().css("display", "block"), a('img[src="' + d.currentImage.attr("src") + '"]', b).not(".nivo-main-image,.nivo-control img").width(b.width()).css("visibility", "hidden").show();
            for (var e = Math.round(b.width() / c.boxCols), f = Math.round(a('img[src="' + d.currentImage.attr("src") + '"]', b).not(".nivo-main-image,.nivo-control img").height() / c.boxRows), g = 0; g < c.boxRows; g++) for (var i = 0; i < c.boxCols; i++) i === c.boxCols - 1 ? (b.append(a('<div class="nivo-box" name="' + i + '" rel="' + g + '"><img src="' + d.currentImage.attr("src") + '" style="position:absolute; width:' + b.width() + "px; height:auto; display:block; top:-" + f * g + "px; left:-" + e * i + 'px;" /></div>').css({
                opacity: 0,
                left: e * i + "px",
                top: f * g + "px",
                width: b.width() - e * i + "px"
            })), a('.nivo-box[name="' + i + '"]', b).height(a('.nivo-box[name="' + i + '"] img', b).height() + "px")) : (b.append(a('<div class="nivo-box" name="' + i + '" rel="' + g + '"><img src="' + d.currentImage.attr("src") + '" style="position:absolute; width:' + b.width() + "px; height:auto; display:block; top:-" + f * g + "px; left:-" + e * i + 'px;" /></div>').css({
                opacity: 0,
                left: e * i + "px",
                top: f * g + "px",
                width: e + "px"
            })), a('.nivo-box[name="' + i + '"]', b).height(a('.nivo-box[name="' + i + '"] img', b).height() + "px"));
            h.stop().animate({height: a(d.currentImage).height()}, c.animSpeed)
        }, o = function (b, c, d, e) {
            var f = b.data("nivo:vars");
            if (f && f.currentSlide === f.totalSlides - 1 && d.lastSlide.call(this), (!f || f.stop) && !e) return !1;
            d.beforeChange.call(this), e ? ("prev" === e && h.attr("src", f.currentImage.attr("src")), "next" === e && h.attr("src", f.currentImage.attr("src"))) : h.attr("src", f.currentImage.attr("src")), f.currentSlide++, f.currentSlide === f.totalSlides && (f.currentSlide = 0, d.slideshowEnd.call(this)), f.currentSlide < 0 && (f.currentSlide = f.totalSlides - 1), a(c[f.currentSlide]).is("img") ? f.currentImage = a(c[f.currentSlide]) : f.currentImage = a(c[f.currentSlide]).find("img:first"), d.controlNav && (a("a", f.controlNavEl).removeClass("active"), a("a:eq(" + f.currentSlide + ")", f.controlNavEl).addClass("active")), i(d), a(".nivo-slice", b).remove(), a(".nivo-box", b).remove();
            var g = d.effect, j = "";
            "random" === d.effect && (j = new Array("sliceDownRight", "sliceDownLeft", "sliceUpRight", "sliceUpLeft", "sliceUpDown", "sliceUpDownLeft", "fold", "fade", "boxRandom", "boxRain", "boxRainReverse", "boxRainGrow", "boxRainGrowReverse"), void 0 === (g = j[Math.floor(Math.random() * (j.length + 1))]) && (g = "fade")), -1 !== d.effect.indexOf(",") && (j = d.effect.split(","), void 0 === (g = j[Math.floor(Math.random() * j.length)]) && (g = "fade")), f.currentImage.attr("data-transition") && (g = f.currentImage.attr("data-transition")), f.running = !0;
            var k = 0, l = 0, o = "", q = "", r = "", s = "";
            if ("sliceDown" === g || "sliceDownRight" === g || "sliceDownLeft" === g) m(b, d, f), k = 0, l = 0, o = a(".nivo-slice", b), "sliceDownLeft" === g && (o = a(".nivo-slice", b)._reverse()), o.each(function () {
                var c = a(this);
                c.css({top: "0px"}), l === d.slices - 1 ? setTimeout(function () {
                    c.animate({opacity: "1.0"}, d.animSpeed, "", function () {
                        b.trigger("nivo:animFinished")
                    })
                }, 100 + k) : setTimeout(function () {
                    c.animate({opacity: "1.0"}, d.animSpeed)
                }, 100 + k), k += 50, l++
            }); else if ("sliceUp" === g || "sliceUpRight" === g || "sliceUpLeft" === g) m(b, d, f), k = 0, l = 0, o = a(".nivo-slice", b), "sliceUpLeft" === g && (o = a(".nivo-slice", b)._reverse()), o.each(function () {
                var c = a(this);
                c.css({bottom: "0px"}), l === d.slices - 1 ? setTimeout(function () {
                    c.animate({opacity: "1.0"}, d.animSpeed, "", function () {
                        b.trigger("nivo:animFinished")
                    })
                }, 100 + k) : setTimeout(function () {
                    c.animate({opacity: "1.0"}, d.animSpeed)
                }, 100 + k), k += 50, l++
            }); else if ("sliceUpDown" === g || "sliceUpDownRight" === g || "sliceUpDownLeft" === g) {
                m(b, d, f), k = 0, l = 0;
                var t = 0;
                o = a(".nivo-slice", b), "sliceUpDownLeft" === g && (o = a(".nivo-slice", b)._reverse()), o.each(function () {
                    var c = a(this);
                    0 === l ? (c.css("top", "0px"), l++) : (c.css("bottom", "0px"), l = 0), t === d.slices - 1 ? setTimeout(function () {
                        c.animate({opacity: "1.0"}, d.animSpeed, "", function () {
                            b.trigger("nivo:animFinished")
                        })
                    }, 100 + k) : setTimeout(function () {
                        c.animate({opacity: "1.0"}, d.animSpeed)
                    }, 100 + k), k += 50, t++
                })
            } else if ("fold" === g) m(b, d, f), k = 0, l = 0, a(".nivo-slice", b).each(function () {
                var c = a(this), e = c.width();
                c.css({top: "0px", width: "0px"}), l === d.slices - 1 ? setTimeout(function () {
                    c.animate({width: e, opacity: "1.0"}, d.animSpeed, "", function () {
                        b.trigger("nivo:animFinished")
                    })
                }, 100 + k) : setTimeout(function () {
                    c.animate({width: e, opacity: "1.0"}, d.animSpeed)
                }, 100 + k), k += 50, l++
            }); else if ("fade" === g) m(b, d, f), q = a(".nivo-slice:first", b), q.css({width: b.width() + "px"}), q.animate({opacity: "1.0"}, 2 * d.animSpeed, "", function () {
                b.trigger("nivo:animFinished")
            }); else if ("slideInRight" === g) m(b, d, f), q = a(".nivo-slice:first", b), q.css({
                width: "0px",
                opacity: "1"
            }), q.animate({width: b.width() + "px"}, 2 * d.animSpeed, "", function () {
                b.trigger("nivo:animFinished")
            }); else if ("slideInLeft" === g) m(b, d, f), q = a(".nivo-slice:first", b), q.css({
                width: "0px",
                opacity: "1",
                left: "",
                right: "0px"
            }), q.animate({width: b.width() + "px"}, 2 * d.animSpeed, "", function () {
                q.css({left: "0px", right: ""}), b.trigger("nivo:animFinished")
            }); else if ("boxRandom" === g) n(b, d, f), r = d.boxCols * d.boxRows, l = 0, k = 0, s = p(a(".nivo-box", b)), s.each(function () {
                var c = a(this);
                l === r - 1 ? setTimeout(function () {
                    c.animate({opacity: "1"}, d.animSpeed, "", function () {
                        b.trigger("nivo:animFinished")
                    })
                }, 100 + k) : setTimeout(function () {
                    c.animate({opacity: "1"}, d.animSpeed)
                }, 100 + k), k += 20, l++
            }); else if ("boxRain" === g || "boxRainReverse" === g || "boxRainGrow" === g || "boxRainGrowReverse" === g) {
                n(b, d, f), r = d.boxCols * d.boxRows, l = 0, k = 0;
                var u = 0, v = 0, w = [];
                w[u] = [], s = a(".nivo-box", b), "boxRainReverse" !== g && "boxRainGrowReverse" !== g || (s = a(".nivo-box", b)._reverse()), s.each(function () {
                    w[u][v] = a(this), ++v === d.boxCols && (u++, v = 0, w[u] = [])
                });
                for (var x = 0; x < 2 * d.boxCols; x++) {
                    for (var y = x, z = 0; z < d.boxRows; z++) y >= 0 && y < d.boxCols && (!function (c, e, f, h, i) {
                        var j = a(w[c][e]), k = j.width(), l = j.height();
                        "boxRainGrow" !== g && "boxRainGrowReverse" !== g || j.width(0).height(0), h === i - 1 ? setTimeout(function () {
                            j.animate({opacity: "1", width: k, height: l}, d.animSpeed / 1.3, "", function () {
                                b.trigger("nivo:animFinished")
                            })
                        }, 100 + f) : setTimeout(function () {
                            j.animate({opacity: "1", width: k, height: l}, d.animSpeed / 1.3)
                        }, 100 + f)
                    }(z, y, k, l, r), l++), y--;
                    k += 100
                }
            }
        }, p = function (a) {
            for (var b, c, d = a.length; d; b = parseInt(Math.random() * d, 10), c = a[--d], a[d] = a[b], a[b] = c) ;
            return a
        }, q = function (a) {
            this.console && void 0 !== console.log && console.log(a)
        };
        return this.stop = function () {
            a(b).data("nivo:vars").stop || (a(b).data("nivo:vars").stop = !0, q("Stop Slider"))
        }, this.start = function () {
            a(b).data("nivo:vars").stop && (a(b).data("nivo:vars").stop = !1, q("Start Slider"))
        }, d.afterLoad.call(this), this
    };
    a.fn.nivoSlider = function (c) {
        return this.each(function (d, e) {
            var f = a(this);
            if (f.data("nivoslider")) return f.data("nivoslider");
            var g = new b(this, c);
            f.data("nivoslider", g)
        })
    }, a.fn.nivoSlider.defaults = {
        effect: "random",
        slices: 15,
        boxCols: 8,
        boxRows: 4,
        animSpeed: 500,
        pauseTime: 3e3,
        startSlide: 0,
        directionNav: !0,
        controlNav: !0,
        controlNavThumbs: !1,
        pauseOnHover: !0,
        manualAdvance: !1,
        prevText: "Prev",
        nextText: "Next",
        randomStart: !1,
        beforeChange: function () {
        },
        afterChange: function () {
        },
        slideshowEnd: function () {
        },
        lastSlide: function () {
        },
        afterLoad: function () {
        }
    }, a.fn._reverse = [].reverse
}(jQuery);