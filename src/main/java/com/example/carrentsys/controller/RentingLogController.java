package com.example.carrentsys.controller;

import com.example.carrentsys.entity.Admin;
import com.example.carrentsys.entity.Car;
import com.example.carrentsys.entity.Client;
import com.example.carrentsys.entity.RentingLog;
import com.example.carrentsys.service.AdminService;
import com.example.carrentsys.service.CarService;
import com.example.carrentsys.service.ClientService;
import com.example.carrentsys.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class RentingLogController {
    private final RentService rentService;
    private final CarService carService;
    private final ClientService clientService;
    private final AdminService adminService;

    @Autowired
    public RentingLogController(RentService rentService, CarService carRepository, ClientService clientService, AdminService adminService) {
        this.rentService = rentService;
        this.carService = carRepository;
        this.clientService = clientService;
        this.adminService = adminService;
    }


    @RequestMapping("/manage/getRentingLog")
    @ResponseBody
    public Map<String, Object> getRentingLog(@RequestParam(required = false, defaultValue = "1") int draw,
                                             @RequestParam(required = false, defaultValue = "0") int start,
                                             @RequestParam(required = false, defaultValue = "10") int length) {
        Sort sort = new Sort(Sort.Direction.DESC, "lendEndTime");
        PageRequest pagerequset = new PageRequest((start / length), length, sort);
        Map<String, Object> maps = new HashMap<>();
        Page<RentingLog> page = rentService.findAll(pagerequset);
        long totalCount = page.getTotalElements();
        maps.put("draw", draw);
        maps.put("recordsTotal", totalCount);
        maps.put("recordsFiltered", totalCount);
        maps.put("data", page.getContent());
        return maps;
    }

    @RequestMapping(value = "/manage/reviewLogs", method = RequestMethod.GET)
    @ResponseBody
    public List<RentingLog> getreviewLogs() {
        return rentService.findByStatus(RentingLog.Status.PENDING);
    }

    @RequestMapping(value = "/manage/reviewLogs", method = RequestMethod.POST)
    @ResponseBody
    @Transactional(rollbackFor = Exception.class)
    public String handleReviewLogs(@RequestParam("id") Long id, String type, HttpServletRequest request) {
        String username = (String) request.getSession().getAttribute("username");
        Admin admin = adminService.findByUsername(username);
        RentingLog rentingLog = rentService.findOne(id);
        Car car = rentingLog.getCar();
        if (type.equals("PASS")) {
            if (car.getStatus() != Car.Status.IDLE) return "{\"msg\":\"car is unavailable\"}";
            rentingLog.setStatus(RentingLog.Status.PASS);
            rentingLog.setLendStartTime(new Timestamp(System.currentTimeMillis()));
            car.setStatus(Car.Status.USING);
            rentingLog.setCar(car);
        } else if (type.equals("REJECT")) {
            rentingLog.setStatus(RentingLog.Status.REJECT);
        }
        rentingLog.setApprovalTime(new Timestamp(System.currentTimeMillis()));
        rentingLog.setAdmin(admin);
        rentService.save(rentingLog);
        return "{\"msg\":\"success\"}";
    }

    @RequestMapping(value = "/manage/givebackLogs", method = RequestMethod.GET)
    @ResponseBody
    public List<RentingLog> givebackLogs() {
        return rentService.findGivebackLogs();
    }

    @RequestMapping(value = "/manage/givebackCar", method = RequestMethod.POST)
    @ResponseBody
    public String givebackCar(@RequestParam("id") Long id) {
        RentingLog rentingLog = rentService.findOne(id);
        Car car = rentingLog.getCar();
        rentingLog.setLendEndTime(new Timestamp(System.currentTimeMillis()));
        rentingLog.setStatus(RentingLog.Status.FINISH);
        car.setStatus(Car.Status.IDLE);
        rentingLog.setCar(car);
        rentService.save(rentingLog);
        return "{\"msg\":\"success\"}";
    }

    @RequestMapping(value = "/makeRenting", method = RequestMethod.POST)
    @ResponseBody
    public String makeRenting(Long carid,
                              Timestamp planingLendStartTime,
                              Timestamp planingLendEndTime,
                              HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("usertype") != "client") return "{\"msg\":\"usertype error\"}";
        if (planingLendEndTime.getTime() - planingLendStartTime.getTime() <= 0)
            return "{\"msg\":\"plainning time error\"}";
        Car car = carService.findOne(carid);
        List<Car> availableCars = carService.getAvailableCars(planingLendStartTime, planingLendEndTime);
        if (!availableCars.contains(car)) {
            return "{\"msg\":\"car is not available\"}";
        }
        String username = (String) session.getAttribute("username");
        Client client = clientService.findByUsername(username);
        RentingLog rentingLog = new RentingLog();
        rentingLog.setCar(car);
        rentingLog.setClient(client);
        rentingLog.setPlaningLendEndTime(planingLendEndTime);
        rentingLog.setPlaningLendStartTime(planingLendStartTime);
        rentingLog.setStatus(RentingLog.Status.PENDING);
        rentService.save(rentingLog);
        return "{\"msg\":\"success\"}";
    }

    @RequestMapping(value = "/modifyRenting", method = RequestMethod.POST)
    @ResponseBody
    public String modifyRenting(Long id,
                                Long carid,
                                Timestamp planingLendStartTime,
                                Timestamp planingLendEndTime,
                                HttpServletRequest request) {
        if (id == null) return "{\"msg\":\"id error\"}";
        RentingLog rawRentingLog = rentService.findOne(id);
        HttpSession session = request.getSession();
        if (session.getAttribute("usertype") != "client" ||
                session.getAttribute("username") != rawRentingLog.getClient().getUsername())
            return "{\"msg\":\"usertype error\"}";
        if (rawRentingLog.getStatus() != RentingLog.Status.PENDING) return "{\"msg\":\"cannot be modified\"}";

        List<Car> availableCars = carService.getAvailableCars(planingLendStartTime, planingLendEndTime);
        Car car = carService.findOne(carid);
        if (!availableCars.contains(car)) return "{\"msg\":\"car is not available\"}";
        rawRentingLog.setCar(car);
        rawRentingLog.setSubmitTime(new Timestamp(System.currentTimeMillis()));
        rawRentingLog.setPlaningLendStartTime(planingLendStartTime);
        rawRentingLog.setPlaningLendEndTime(planingLendEndTime);
        return "{\"msg\":\"success\"}";
    }

    @RequestMapping(value = "/cancelRenting", method = RequestMethod.POST)
    @ResponseBody
    public String cancelRenting(Long id) {
        RentingLog rentingLog = rentService.findOne(id);
        rentingLog.setStatus(RentingLog.Status.CANCEL);
        return "{\"msg\":\"success\"}";
    }

    @RequestMapping(value = "/historyRenting", method = RequestMethod.GET)
    @ResponseBody
    public List<RentingLog> historyRenting(HttpServletRequest request,
                                           @RequestParam(required = false) String clientUsername,
                                           @RequestParam(required = false) RentingLog.Status status) {
        Client client;
        if (clientUsername == null) {
            HttpSession session = request.getSession();
            if (session.getAttribute("usertype") != "client") return new ArrayList<>();
            String username = (String) session.getAttribute("username");
            client = clientService.findByUsername(username);
        } else {
            client = clientService.findByUsername(clientUsername);
        }
        if (status == null) return rentService.findByClient(client);
        else {
            return rentService.findByClientAndStatus(client, status);
        }
    }

    @RequestMapping(value = "/countCarLogs", method = RequestMethod.GET)
    @ResponseBody
    public List<Map> countCarLogs() {
        return rentService.countLogsByCar();
    }
}
