!function (a) {
    "function" == typeof define && define.amd ? define(["jquery", "jquery.smartmenus"], a) : "object" == typeof module && "object" == typeof module.exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
    return a.extend(a.SmartMenus.Bootstrap = {}, {
        keydownFix: !1, init: function () {
            var b = a("ul.navbar-nav:not([data-sm-skip])");
            b.each(function () {
                function d() {
                    b.find("a.current").parent().addClass("active"), b.find("a.has-submenu").each(function () {
                        var b = a(this);
                        b.is('[data-toggle="dropdown"]') && b.dataSM("bs-data-toggle-dropdown", !0).removeAttr("data-toggle"), b.is('[role="button"]') && b.dataSM("bs-role-button", !0).removeAttr("role")
                    })
                }

                function e() {
                    b.find("a.current").parent().removeClass("active"), b.find("a.has-submenu").each(function () {
                        var b = a(this);
                        b.dataSM("bs-data-toggle-dropdown") && b.attr("data-toggle", "dropdown").removeDataSM("bs-data-toggle-dropdown"), b.dataSM("bs-role-button") && b.attr("role", "button").removeDataSM("bs-role-button")
                    })
                }

                function g(a) {
                    var d = c.getViewportWidth();
                    if (d != f || a) {
                        var e = b.find(".caret");
                        c.isCollapsible() ? (b.addClass("sm-collapsible"), b.is("[data-sm-skip-collapsible-behavior]") || e.addClass("navbar-toggle sub-arrow")) : (b.removeClass("sm-collapsible"), b.is("[data-sm-skip-collapsible-behavior]") || e.removeClass("navbar-toggle sub-arrow")), f = d
                    }
                }

                var b = a(this), c = b.data("smartmenus");
                if (!c) {
                    b.smartmenus({
                        subMenusSubOffsetX: 2,
                        subMenusSubOffsetY: -6,
                        subIndicators: !1,
                        collapsibleShowFunction: null,
                        collapsibleHideFunction: null,
                        rightToLeftSubMenus: b.hasClass("navbar-right"),
                        bottomToTopSubMenus: b.closest(".navbar").hasClass("navbar-fixed-bottom")
                    }).bind({
                        "show.smapi": function (b, c) {
                            var d = a(c), e = d.dataSM("scroll-arrows");
                            e && e.css("background-color", a(document.body).css("background-color")), d.parent().addClass("open")
                        }, "hide.smapi": function (b, c) {
                            a(c).parent().removeClass("open")
                        }
                    }), d(), c = b.data("smartmenus"), c.isCollapsible = function () {
                        return !/^(left|right)$/.test(this.$firstLink.parent().css("float"))
                    }, c.refresh = function () {
                        a.SmartMenus.prototype.refresh.call(this), d(), g(!0)
                    }, c.destroy = function (b) {
                        e(), a.SmartMenus.prototype.destroy.call(this, b)
                    }, b.is("[data-sm-skip-collapsible-behavior]") && b.bind({
                        "click.smapi": function (b, d) {
                            if (c.isCollapsible()) {
                                var e = a(d), f = e.parent().dataSM("sub");
                                if (f && f.dataSM("shown-before") && f.is(":visible")) return c.itemActivate(e), c.menuHide(f), !1
                            }
                        }
                    });
                    var f;
                    g(), a(window).bind("resize.smartmenus" + c.rootId, g)
                }
            }), b.length && !a.SmartMenus.Bootstrap.keydownFix && (a(document).off("keydown.bs.dropdown.data-api", ".dropdown-menu"), a.fn.dropdown && a.fn.dropdown.Constructor && a(document).on("keydown.bs.dropdown.data-api", '.dropdown-menu:not([id^="sm-"])', a.fn.dropdown.Constructor.prototype.keydown), a.SmartMenus.Bootstrap.keydownFix = !0)
        }
    }), a(a.SmartMenus.Bootstrap.init), a
});