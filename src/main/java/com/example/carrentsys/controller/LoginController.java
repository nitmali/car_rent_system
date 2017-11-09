package com.example.carrentsys.controller;

import com.example.carrentsys.repository.AdminRepository;
import com.example.carrentsys.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class LoginController {
    private final AdminRepository adminRepository;

    private final ClientRepository clientRepository;

    @Autowired
    public LoginController(AdminRepository adminRepository, ClientRepository clientRepository) {
        this.adminRepository = adminRepository;
        this.clientRepository = clientRepository;
    }

    @RequestMapping(value = "/adminLoginCheck")
    @ResponseBody
    public String adminLoginCheck(HttpServletRequest request){
        String username=request.getParameter("username");
        String passwd=request.getParameter("passwd");
        if(adminRepository.findByUsername(username)!=null){
            if(passwd.equals(adminRepository.findByUsername(username).getPassword())){
                HttpSession session=request.getSession();
                session.setAttribute("username",username);
                session.setAttribute("usertype","admin");
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
                Date date=new Date();
                String resultDate = sdf.format(date);
                System.out.println(resultDate);
                String ip=request.getRemoteAddr();

                return "{\"msg\":\"success\"}";
            }else {
                return "{\"msg\":\"wpsd\"}";
            }
        }else {
            return "{\"msg\":\"wid\"}";
        }
    }

    @RequestMapping(value = "/clientLoginCheck")
    @ResponseBody
    public String clientLoginCheck(HttpServletRequest request){
        String username=request.getParameter("username");
        String passwd=request.getParameter("passwd");
        if(clientRepository.findByUsername(username)!=null){
            if(passwd.equals(clientRepository.findByUsername(username).getPassword())){
                HttpSession session=request.getSession();
                session.setAttribute("username",username);
                session.setAttribute("usertype","client");
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
                Date date=new Date();
                String resultDate = sdf.format(date);
                System.out.println(resultDate);
                String ip=request.getRemoteAddr();

                return "{\"msg\":\"success\"}";
            }else {
                return "{\"msg\":\"wpsd\"}";
            }
        }else {
            return "{\"msg\":\"wid\"}";
        }
    }

    @RequestMapping(value = "/getusername")
    @ResponseBody
    public String usernamecheck(HttpServletRequest request){
        if(request.getSession().getAttribute("username")!=null){
            String username=request.getSession().getAttribute("username").toString();
            String usertype=request.getSession().getAttribute("usertype").toString();
            return "{\"msg\":\"success\",\"usertype\":\""+usertype+"\",\"username\":\""+username+"\"}";
        }else {
            return "{\"msg\":\"error\"}";
        }

    }

    @RequestMapping(value = "/logout")
    public String logout(HttpServletRequest request){
        request.getSession().invalidate();
        return "/index";
    }
}
