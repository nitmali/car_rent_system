package com.example.carrentsys.controller;

import com.example.carrentsys.entity.LoginLog;
import com.example.carrentsys.repository.AdminRepository;
import com.example.carrentsys.repository.ClientRepository;
import com.example.carrentsys.repository.LoginLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;

@RestController
public class LoginController {
    private final AdminRepository adminRepository;
    private final ClientRepository clientRepository;
    private final LoginLogRepository loginLogRepository;

    @Autowired
    public LoginController(AdminRepository adminRepository, ClientRepository clientRepository, LoginLogRepository loginLogRepository) {
        this.adminRepository = adminRepository;
        this.clientRepository = clientRepository;
        this.loginLogRepository = loginLogRepository;
    }

    @RequestMapping(value = "/api/login/{usertype}")
    public String loginCheck(@PathVariable(name = "usertype") String usertype, HttpServletRequest request) {
        String username=request.getParameter("username");
        String passwd=request.getParameter("passwd");
        Assert.notNull(username, "username can not be empty");
        Assert.notNull(passwd, "password can not be empty");
        HttpSession session = request.getSession();
        session.setAttribute("username", username);
        LoginLog loginLog = new LoginLog();
        String ip = request.getRemoteAddr();
        Timestamp time = new Timestamp(System.currentTimeMillis());
        loginLog.setIp(ip);
        loginLog.setLogintime(time);
        loginLog.setUsername(username);
        if (usertype.equals("admin")) {
            if (adminRepository.findByUsername(username) != null) {
                if (passwd.equals(adminRepository.findByUsername(username).getPassword())) {
                    session.setAttribute("usertype", "admin");
                    loginLog.setUsertype("admin");
                    loginLogRepository.save(loginLog);
                    return "{\"msg\":\"success\"}";
                } else {
                    return "{\"msg\":\"wpsd\"}";
                }
            } else {
                return "{\"msg\":\"wid\"}";
            }
        } else if (usertype.equals("client")) {
            if (clientRepository.findByUsername(username) != null) {
                if (passwd.equals(clientRepository.findByUsername(username).getPassword())) {
                    session.setAttribute("usertype", "client");
                    loginLog.setUsertype("client");
                    loginLogRepository.save(loginLog);
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
    public String usernamecheck(HttpServletRequest request){
        if(request.getSession().getAttribute("username")!=null){
            String username=request.getSession().getAttribute("username").toString();
            String usertype=request.getSession().getAttribute("usertype").toString();
            return "{\"msg\":\"success\",\"usertype\":\""+usertype+"\",\"username\":\""+username+"\"}";
        }else {
            return "{\"msg\":\"error\"}";
        }

    }

}
