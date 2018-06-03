package com.nitmali.carrentsys.controller;

import com.nitmali.carrentsys.entity.LoginLog;
import com.nitmali.carrentsys.service.AdminService;
import com.nitmali.carrentsys.service.ClientService;
import com.nitmali.carrentsys.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.Objects;

@RestController
public class LoginController {
    private final AdminService adminService;
    private final ClientService clientService;
    private final LogService logService;

    @Autowired
    public LoginController(AdminService adminService, ClientService clientService, LogService logService) {
        this.adminService = adminService;
        this.clientService = clientService;
        this.logService = logService;
    }

    @RequestMapping(value = "/api/login/{usertype}", method = RequestMethod.POST)
    public String loginCheck(@PathVariable(name = "usertype") String usertype, HttpServletRequest request) {
        String username = request.getParameter("username");
        String passwd = request.getParameter("passwd");
        if (Objects.equals(username, "") || Objects.equals(passwd, "")) return "{\"msg\":\"error\"}";
        HttpSession session = request.getSession();
        LoginLog loginLog = new LoginLog();
        String ip = request.getRemoteAddr();
        Timestamp time = new Timestamp(System.currentTimeMillis());
        loginLog.setIp(ip);
        loginLog.setLogintime(time);
        loginLog.setUsername(username);
        if (usertype.equals("admin")) {
            if (adminService.findByUsername(username) != null) {
                if (passwd.equals(adminService.findByUsername(username).getPassword())) {
                    session.setAttribute("usertype", "admin");
                    session.setAttribute("username", username);
                    loginLog.setUsertype("admin");
                    logService.save(loginLog);
                    return "{\"msg\":\"success\"}";
                } else {
                    return "{\"msg\":\"wpsd\"}";
                }
            } else {
                return "{\"msg\":\"wid\"}";
            }
        } else if (usertype.equals("client")) {
            if (clientService.findByUsername(username) != null) {
                if (passwd.equals(clientService.findByUsername(username).getPassword())) {
                    session.setAttribute("usertype", "client");
                    session.setAttribute("username", username);
                    loginLog.setUsertype("client");
                    logService.save(loginLog);
                    return "{\"msg\":\"success\"}";
                } else {
                    return "{\"msg\":\"wpsd\"}";
                }
            } else {
                return "{\"msg\":\"wid\"}";
            }
        }
        return "{\"msg\":\"error\"}";
    }

    @RequestMapping(value = "/getusername")
    public String usernamecheck(HttpServletRequest request) {
        if (request.getSession().getAttribute("username") != null) {
            String username = request.getSession().getAttribute("username").toString();
            String usertype = request.getSession().getAttribute("usertype").toString();
            return "{\"msg\":\"success\",\"usertype\":\"" + usertype + "\",\"username\":\"" + username + "\"}";
        } else {
            return "{\"msg\":\"error\"}";
        }

    }

}
