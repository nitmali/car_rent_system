Vue.component('my-component', {
    template: '<!-- Navigation -->\n' +
    '  <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">\n' +
    '    <div class="navbar-header">\n' +
    '      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\n' +
    '        <span class="sr-only">Toggle navigation</span>\n' +
    '        <span class="icon-bar"></span>\n' +
    '        <span class="icon-bar"></span>\n' +
    '        <span class="icon-bar"></span>\n' +
    '      </button>\n' +
    '      <a class="navbar-brand" href="index.html">租车系统后台</a>\n' +
    '    </div>\n' +
    '    <!-- /.navbar-header -->\n' +
    '\n' +
    '    <ul class="nav navbar-top-links navbar-right">\n' +
    '      <li class="dropdown">\n' +
    '        <a class="dropdown-toggle" data-toggle="dropdown" href="#">\n' +
    '          <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>\n' +
    '        </a>\n' +
    '        <ul class="dropdown-menu">\n' +
    '          <li><a href="profile.html"><i class="fa fa-user fa-fw"></i> 个人中心</a>\n' +
    '          </li>\n' +
    '          <li><a href="#"><i class="fa fa-gear fa-fw"></i> 设置</a>\n' +
    '          </li>\n' +
    '          <li class="divider"></li>\n' +
    '          <li><a href="/logout"><i class="fa fa-sign-out fa-fw"></i> 登出</a>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '        <!-- /.dropdown-user -->\n' +
    '      </li>\n' +
    '      <!-- /.dropdown -->\n' +
    '    </ul>\n' +
    '    <!-- /.navbar-top-links -->\n' +
    '\n' +
    '    <div class="navbar-default sidebar" role="navigation">\n' +
    '      <div class="sidebar-nav navbar-collapse">\n' +
    '        <ul class="nav" id="side-menu">\n' +
    '          <li class="sidebar-search">\n' +
    '            <div class="input-group custom-search-form">\n' +
    '              <input type="text" class="form-control" placeholder="Search...">\n' +
    '              <span class="input-group-btn">\n' +
    '                                <button class="btn btn-default" type="button">\n' +
    '                                    <i class="fa fa-search"></i>\n' +
    '                                </button>\n' +
    '                            </span>\n' +
    '            </div>\n' +
    '            <!-- /input-group -->\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="index.html"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="review.html"><i class="fa fa-edit fa-fw"></i> 订单审核</a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="giveback.html"><i class="fa fa-repeat fa-fw"></i> 车辆归还</a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="rentinfo.html"><i class="fa fa-table fa-fw"></i> 订单信息</a>\n' +
    '          </li>\n' +
    '          <li>\n' +
    '            <a href="carinfo.html"><i class="fa fa-car fa-fw"></i> 车辆信息</a>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '      </div>\n' +
    '      <!-- /.sidebar-collapse -->\n' +
    '    </div>\n' +
    '    <!-- /.navbar-static-side -->\n' +
    '  </nav>'
});
new Vue({
    el: '#nav-bar'
});