package com.example.carrentsys.controller;

import com.example.carrentsys.entity.Admin;
import com.example.carrentsys.entity.Client;
import com.example.carrentsys.repository.AdminRepository;
import com.example.carrentsys.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RegisterController {
    private final AdminRepository adminRepository;
    private final ClientRepository clientRepository;

    @Autowired
    public RegisterController(AdminRepository adminRepository, ClientRepository clientRepository) {
        this.adminRepository = adminRepository;
        this.clientRepository = clientRepository;
    }

    @RequestMapping(value = "/adminRegister",method = RequestMethod.POST)
    @ResponseBody
    @Transactional(rollbackFor = Exception.class)
    public String adminRegister(Admin admin){
        if(!adminRepository.existsByUsername(admin.getUsername())){
            adminRepository.save(admin);
            return "{\"msg\":\"success\"}";
        }else {
            return "{\"msg\":\"repeat username\"}";
        }
    }

    @RequestMapping(value = "/clientRegister",method = RequestMethod.POST)
    @ResponseBody
    @Transactional(rollbackFor = Exception.class)
    public String clientRegister(Client client){
        if(!clientRepository.existsByUsername(client.getUsername())&&
                !clientRepository.existsByIdCard(client.getIdCard())){
            clientRepository.save(client);
            return "{\"msg\":\"success\"}";
        }else {
            return "{\"msg\":\"error\"}";
        }
    }
}
