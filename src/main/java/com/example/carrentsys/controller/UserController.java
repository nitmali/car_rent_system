package com.example.carrentsys.controller;

import com.example.carrentsys.entity.Admin;
import com.example.carrentsys.entity.Client;
import com.example.carrentsys.service.AdminService;
import com.example.carrentsys.service.ClientService;
import com.example.carrentsys.service.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserController {
    private final AdminService adminService;
    private final ClientService clientService;
    private final StorageService storageService;

    @Autowired
    public UserController(AdminService adminService, ClientService clientService, StorageService storageService) {
        this.adminService = adminService;
        this.clientService = clientService;
        this.storageService = storageService;
    }

    @RequestMapping(value = "/adminRegister", method = RequestMethod.POST)
    @ResponseBody
    public String adminRegister(HttpServletRequest request, Admin admin) {
        if (!adminService.existsByUsername(admin.getUsername())) {
            adminService.save(admin);
            HttpSession session = request.getSession();
            session.setAttribute("username", admin.getUsername());
            session.setAttribute("usertype", "admin");
            return "{\"msg\":\"success\"}";
        } else {
            return "{\"msg\":\"repeat username\"}";
        }
    }

    @RequestMapping(value = "/clientRegister", method = RequestMethod.POST)
    @ResponseBody
    @Transactional(rollbackFor = Exception.class)
    public String clientRegister(HttpServletRequest request, Client client, MultipartFile file) {
        if (!clientService.existsByUsername(client.getUsername()) &&
                !clientService.existsByIdCard(client.getIdCard())) {
            if (file.isEmpty()) return "{\"msg\":\"image error\"}";
            String picName = storageService.store(file);
            client.setDriverLicenseImg(picName);
            clientService.save(client);
            HttpSession session = request.getSession();
            session.setAttribute("username", client.getUsername());
            session.setAttribute("usertype", "client");
            return "{\"msg\":\"success\"}";
        } else if (clientService.existsByIdCard(client.getIdCard())) {
            return "{\"msg\":\"iderror\"}";
        } else {
            return "{\"msg\":\"nameerror\"}";
        }
    }

    @RequestMapping(value = "/clientInfo", method = RequestMethod.GET)
    @ResponseBody
    public Client getClientInfo(HttpServletRequest request) {
        return clientService.findByUsername((String) request.getSession().getAttribute("username"));
    }

    @RequestMapping(value = "/manage/allClientsInfo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getAllClientsInfo(@RequestParam(required = false, defaultValue = "1") int draw,
                                                 @RequestParam(required = false, defaultValue = "0") int start,
                                                 @RequestParam(required = false, defaultValue = "10") int length) {
        PageRequest pagerequset = new PageRequest((start / length), length);
        Page<Client> page = clientService.findAll(pagerequset);
        Map<String, Object> maps = new HashMap<>();
        long totalCount = page.getTotalElements();
        maps.put("draw", draw);
        maps.put("recordsTotal", totalCount);
        maps.put("recordsFiltered", totalCount);
        maps.put("data", page.getContent());
        return maps;
    }

    @RequestMapping(value = "/driverLicenseImage", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Resource> getClientDLImage(Long id) {
        Client client = clientService.findOne(id);
        String picname = client.getDriverLicenseImg();
        Resource file = storageService.loadAsResource(picname);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + picname + "\"").body(file);
    }

    @RequestMapping(value = "/clientInfo", method = RequestMethod.POST)
    @ResponseBody
    public String modifyClientInfo(Client client, MultipartFile file) {
        if (file != null) {
            if (file.isEmpty()) return "{\"msg\":\"image error\"}";
            String picName = storageService.store(file);
            client.setDriverLicenseImg(picName);
        }
        clientService.save(client);
        return "{\"msg\":\"success\"}";
    }

    @RequestMapping(value = "/manage/deleteClientInfo", method = RequestMethod.POST)
    @ResponseBody
    public String deleteClientsInfo(Long id) {
        clientService.delete(id);
        return "{\"msg\":\"success\"}";
    }

    @RequestMapping(value = "/adminInfo", method = RequestMethod.GET)
    @ResponseBody
    public Admin getAdminInfo(HttpServletRequest request) {
        return adminService.findByUsername((String) request.getSession().getAttribute("username"));
    }

    @RequestMapping(value = "/manage/allAdminsInfo", method = RequestMethod.GET)
    @ResponseBody
    public List<Admin> getAllAdminsInfo() {
        return adminService.findAll();
    }

    @RequestMapping(value = "/adminInfo", method = RequestMethod.POST)
    @ResponseBody
    public String modifyAdminInfo(Admin admin) {
        Long id = adminService.findByUsername(admin.getUsername()).getId();
        admin.setId(id);
        adminService.save(admin);
        return "{\"msg\":\"success\"}";
    }

    @RequestMapping(value = "/manage/deleteAdminInfo", method = RequestMethod.POST)
    @ResponseBody
    public String deleteAdminInfo(Long id) {
        adminService.delete(id);
        return "{\"msg\":\"success\"}";
    }
}
