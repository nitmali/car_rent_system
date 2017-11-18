package com.example.carrentsys.controller;

import com.example.carrentsys.repository.AdminRepository;
import com.example.carrentsys.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class LoginController {
    private final AdminRepository adminRepository;

    private final ClientRepository clientRepository;

    @Autowired
    public LoginController(AdminRepository adminRepository, ClientRepository clientRepository) {
        this.adminRepository = adminRepository;
        this.clientRepository = clientRepository;
    }

    @RequestMapping(value = "/api/login/{usertype}")
    public String loginCheck(@PathVariable(name = "usertype") String usertype, HttpServletRequest request) {
        String username=request.getParameter("username");
        String passwd=request.getParameter("passwd");
        Assert.notNull(username, "username can not be empty");
        Assert.notNull(passwd, "password can not be empty");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
        if (usertype.equals("admin")) {
            if (adminRepository.findByUsername(username) != null) {
                if (passwd.equals(adminRepository.findByUsername(username).getPassword())) {
                    HttpSession session = request.getSession();
                    session.setAttribute("username", username);
                    session.setAttribute("usertype", "admin");
                    Date date = new Date();
                    String resultDate = sdf.format(date);
                    System.out.println(resultDate);
                    String ip = request.getRemoteAddr();

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
                    HttpSession session = request.getSession();
                    session.setAttribute("username", username);
                    session.setAttribute("usertype", "client");
                    Date date = new Date();
                    String resultDate = sdf.format(date);
                    String ip = request.getRemoteAddr();

                    System.out.println("get this success");
                    return "{\"msg\":\"success\"}";
                } else {
                    System.out.println("get this wpsd");
                    return "{\"msg\":\"wpsd\"}";
                }
            } else {
                System.out.println("get this wid");
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
