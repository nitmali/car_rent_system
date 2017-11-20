package com.example.carrentsys.controller;

import com.example.carrentsys.entity.Car;
import com.example.carrentsys.entity.Client;
import com.example.carrentsys.entity.RentingLog;
import com.example.carrentsys.repository.CarRepository;
import com.example.carrentsys.repository.ClientRepository;
import com.example.carrentsys.repository.RentingLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class RentingLogController {
    private final RentingLogRepository rentingLogRepository;
    private final CarRepository carRepository;
    private final ClientRepository clientRepository;

    @Autowired
    public RentingLogController(RentingLogRepository rentingLogRepository, CarRepository carRepository, ClientRepository clientRepository) {
        this.rentingLogRepository = rentingLogRepository;
        this.carRepository = carRepository;
        this.clientRepository = clientRepository;
    }


    @RequestMapping("/manage/getRentingLog")
    @ResponseBody
    public Map<String, Object> getRentingLog(@RequestParam(required = false, defaultValue = "1") int draw,
                                             @RequestParam(required = false, defaultValue = "0") int start,
                                             @RequestParam(required = false, defaultValue = "10") int length) {
        Sort sort = new Sort(Sort.Direction.DESC, "lendEndTime");
        PageRequest pagerequset = new PageRequest((start / length), length, sort);
        Map<String, Object> maps = new HashMap<>();
        Page<RentingLog> page = rentingLogRepository.findAll(pagerequset);
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
        return rentingLogRepository.findByStatus(RentingLog.Status.PENDING);
    }

    @RequestMapping(value = "/manage/reviewLogs", method = RequestMethod.POST)
    @ResponseBody
    @Transactional(rollbackFor = Exception.class)
    public String handleReviewLogs(@RequestParam("id") String id, String type) {
        RentingLog rentingLog = rentingLogRepository.findOne(Integer.valueOf(id));
        Car car = rentingLog.getCar();
        if (type.equals("PASS")) {
            if (car.getStatus() == Car.Status.USING) return "{\"msg\":\"car is using\"}";
            rentingLog.setStatus(RentingLog.Status.PASS);
            rentingLog.setLendStartTime(new Timestamp(System.currentTimeMillis()));
            car.setStatus(Car.Status.USING);
            rentingLog.setCar(car);
        } else if (type.equals("REJECT")) {
            rentingLog.setStatus(RentingLog.Status.REJECT);
            car.setStatus(Car.Status.IDLE);
            rentingLog.setCar(car);
        }
        rentingLog.setApprovalTime(new Timestamp(System.currentTimeMillis()));
        rentingLogRepository.save(rentingLog);
        return "{\"msg\":\"success\"}";
    }

    @RequestMapping(value = "/manage/givebackLogs", method = RequestMethod.GET)
    @ResponseBody
    public List<RentingLog> givebackLogs() {
        return rentingLogRepository.findGivebackLogs();
    }

    @RequestMapping(value = "/manage/givebackCar", method = RequestMethod.POST)
    @ResponseBody
    @Transactional(rollbackFor = Exception.class)
    public String givebackCar(@RequestParam("id") String id) {
        RentingLog rentingLog = rentingLogRepository.findOne(Integer.valueOf(id));
        Car car = rentingLog.getCar();
        rentingLog.setLendEndTime(new Timestamp(System.currentTimeMillis()));
        car.setStatus(Car.Status.IDLE);
        rentingLog.setCar(car);
        return "{\"msg\":\"success\"}";
    }

    @RequestMapping(value = "/countSubmitByTime", method = RequestMethod.GET)
    @ResponseBody
    public long countSubmitByTime(String start, String end) {
        Assert.notNull(start, "start time can not be empty");
        Assert.notNull(end, "end time can not be empty");
        SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Long startTime = new Long(start);
        Long endTime = new Long(end);
        return rentingLogRepository.countRentingLogsBySubmitTimeBetween(Timestamp.valueOf(f.format(startTime)), Timestamp.valueOf(f.format(endTime)));
    }

    @RequestMapping(value = "/makeRenting", method = RequestMethod.POST)
    @ResponseBody
    public String makeRenting(int carid, Timestamp planingLendStartTime, Timestamp planingLendEndTime, HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (planingLendEndTime.getTime() - planingLendStartTime.getTime() <= 0)
            return "{\"msg\":\"Plainning time error\"}";
        Car car = carRepository.findOne(carid);
        if (car.getStatus() == Car.Status.USING) return "{\"msg\":\"car is using\"}";
        car.setStatus(Car.Status.BOOKING);
        if (session.getAttribute("usertype") != "client") return "{\"msg\":\"error\"}";
        String username = (String) session.getAttribute("username");
        Client client = clientRepository.findByUsername(username);
        RentingLog rentingLog = new RentingLog();
        rentingLog.setCar(car);
        rentingLog.setClient(client);
        rentingLog.setPlaningLendEndTime(planingLendEndTime);
        rentingLog.setPlaningLendStartTime(planingLendStartTime);
        rentingLog.setStatus(RentingLog.Status.PENDING);
        rentingLogRepository.save(rentingLog);
        return "{\"msg\":\"success\"}";
    }
}
